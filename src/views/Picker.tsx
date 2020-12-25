import React, { ReactElement, useEffect, useState } from 'react';
import { Text } from './Text';
import styled from 'styled-components';
import { UIColor } from '../themes/colors';
import { Animated, Easing } from 'react-native';
import { List } from './List';
import { HStack } from './HStack';
import { Image } from './Image';
import { Button } from './Button';

type PickerProps = {
  items: Array<any>;
  selection?: number;
  onSelect: (n: number) => void;
  pickerStyle: 'grouped' | 'insetGrouped' | 'slide' | 'wheel';
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

const { Value, timing } = Animated;

export const Picker = ({
  items,
  selection,
  onSelect,
  pickerStyle,
}: PickerProps) => {
  const [dimensions, setDimensions] = useState(null);
  const [translateX, setTranslateX] = useState(new Value(0));

  useEffect(() => {
    if (dimensions) {
      let start = (dimensions.width / items.length) * selection;
      if (selection === 0) start += 2;
      if (selection === items.length - 1) start -= 2;
      slide(start);
    }
  }, [dimensions, selection]);

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

  if (pickerStyle === 'insetGrouped' || pickerStyle === 'grouped') {
    const listItems = items.map((item, i) => (
      <Button key={i} action={() => onSelect(i)}>
        <HStack>
          <Text>{item}</Text>
          {selection === i ? (
            <Image name='check-mark' width={15} height={15} />
          ) : null}
        </HStack>
      </Button>
    )) as any;

    return (
      <List
        listStyle={pickerStyle === 'insetGrouped' ? 'insetGrouped' : 'grouped'}
      >
        {listItems}
      </List>
    );
  }

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
              key={i}
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
