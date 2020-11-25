import React from 'react';
import { Switch } from 'react-native';

type ToggleProps = {
  isOn: boolean;
  onToggle: () => void;
};

export const Toggle: React.FC<ToggleProps> = ({ isOn, onToggle }) => {
  return <Switch value={isOn} onValueChange={onToggle} />;
};
