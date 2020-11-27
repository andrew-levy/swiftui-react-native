import React, { useEffect, useState } from 'react';
import { Text } from './Text';
import styled from 'styled-components';
import { Colors } from '../themes/colors';
import { Animated, Easing } from 'react-native';

type PickerProps = {
  items: Array<string>;
  selected?: number;
  setSelected: (n: number) => void;
};

const StyledPickerWrapper = styled.View`
  background-color: ${Colors.background.systemGrey6};
  border-radius: 6px;
  flex-direction: row;
  padding: 3px;
`;

const StyledPickerItem = styled.TouchableOpacity`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
`;
// border-right-color: ${Colors.foreground.systemGrey5}
// border-right-width: ${({ last }) => (last ? '0' : '1')}px;

export const Picker = ({ items, selected, setSelected }: PickerProps) => {
  const [dimensions, setDimensions] = useState(null);
  const [translateX, setTranslateX] = useState(new Animated.Value(0));

  useEffect(() => {
    if (dimensions) {
      const start = (dimensions.width / items.length) * selected;
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
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: -1,
    borderRadius: 6,
    borderColor: Colors.background.systemGrey6,
    borderWidth: 2,
    width: dimensions ? dimensions.width / items.length : 0,
    height: dimensions ? dimensions.height : 0,
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
              onPress={() => setSelected(i)}
              last={i === items.length - 1}
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
