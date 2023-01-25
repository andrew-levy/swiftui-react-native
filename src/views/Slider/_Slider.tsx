// @ts-nocheck
// Credit to https://github.com/miblanchard/react-native-slider for the slider implementation.

import React, { PureComponent } from 'react';
import {
  Animated,
  Easing,
  I18nManager,
  Image,
  ImageSourcePropType,
  LayoutChangeEvent,
  PanResponder,
  PanResponderInstance,
  View,
  ViewStyle,
} from 'react-native';

export type Dimensions = {
  height: number;
  width: number;
};

/**
 * Callback for slider change events. The second number value will be only if provided an array with two values in `value` prop
 */
type SliderOnChangeCallback = (value: number | Array<number>) => void;

type SliderProps = {
  animateTransitions?: boolean;
  animationConfig?: {
    spring?: Animated.AnimatedProps<ViewStyle>;
    timing?: Animated.AnimatedProps<ViewStyle>;
  };
  animationType: 'spring' | 'timing';
  containerStyle?: ViewStyle;
  debugTouchArea?: boolean;
  disabled?: boolean;
  maximumTrackTintColor?: string;
  maximumValue: number;
  minimumTrackTintColor?: string;
  minimumValue: number;
  onSlidingComplete?: SliderOnChangeCallback;
  onSlidingStart?: SliderOnChangeCallback;
  onValueChange?: SliderOnChangeCallback;
  renderAboveThumbComponent?: (value: number, index: number) => React.ReactNode;
  renderBelowThumbComponent?: (value: number, index: number) => React.ReactNode;
  renderThumbComponent?: () => React.ReactNode | Array<() => React.ReactNode>;
  renderTrackMarkComponent?: (index: number) => React.ReactNode;
  step?: number;
  thumbImage?: ImageSourcePropType;
  thumbStyle?: ViewStyle;
  thumbTintColor?: string;
  thumbTouchSize?: Dimensions;
  trackClickable?: boolean;
  trackMarks?: Array<number>;
  trackStyle?: ViewStyle;
  minimumTrackStyle?: ViewStyle;
  maximumTrackStyle?: ViewStyle;
  value?: Animated.Value | number | Array<number>;
  /**
   * Allows the start from the zero value. The minimum value track can be rendered in two directions from zero.
   * Can be applied only with a single numeric value, negative minimum value, and positive maximum value.
   */
  startFromZero?: boolean;
  vertical?: boolean;
};

type SliderState = {
  allMeasured: boolean;
  containerSize: Dimensions;
  thumbSize: Dimensions;
  trackMarksValues?: Array<Animated.Value>;
  values: Array<Animated.Value>;
};

const TRACK_SIZE = 4;
const THUMB_SIZE = 20;
const GREEN = 'green';
const TRANSPARENT = 'transparent';
const styles: {
  aboveThumbComponentsContainer: any;
  belowThumbComponentsContainer: any;
  container: any;
  debugThumbTouchArea: {
    backgroundColor: string;
    opacity: number;
    position: 'absolute';
  };
  renderThumbComponent: {
    position: 'absolute';
  };
  thumb: {
    borderRadius: number;
    height: number;
    position: 'absolute';
    width: number;
  };
  touchArea: {
    backgroundColor: string;
    bottom: number;
    left: number;
    position: 'absolute';
    right: number;
    top: number;
  };
  track: { borderRadius: number; height: number };
} = {
  aboveThumbComponentsContainer: {
    flexDirection: 'row',
  },
  belowThumbComponentsContainer: {
    flexDirection: 'row',
  },
  container: {
    height: 40,
    justifyContent: 'center',
  },
  debugThumbTouchArea: {
    backgroundColor: GREEN,
    opacity: 0.5,
    position: 'absolute',
  },
  renderThumbComponent: {
    position: 'absolute',
  },
  thumb: {
    borderRadius: THUMB_SIZE / 2,
    height: THUMB_SIZE,
    position: 'absolute',
    width: THUMB_SIZE,
  },
  touchArea: {
    backgroundColor: TRANSPARENT,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  track: {
    borderRadius: TRACK_SIZE / 2,
    height: TRACK_SIZE,
  },
};

type RectReturn = {
  containsPoint: (nativeX: number, nativeY: number) => boolean;
  height: number;
  trackDistanceToPoint: (nativeX: number) => number;
  width: number;
  x: number;
  y: number;
};

const Rect = ({
  height,
  width,
  x,
  y,
}: {
  height: number;
  width: number;
  x: number;
  y: number;
}) => ({
  containsPoint: (nativeX: number, nativeY: number) =>
    nativeX >= x &&
    nativeY >= y &&
    nativeX <= x + width &&
    nativeY <= y + height,
  height,
  trackDistanceToPoint: (nativeX: number) => {
    if (nativeX < x) {
      return x - nativeX;
    }

    if (nativeX > x + width) {
      return nativeX - (x + width);
    }

    return 0;
  },
  width,
  x,
  y,
});

const DEFAULT_ANIMATION_CONFIGS = {
  spring: {
    friction: 7,
    tension: 100,
  },
  timing: {
    duration: 150,
    easing: Easing.inOut(Easing.ease),
    delay: 0,
  },
};

const normalizeValue = (
  props: SliderProps,
  value?: number | Array<number>
): Array<number> => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return [0];
  }

  const { maximumValue, minimumValue } = props;

  const getBetweenValue = (inputValue: number) =>
    Math.max(Math.min(inputValue, maximumValue), minimumValue);

  if (!Array.isArray(value)) {
    return [getBetweenValue(value)];
  }

  return value.map(getBetweenValue).sort((a, b) => a - b);
};

const updateValues = ({
  values,
  newValues = values,
}: {
  values: number | Array<number> | Animated.Value | Array<Animated.Value>;
  newValues?: number | Array<number> | Animated.Value | Array<Animated.Value>;
}): Animated.Value[] => {
  if (
    Array.isArray(newValues) &&
    Array.isArray(values) &&
    newValues.length !== values.length
  ) {
    return updateValues({ values: newValues });
  }

  if (Array.isArray(values) && Array.isArray(newValues)) {
    return values?.map((value: number | Animated.Value, index: number) => {
      let valueToSet = newValues[index];
      if (value instanceof Animated.Value) {
        if (valueToSet instanceof Animated.Value) {
          valueToSet = valueToSet.__getValue();
        }
        value.setValue(valueToSet);
        return value;
      }

      if (valueToSet instanceof Animated.Value) {
        return valueToSet;
      }

      return new Animated.Value(valueToSet);
    });
  }

  return [new Animated.Value(0)];
};

const indexOfLowest = (values: Array<number>): number => {
  let lowestIndex = 0;
  values.forEach((value, index, array) => {
    if (value < array[lowestIndex]) {
      lowestIndex = index;
    }
  });
  return lowestIndex;
};

export class Slider extends PureComponent<SliderProps, SliderState> {
  constructor(props: SliderProps) {
    super(props);
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminationRequest: this._handlePanResponderRequestEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
    this.state = {
      allMeasured: false,
      containerSize: {
        width: 0,
        height: 0,
      },
      thumbSize: {
        width: 0,
        height: 0,
      },
      trackMarksValues: updateValues({
        values: normalizeValue(this.props, this.props.trackMarks),
      }),
      values: updateValues({
        values: normalizeValue(
          this.props,
          this.props.value instanceof Animated.Value
            ? this.props.value.__getValue()
            : this.props.value
        ),
      }),
    };
  }

  static defaultProps = {
    animationType: 'timing',
    debugTouchArea: false,
    trackMarks: [],
    maximumTrackTintColor: '#b3b3b3',
    maximumValue: 1,
    minimumTrackTintColor: '#3f3f3f',
    minimumValue: 0,
    step: 0,
    thumbTintColor: '#343434',
    trackClickable: true,
    value: 0,
    vertical: false,
    startFromZero: false,
  };

  static getDerivedStateFromProps(props: SliderProps, state: SliderState) {
    if (
      props.trackMarks &&
      !!state.trackMarksValues &&
      state.trackMarksValues.length > 0
    ) {
      const newTrackMarkValues = normalizeValue(props, props.trackMarks);
      const statePatch = {} as SliderState;

      if (state.trackMarksValues) {
        statePatch.trackMarksValues = updateValues({
          values: state.trackMarksValues,
          newValues: newTrackMarkValues,
        });
      }

      return statePatch;
    }
  }

  componentDidUpdate() {
    const newValues = normalizeValue(
      this.props,
      this.props.value instanceof Animated.Value
        ? this.props.value.__getValue()
        : this.props.value
    );
    newValues.forEach((value, i) => {
      if (!this.state.values[i]) {
        this._setCurrentValue(value, i);
      } else if (value !== this.state.values[i].__getValue()) {
        if (this.props.animateTransitions) {
          this._setCurrentValueAnimated(value, i);
        } else {
          this._setCurrentValue(value, i);
        }
      }
    });
  }

  _getRawValues(
    values: Array<Animated.Value> | Array<Animated.AnimatedInterpolation>
  ) {
    return values.map((value) => value.__getValue());
  }

  _handleStartShouldSetPanResponder = (
    e: any
  ): /* gestureState: GestureState */
  boolean => this._thumbHitTest(e); // Should we become active when the user presses down on the thumb?

  _handleMoveShouldSetPanResponder(): /* e, gestureState: GestureState */
  boolean {
    // Should we become active when the user moves a touch over the thumb?
    return false;
  }

  _handlePanResponderGrant = (e: { nativeEvent: any }) => {
    const { thumbSize } = this.state;
    const { nativeEvent } = e;
    this._previousLeft = this.props.trackClickable
      ? nativeEvent.locationX - thumbSize.width
      : this._getThumbLeft(this._getCurrentValue(this._activeThumbIndex));

    this.props?.onSlidingStart?.(this._getRawValues(this.state.values));
  };

  _handlePanResponderMove = (_e: any, gestureState: any) => {
    if (this.props.disabled) {
      return;
    }

    this._setCurrentValue(
      this._getValue(gestureState),
      this._activeThumbIndex,
      () => {
        this.props?.onValueChange?.(this._getRawValues(this.state.values));
      }
    );
  };

  _handlePanResponderRequestEnd = () =>
    /* e, gestureState: GestureState */
    {
      // Should we allow another component to take over this pan?
      return false;
    };

  _handlePanResponderEnd = (_e: any, gestureState: any) => {
    if (this.props.disabled) {
      return;
    }

    this._setCurrentValue(
      this._getValue(gestureState),
      this._activeThumbIndex,
      () => {
        if (this.props.trackClickable) {
          this.props?.onValueChange?.(this._getRawValues(this.state.values));
        }

        this.props?.onSlidingComplete?.(this._getRawValues(this.state.values));
      }
    );

    this._activeThumbIndex = 0;
  };

  _measureContainer = (e: LayoutChangeEvent) => {
    this._handleMeasure('_containerSize', e);
  };

  _measureTrack = (e: LayoutChangeEvent) => {
    this._handleMeasure('_trackSize', e);
  };

  _measureThumb = (e: LayoutChangeEvent) => {
    this._handleMeasure('_thumbSize', e);
  };

  _handleMeasure = (
    name: '_containerSize' | '_trackSize' | '_thumbSize',
    e: LayoutChangeEvent
  ) => {
    const { width, height } = e.nativeEvent.layout;
    const size = {
      width,
      height,
    };

    const currentSize = this[name];

    if (
      currentSize &&
      width === currentSize.width &&
      height === currentSize.height
    ) {
      return;
    }

    this[name] = size;

    if (this._containerSize && this._thumbSize) {
      this.setState({
        containerSize: this._containerSize,
        thumbSize: this._thumbSize,
        allMeasured: true,
      });
    }
  };
  _getRatio = (value: number) => {
    const { maximumValue, minimumValue } = this.props;
    return (value - minimumValue) / (maximumValue - minimumValue);
  };
  _getThumbLeft = (value: number) => {
    const { containerSize, thumbSize } = this.state;
    const { vertical } = this.props;

    const standardRatio = this._getRatio(value);

    const ratio = I18nManager.isRTL ? 1 - standardRatio : standardRatio;
    return (
      ratio *
      ((vertical ? containerSize.height : containerSize.width) -
        thumbSize.width)
    );
  };
  _getValue = (gestureState: { dx: number; dy: number }) => {
    const { containerSize, thumbSize, values } = this.state;
    const { maximumValue, minimumValue, step, vertical } = this.props;
    const length = containerSize.width - thumbSize.width;
    const thumbLeft = vertical
      ? this._previousLeft + gestureState.dy * -1
      : this._previousLeft + gestureState.dx;
    const nonRtlRatio = thumbLeft / length;
    const ratio = I18nManager.isRTL ? 1 - nonRtlRatio : nonRtlRatio;
    let minValue = minimumValue;
    let maxValue = maximumValue;

    const rawValues = this._getRawValues(values);

    const buffer = step ? step : 0.1;

    if (values.length === 2) {
      if (this._activeThumbIndex === 1) {
        minValue = rawValues[0] + buffer;
      } else {
        maxValue = rawValues[1] - buffer;
      }
    }

    if (step) {
      return Math.max(
        minValue,
        Math.min(
          maxValue,
          minimumValue +
            Math.round((ratio * (maximumValue - minimumValue)) / step) * step
        )
      );
    }

    return Math.max(
      minValue,
      Math.min(maxValue, ratio * (maximumValue - minimumValue) + minimumValue)
    );
  };
  _getCurrentValue = (thumbIndex: number = 0) =>
    this.state.values[thumbIndex].__getValue();

  _setCurrentValue = (
    value: number,
    thumbIndex: number | null | undefined,
    callback?: () => void
  ) => {
    const safeIndex = thumbIndex ?? 0;
    const animatedValue = this.state.values[safeIndex];

    if (animatedValue) {
      animatedValue.setValue(value);

      if (callback) {
        callback();
      }
    } else {
      this.setState((prevState: SliderState) => {
        const newValues = [...prevState.values];
        newValues[safeIndex] = new Animated.Value(value);
        return {
          values: newValues,
        };
      }, callback);
    }
  };

  _setCurrentValueAnimated = (value: number, thumbIndex: number = 0) => {
    const { animationType } = this.props;
    const animationConfig = {
      ...DEFAULT_ANIMATION_CONFIGS[animationType],
      ...this.props.animationConfig,
      toValue: value,
      useNativeDriver: false,
    };
    Animated[animationType](
      this.state.values[thumbIndex],
      animationConfig
    ).start();
  };

  _getTouchOverflowSize = (): {
    width: number;
    height: number;
  } => {
    const { allMeasured, containerSize, thumbSize } = this.state;
    const { thumbTouchSize } = this.props;
    const size = {
      width: 40,
      height: 40,
    };

    if (allMeasured) {
      size.width = Math.max(0, thumbTouchSize?.width || 0 - thumbSize.width);
      size.height = Math.max(
        0,
        thumbTouchSize?.height || 0 - containerSize.height
      );
    }

    return size;
  };

  _getTouchOverflowStyle = () => {
    const { width, height } = this._getTouchOverflowSize();

    const touchOverflowStyle = {} as ViewStyle;

    if (width !== undefined && height !== undefined) {
      const verticalMargin = -height / 2;
      touchOverflowStyle.marginTop = verticalMargin;
      touchOverflowStyle.marginBottom = verticalMargin;
      const horizontalMargin = -width / 2;
      touchOverflowStyle.marginLeft = horizontalMargin;
      touchOverflowStyle.marginRight = horizontalMargin;
    }

    if (this.props.debugTouchArea === true) {
      touchOverflowStyle.backgroundColor = 'orange';
      touchOverflowStyle.opacity = 0.5;
    }

    return touchOverflowStyle;
  };
  _thumbHitTest = (e: { nativeEvent: any }) => {
    const { nativeEvent } = e;
    const { trackClickable } = this.props;
    const { values } = this.state;
    const hitThumb = values.find((_, i) => {
      const thumbTouchRect = this._getThumbTouchRect(i);

      const containsPoint = thumbTouchRect.containsPoint(
        nativeEvent.locationX,
        nativeEvent.locationY
      );

      if (containsPoint) {
        this._activeThumbIndex = i;
      }

      return containsPoint;
    });

    if (hitThumb) {
      return true;
    }

    if (trackClickable) {
      // set the active thumb index
      if (values.length === 1) {
        this._activeThumbIndex = 0;
      } else {
        // we will find the closest thumb and that will be the active thumb
        const thumbDistances = values.map((_value, index) => {
          const thumbTouchRect = this._getThumbTouchRect(index);

          return thumbTouchRect.trackDistanceToPoint(nativeEvent.locationX);
        });
        this._activeThumbIndex = indexOfLowest(thumbDistances);
      }

      return true;
    }

    return false;
  };

  _getThumbTouchRect = (thumbIndex: number = 0): RectReturn => {
    const { containerSize, thumbSize } = this.state;
    const { thumbTouchSize } = this.props;
    const { height, width } = thumbTouchSize || { height: 40, width: 40 };

    const touchOverflowSize = this._getTouchOverflowSize();

    return Rect({
      height,
      width,
      x:
        touchOverflowSize.width / 2 +
        this._getThumbLeft(this._getCurrentValue(thumbIndex)) +
        (thumbSize.width - width) / 2,
      y: touchOverflowSize.height / 2 + (containerSize.height - height) / 2,
    });
  };

  _activeThumbIndex: number = 0;
  _containerSize: Dimensions | null | undefined;
  _panResponder: PanResponderInstance;
  _previousLeft: number = 0;
  _thumbSize: Dimensions | null | undefined;
  _trackSize: Dimensions | null | undefined;

  _renderDebugThumbTouchRect = (
    thumbLeft: Animated.AnimatedInterpolation,
    index: number
  ) => {
    const { height, y, width } = this._getThumbTouchRect() || {};
    const positionStyle = {
      height,
      left: thumbLeft,
      top: y,
      width,
    };
    return (
      <Animated.View
        key={`debug-thumb-${index}`}
        pointerEvents="none"
        style={[styles.debugThumbTouchArea, positionStyle]}
      />
    );
  };

  _renderThumbImage = (thumbIndex: number = 0) => {
    const { thumbImage } = this.props;

    if (!thumbImage) {
      return null;
    }

    return (
      <Image
        source={
          (Array.isArray(thumbImage)
            ? thumbImage[thumbIndex]
            : thumbImage) as ImageSourcePropType
        }
      />
    );
  };

  render() {
    const {
      containerStyle,
      debugTouchArea,
      maximumTrackTintColor,
      maximumValue,
      minimumTrackTintColor,
      minimumValue,
      renderAboveThumbComponent,
      renderBelowThumbComponent,
      renderTrackMarkComponent,
      renderThumbComponent,
      thumbStyle,
      thumbTintColor,
      trackStyle,
      minimumTrackStyle: propMinimumTrackStyle,
      maximumTrackStyle: propMaximumTrackStyle,
      vertical,
      startFromZero,
      step = 0,
      ...other
    } = this.props;
    const { allMeasured, containerSize, thumbSize, trackMarksValues, values } =
      this.state;
    const _startFromZero =
      values.length === 1 && minimumValue < 0 && maximumValue > 0
        ? startFromZero
        : false;
    const interpolatedThumbValues = values.map((value) =>
      value.interpolate({
        inputRange: [minimumValue, maximumValue],
        outputRange: I18nManager.isRTL
          ? [0, -(containerSize.width - thumbSize.width)]
          : [0, containerSize.width - thumbSize.width],
      })
    );
    const interpolatedTrackValues = values.map((value) =>
      value.interpolate({
        inputRange: [minimumValue, maximumValue],
        outputRange: [0, containerSize.width - thumbSize.width],
      })
    );
    const interpolatedTrackMarksValues =
      trackMarksValues &&
      trackMarksValues.map((v) =>
        v.interpolate({
          inputRange: [minimumValue, maximumValue],
          outputRange: I18nManager.isRTL
            ? [0, -(containerSize.width - thumbSize.width)]
            : [0, containerSize.width - thumbSize.width],
        })
      );
    const valueVisibleStyle = {} as ViewStyle;

    if (!allMeasured) {
      valueVisibleStyle.opacity = 0;
    }

    const interpolatedRawValues = this._getRawValues(interpolatedTrackValues);
    const minRawValue = Math.min(...interpolatedRawValues);
    const minThumbValue = new Animated.Value(minRawValue);
    const maxRawValue = Math.max(...interpolatedRawValues);
    const maxThumbValue = new Animated.Value(maxRawValue);

    const _value = values[0].__getValue();
    const sliderWidthCoefficient =
      containerSize.width / (Math.abs(minimumValue) + Math.abs(maximumValue));
    const startPositionOnTrack = _startFromZero
      ? _value < 0 + step
        ? (_value + Math.abs(minimumValue)) * sliderWidthCoefficient
        : Math.abs(minimumValue) * sliderWidthCoefficient
      : 0;

    const minTrackWidth = _startFromZero
      ? Math.abs(_value) * sliderWidthCoefficient - thumbSize.width / 2
      : interpolatedTrackValues[0];
    const clearBorderRadius = {} as ViewStyle;
    if (_startFromZero && _value < 0 + step) {
      clearBorderRadius.borderBottomRightRadius = 0;
      clearBorderRadius.borderTopRightRadius = 0;
    }
    if (_startFromZero && _value > 0) {
      clearBorderRadius.borderTopLeftRadius = 0;
      clearBorderRadius.borderBottomLeftRadius = 0;
    }

    const minimumTrackStyle = {
      position: 'absolute',
      left:
        interpolatedTrackValues.length === 1
          ? new Animated.Value(startPositionOnTrack)
          : Animated.add(minThumbValue, thumbSize.width / 2),
      width:
        interpolatedTrackValues.length === 1
          ? Animated.add(minTrackWidth, thumbSize.width / 2)
          : Animated.add(Animated.multiply(minThumbValue, -1), maxThumbValue),
      backgroundColor: minimumTrackTintColor,
      ...valueVisibleStyle,
      ...clearBorderRadius,
    } as ViewStyle;

    const touchOverflowStyle = this._getTouchOverflowStyle();

    return (
      <>
        {renderAboveThumbComponent && (
          <View style={styles.aboveThumbComponentsContainer}>
            {interpolatedThumbValues.map((interpolationValue, i) => {
              const animatedValue = values[i] || 0;
              const value =
                animatedValue instanceof Animated.Value
                  ? animatedValue.__getValue()
                  : animatedValue;
              return (
                <Animated.View
                  key={`slider-above-thumb-${i}`}
                  style={[
                    styles.renderThumbComponent, // eslint-disable-next-line react-native/no-inline-styles
                    {
                      bottom: 0,
                      left: thumbSize.width / 2,
                      transform: [
                        {
                          translateX: interpolationValue,
                        },
                        {
                          translateY: 0,
                        },
                      ],
                      ...valueVisibleStyle,
                    },
                  ]}
                >
                  {renderAboveThumbComponent(i, value)}
                </Animated.View>
              );
            })}
          </View>
        )}
        <View
          {...other}
          style={[
            styles.container,
            vertical ? { transform: [{ rotate: '-90deg' }] } : {},
            containerStyle,
          ]}
          onLayout={this._measureContainer}
        >
          <View
            renderToHardwareTextureAndroid
            style={[
              styles.track,
              {
                backgroundColor: maximumTrackTintColor,
              },
              trackStyle,
              propMaximumTrackStyle,
            ]}
            onLayout={this._measureTrack}
          />
          <Animated.View
            renderToHardwareTextureAndroid
            style={[
              styles.track,
              trackStyle,
              minimumTrackStyle,
              propMinimumTrackStyle,
            ]}
          />
          {renderTrackMarkComponent &&
            interpolatedTrackMarksValues &&
            interpolatedTrackMarksValues.map((value, i) => (
              <Animated.View
                key={`track-mark-${i}`}
                style={[
                  styles.renderThumbComponent,
                  {
                    transform: [
                      {
                        translateX: value,
                      },
                      {
                        translateY: 0,
                      },
                    ],
                    ...valueVisibleStyle,
                  },
                ]}
              >
                {renderTrackMarkComponent(i)}
              </Animated.View>
            ))}
          {interpolatedThumbValues.map((value, i) => (
            <Animated.View
              key={`slider-thumb-${i}`}
              style={[
                renderThumbComponent
                  ? styles.renderThumbComponent
                  : styles.thumb,
                renderThumbComponent
                  ? {}
                  : {
                      backgroundColor: thumbTintColor,
                      ...thumbStyle,
                    },
                {
                  transform: [
                    {
                      translateX: value,
                    },
                    {
                      translateY: 0,
                    },
                  ],
                  ...valueVisibleStyle,
                },
              ]}
              onLayout={this._measureThumb}
            >
              {renderThumbComponent
                ? Array.isArray(renderThumbComponent)
                  ? renderThumbComponent[i]()
                  : renderThumbComponent()
                : this._renderThumbImage(i)}
            </Animated.View>
          ))}
          <View
            style={[styles.touchArea, touchOverflowStyle]}
            {...this._panResponder.panHandlers}
          >
            {!!debugTouchArea &&
              interpolatedThumbValues.map((value, i) =>
                this._renderDebugThumbTouchRect(value, i)
              )}
          </View>
        </View>
        {renderBelowThumbComponent && (
          <View style={styles.belowThumbComponentsContainer}>
            {interpolatedThumbValues.map((interpolationValue, i) => {
              const animatedValue = values[i] || 0;
              const value =
                animatedValue instanceof Animated.Value
                  ? animatedValue.__getValue()
                  : animatedValue;
              return (
                <Animated.View
                  key={`slider-below-thumb-${i}`}
                  style={[
                    styles.renderThumbComponent, // eslint-disable-next-line react-native/no-inline-styles
                    {
                      top: 0,
                      left: thumbSize.width / 2,
                      transform: [
                        {
                          translateX: interpolationValue,
                        },
                        {
                          translateY: 0,
                        },
                      ],
                      ...valueVisibleStyle,
                    },
                  ]}
                >
                  {renderBelowThumbComponent(i, value)}
                </Animated.View>
              );
            })}
          </View>
        )}
      </>
    );
  }
}
