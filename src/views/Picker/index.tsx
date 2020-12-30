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
  const wheelPicker = (
    <PickerWheel
      items={items}
      onSelect={onSelect}
      selection={selection}
      pickerStyle={pickerStyle}
    />
  );
  const slidePicker = (
    <PickerSlide
      items={items}
      onSelect={onSelect}
      selection={selection}
      pickerStyle={pickerStyle}
    />
  );
  const listPicker = (
    <PickerList
      items={items}
      onSelect={onSelect}
      selection={selection}
      pickerStyle={pickerStyle}
    />
  );
  switch (pickerStyle) {
    case 'insetGrouped':
    case 'grouped':
      return listPicker;
    case 'wheel':
      return wheelPicker;
    case 'slide':
      return slidePicker;
    default:
      return listPicker;
  }
};
