import React from 'react';
import { WheelPicker, WheelPickerProps } from './Wheel';
import { ListPicker, ListPickerProps } from './List';
import { SegmentedPicker, SegmentedPickerProps } from './Segmented';

export type PickerProps = {
  items: Array<any>;
  selection?: number;
  onSelect: (n: number) => void;
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
