import React from 'react';
import { Text } from './Text';
import styled from 'styled-components';
import { Colors } from '../themes/colors';

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
  background-color: ${({ selected }) =>
    selected
      ? `${Colors.background.white}`
      : `${Colors.background.systemGrey6}`};
  border-radius: 6px;
`;

export const Picker = ({ items, selected, setSelected }: PickerProps) => {
  return (
    <StyledPickerWrapper>
      {items.length &&
        items.map((item, i) => (
          <StyledPickerItem
            selected={i === selected || 0}
            onPress={() => setSelected(i)}
          >
            <Text fontSize={14} fontWeight='bold'>
              {item}
            </Text>
          </StyledPickerItem>
        ))}
    </StyledPickerWrapper>
  );
};
