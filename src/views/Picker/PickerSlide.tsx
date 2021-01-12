import React, { useEffect, useState } from 'react';
import { Text } from '../Text';
import styled from 'styled-components';
import { UIColor } from '../../themes/colors';
import { Animated, Easing } from 'react-native';
import { PickerProps } from './Picker';
import { SLIDE_TEXT_SIZE } from './Constants';

const { Value, timing } = Animated;

const StyledPickerWrapper = styled.View`
  background-color: ${UIColor.systemGray6};
  border-radius: 6px;
  flex-direction: row;
  padding: 3px;
`;

const StyledPickerItem = styled.TouchableOpacity`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  justify-content: center;
  flex-basis: ${({ count }) => `${100 / count}%`};
`;

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

  const sliderStyle = {
    position: 'absolute' as 'absolute',
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
    width: dimensions ? dimensions.width / items.length : 0,
    height: dimensions ? dimensions.height - 5 : 0,
    transform: [
      {
        translateX: translateX,
      },
    ],
  };

  return (
    <>
      <StyledPickerWrapper
        onLayout={(e) => setDimensions(e.nativeEvent.layout)}
      >
        {items.length &&
          items.map((item, i) => (
            <React.Fragment key={i}>
              <StyledPickerItem
                onPress={() => onSelect(i)}
                last={i === items.length - 1}
                count={items.length}
                key={i}
              >
                <Text fontSize={SLIDE_TEXT_SIZE} fontWeight='bold'>
                  {item}
                </Text>
              </StyledPickerItem>
              <Animated.View
                style={{
                  top: 5,
                  height: 15,
                  borderRightWidth: 1,
                  width: 0,
                  borderRightColor: UIColor.systemGray4,
                  opacity: opacities[i],
                }}
              />
            </React.Fragment>
          ))}
        <Animated.View style={sliderStyle} />
      </StyledPickerWrapper>
    </>
  );
};

// TODO: Add pangesturehandler to slide as well as tap
