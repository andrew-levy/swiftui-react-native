import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Binding } from '../../utils/binding';
import { Modifiers } from '../../utils/modifiers';
import { useLifecycle } from '../../hooks/useLifecycle';
import { getPadding } from '../../utils/padding';
import { getBorder } from '../../utils/border';
import { getShadow } from '../../utils/shadow';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getTransform } from '../../utils/transform';
import { UIColor, getColor } from '../../utils/colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useAlert } from '../../hooks/useAlert';
import { Slider as _Slider } from './_Slider';
import { Frame } from '../../utils/frame';

type SliderProps = Modifiers & {
  tint?: UIColor;
  trackTint?: UIColor;
  thumbTint?: UIColor;
  step?: number;
  range?: [number, number];
  value: Binding<number>;
  onChange?: (value?: number) => void;
};

export const Slider: React.FC<SliderProps> = ({
  tint,
  trackTint,
  thumbTint,
  range = [0, 10],
  step = 0,
  value,
  frame,
  backgroundColor,
  style,
  padding,
  cornerRadius,
  rotationEffect,
  scaleEffect,
  shadow,
  border,
  opacity,
  zIndex,
  alert,
  preferredColorScheme,
  onAppear,
  onDisappear,
  onChange,
}) => {
  useAlert(alert);
  useLifecycle(onAppear, onDisappear);
  const colorScheme = useColorScheme(preferredColorScheme);
  const [sliderWidth, sliderHeight] = getSliderWidth(frame);
  const [from, through] = range;

  return (
    <View
      style={[
        {
          opacity,
          zIndex,
          backgroundColor: getColor(backgroundColor, colorScheme),
          ...getCornerRadius(cornerRadius),
          ...getPadding(padding),
          ...getBorder(border, colorScheme),
          ...getShadow(shadow, colorScheme),
          ...getTransform(scaleEffect, rotationEffect),
        },
        style,
      ]}
    >
      <_Slider
        value={value.value}
        onValueChange={(newVal: number) => {
          value.setValue(newVal);
        }}
        minimumValue={from}
        maximumValue={through}
        step={step}
        thumbTintColor={getColor(thumbTint, colorScheme, 'white')}
        minimumTrackTintColor={getColor(trackTint, colorScheme, 'systemBlue')}
        maximumTrackTintColor={getColor(tint, colorScheme, 'systemGray5')}
        trackStyle={{
          height: sliderHeight,
          width: sliderWidth,
        }}
        thumbStyle={styles.thumb}
        onSlidingComplete={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    flexDirection: 'row',
    borderRadius: 10,
  },
  thumb: {
    backgroundColor: '#fff',
    position: 'absolute',
    borderRadius: 100,
    width: 25,
    height: 25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});

export const getSliderWidth = (frame: Frame) => {
  const dimensions = Dimensions.get('window');
  let dims = [300, 3];
  if (!frame) return dims;
  if (frame.width) {
    if (typeof frame.width === 'string' && frame.width.endsWith('%')) {
      const percent = parseInt(frame.width.replace('%', '')) / 100;
      dims[0] = percent * dimensions.width;
    } else {
      dims[0] = frame.width as number;
    }
  }
  if (frame.height) {
    if (typeof frame.height === 'number') dims[1] = frame.height;
  }
  return dims;
};
