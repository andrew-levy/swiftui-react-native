import React from 'react';
import PickerWheel from './PickerWheel';
import { PickerList } from './PickerList';
import { PickerSlide } from './PickerSlide';

export type PickerProps = {
  items: Array<any>;
  selection?: number;
  onSelect: (n: number) => void;
  pickerStyle: 'grouped' | 'insetGrouped' | 'slide' | 'wheel';
};

export const Picker = ({
  items,
  selection,
  onSelect,
  pickerStyle,
}: PickerProps) => {
  if (pickerStyle === 'insetGrouped' || pickerStyle === 'grouped') {
    return (
      <PickerList
        items={items}
        onSelect={onSelect}
        selection={selection}
        pickerStyle={pickerStyle}
      />
    );
  }

  if (pickerStyle === 'wheel') {
    return (
      <PickerWheel
        items={items}
        onSelect={onSelect}
        selection={selection}
        pickerStyle={pickerStyle}
      />
    );
  }

  return (
    <PickerSlide
      items={items}
      onSelect={onSelect}
      selection={selection}
      pickerStyle={pickerStyle}
    />
  );
};
