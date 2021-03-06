import React, { useEffect, useState } from 'react';
import { Text } from '../../Text';
import { systemColor, UIColor } from '../../../utils/colors';
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SegmentedPickerProps } from '../Picker';
import { SLIDE_TEXT_SIZE } from '../Constants';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { clamp } from '../AnimationHelpers';
import { useColorScheme } from '../../../hooks/useColorScheme';

const { Value, timing } = Animated;

export const SegmentedPicker = ({
  items,
  selection,
  onSelect,
}: SegmentedPickerProps) => {
  const [dimensions, setDimensions] = useState(null);
  const translateX = useState(new Value(0))[0];
  const opacities = items.map(() => new Value(0));

  useEffect(() => {
    if (dimensions) {
      let to = (dimensions.width / items.length) * selection;
      if (selection === 0) to += 2;
      if (selection === items.length - 1) to -= 2;
      slide(to);
      setOpacities();
    }
  }, [dimensions, selection]);

  const setOpacities = () => {
    items.forEach((_, i) => {
      if (i === selection || i === selection - 1 || i === items.length - 1)
        opacities[i].setValue(0);
      else opacities[i].setValue(1);
    });
  };

  const slide = (slideValue: number) => {
    timing(translateX, {
      toValue: slideValue,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  let lastIndex = selection;
  const panGestureHandler = (e) => {
    const currentXPos = e.nativeEvent.x;
    const itemWidth = dimensions.width / items.length;
    const slideTo = clamp(
      Math.round((currentXPos - itemWidth / 2) / itemWidth) * itemWidth,
      0,
      (items.length - 1) * itemWidth
    );
    const selectedIndex = slideTo / itemWidth;
    if (selectedIndex !== lastIndex) {
      lastIndex = selectedIndex;
      onSelect(selectedIndex);
    }
  };

  const { colorScheme } = useColorScheme();
  const sliderBackgroundColor =
    colorScheme === 'light' ? UIColor.white : UIColor.systemGray3;

  return (
    <PanGestureHandler onGestureEvent={panGestureHandler}>
      <View
        style={[
          styles.container,
          { backgroundColor: systemColor(UIColor.systemGray6, colorScheme) },
        ]}
        onLayout={(e) => setDimensions(e.nativeEvent.layout)}
      >
        {items.length &&
          items.map((item, i) => (
            <React.Fragment key={i}>
              <TouchableOpacity
                style={[
                  styles.item,
                  {
                    flexBasis: `${100 / items.length}%`,
                  },
                ]}
                onPress={() => onSelect(i)}
                key={i}
              >
                <Text
                  fontSize={SLIDE_TEXT_SIZE}
                  fontWeight={selection === i ? 'bold' : 'normal'}
                  foregroundColor={systemColor(UIColor.black, colorScheme)}
                >
                  {item}
                </Text>
              </TouchableOpacity>
              <Animated.View
                style={[
                  styles.divider,
                  {
                    opacity: opacities[i],
                    borderRightColor: systemColor(
                      UIColor.systemGray4,
                      colorScheme
                    ),
                  },
                ]}
              />
            </React.Fragment>
          ))}

        <Animated.View
          style={[
            styles.slider,
            {
              backgroundColor: systemColor(sliderBackgroundColor, colorScheme),
              width: dimensions ? dimensions.width / items.length : 0,
              height: dimensions ? dimensions.height - 5 : 0,
              transform: [
                {
                  translateX: translateX,
                },
              ],
            },
          ]}
        />
      </View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderRadius: 6,
    flexDirection: 'row',
    padding: 3,
  },
  slider: {
    position: 'absolute',
    top: 2,
    zIndex: -1,
    borderRadius: 6,
    shadowColor: systemColor(UIColor.black),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  divider: {
    top: 5,
    height: 15,
    borderRightWidth: 1,
    width: 0,
  },
  item: {
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
});
