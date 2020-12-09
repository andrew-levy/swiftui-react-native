import React, { useEffect, useState } from 'react';
import { Text } from './Text';
import styled from 'styled-components';
import { UIColor } from '../themes/colors';
import { Animated, Easing } from 'react-native';

type PickerProps = {
  items: Array<string>;
  selected?: number;
  onSelect: (n: number) => void;
};

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

export const Picker = ({ items, selected, onSelect }: PickerProps) => {
  const [dimensions, setDimensions] = useState(null);
  const [translateX, setTranslateX] = useState(new Animated.Value(0));

  useEffect(() => {
    if (dimensions) {
      let start = (dimensions.width / items.length) * selected;
      if (selected === 0) start += 2;
      if (selected === items.length - 1) start -= 2;
      slide(start);
    }
  }, [dimensions, selected]);

  const slide = (slideValue) => {
    Animated.timing(translateX, {
      toValue: slideValue,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const sliderStyle = {
    position: 'absolute' as 'absolute',
    backgroundColor: 'white',
    top: 2,
    zIndex: -1,
    borderRadius: 6,
    shadowColor: '#000',
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
            <StyledPickerItem
              onPress={() => onSelect(i)}
              last={i === items.length - 1}
              count={items.length}
            >
              <Text fontSize={14} fontWeight='bold'>
                {item}
              </Text>
            </StyledPickerItem>
          ))}
        <Animated.View style={sliderStyle} />
      </StyledPickerWrapper>
    </>
  );
};
