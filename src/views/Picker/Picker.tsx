import React from 'react';
import { WheelPicker } from './Wheel';
import { ListPicker } from './List';
import { SegmentedPicker } from './Segmented';

type PickerProps = {
  background: string;
  items: Array<any>;
  selection?: number;
  onSelect: (n: number) => void;
};

export type WheelPickerProps = PickerProps & {
  pickerStyle: 'wheel';
};

export type SegmentedPickerProps = PickerProps & {
  pickerStyle: 'segmented';
};

export type ListPickerProps = PickerProps & {
  pickerStyle: 'insetGrouped' | 'grouped';
};

export const Picker = (
  props: ListPickerProps | WheelPickerProps | SegmentedPickerProps
) => {
  switch (props.pickerStyle) {
    case 'insetGrouped':
    case 'grouped':
      return <ListPicker {...props} />;
    case 'wheel':
      return <WheelPicker {...props} />;
    case 'segmented':
      return <SegmentedPicker {...props} />;
    default:
      return <WheelPicker {...props} />;
  }
};
