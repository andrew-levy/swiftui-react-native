import React from 'react';
import { Switch } from 'react-native';

type ToggleProps = {
  isOn: boolean;
  onColor?: string;
  offColor?: string;
  onToggle: () => void;
};

export const Toggle: React.FC<ToggleProps> = ({
  isOn,
  onColor,
  offColor,
  onToggle,
}) => {
  return (
    <Switch
      value={isOn}
      onValueChange={onToggle}
      trackColor={{ true: onColor, false: null }}
      ios_backgroundColor={offColor}
    />
  );
};
