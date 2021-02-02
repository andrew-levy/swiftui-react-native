import React, { useEffect, useState } from 'react';
import { Text } from '../Text';
import { UIColor } from '../../themes/colors';
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { PickerProps } from '.';
import { SLIDE_TEXT_SIZE } from './Constants';

const { Value, timing } = Animated;

export const PickerSlide = ({ items, selection, onSelect }: PickerProps) => {
  const [dimensions, setDimensions] = useState(null);
  const translateX = useState(new Value(0))[0];
  const opacities = items.map((_) => new Value(0));

  useEffect(() => {
    if (dimensions) {
      let start = (dimensions.width / items.length) * selection;
      if (selection === 0) start += 2;
      if (selection === items.length - 1) start -= 2;
      slide(start);
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

  const slide = (slideValue) => {
    timing(translateX, {
      toValue: slideValue,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <View
        style={styles.container}
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
                <Text fontSize={SLIDE_TEXT_SIZE} fontWeight='bold'>
                  {item}
                </Text>
              </TouchableOpacity>
              <Animated.View
                style={[
                  styles.divider,
                  {
                    opacity: opacities[i],
                  },
                ]}
              />
            </React.Fragment>
          ))}
        <Animated.View
          style={[
            styles.slider,
            {
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: UIColor.systemGray6,
    borderRadius: 6,
    flexDirection: 'row',
    padding: 3,
  },
  slider: {
    position: 'absolute',
    backgroundColor: UIColor.white,
    top: 2,
    zIndex: -1,
    borderRadius: 6,
    shadowColor: UIColor.black,
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
    borderRightColor: UIColor.systemGray4,
  },
  item: {
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
});

// TODO: Refactor with tap and pan gesture handler
