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

export const Picker = (props: PickerProps) => {
  switch (props.pickerStyle) {
    case 'insetGrouped':
    case 'grouped':
      return <PickerList {...props} />;
    case 'wheel':
      return <PickerWheel {...props} />;
    case 'slide':
      return <PickerSlide {...props} />;
    default:
      return <PickerList {...props} />;
  }
};
