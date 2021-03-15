import React from 'react';
import { Switch } from 'react-native';
import { useColorScheme } from '../../hooks/useColorScheme';
import { systemColor } from '../../utils/colors/utils';

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
  const { colorScheme } = useColorScheme();
  return (
    <Switch
      value={isOn}
      onValueChange={onToggle}
      trackColor={{ true: systemColor(onColor, colorScheme), false: null }}
      ios_backgroundColor={systemColor(offColor, colorScheme)}
    />
  );
};
