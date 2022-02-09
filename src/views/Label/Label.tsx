import React, { ReactElement } from 'react';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useLifecycle } from '../../hooks/useLifecycle';
import { getColor } from '../../utils/colors';
import { Modifiers, TextModifiers, WithChildren } from '../../utils/modifiers';
import { HStack } from '../HStack';
import { Image } from '../Image';
import { Text } from '../Text';

type LabelProps = Modifiers &
  WithChildren &
  TextModifiers & {
    text?: string | ReactElement<any>;
    icon?: ReactElement<any>;
    systemImage?: string;
    spacing?: number;
  };

export const Label = ({
  fontSize,
  font,
  foregroundColor,
  fontWeight,
  text,
  icon,
  systemImage,
  onAppear,
  onDisappear,
  spacing = 5,
  ...containerProps
}: LabelProps) => {
  useLifecycle(onAppear, onDisappear);
  const { colorScheme } = useColorScheme();

  return (
    <HStack spacing={spacing} {...containerProps}>
      {icon || (
        <Image
          systemName={systemImage}
          fontWeight={fontWeight}
          fontSize={fontSize}
          foregroundColor={getColor(foregroundColor, colorScheme)}
          font={font}
        />
      )}

      {typeof text === 'string' ? (
        <Text
          fontWeight={fontWeight}
          fontSize={fontSize}
          foregroundColor={getColor(foregroundColor, colorScheme)}
          font={font}
        >
          {text}
        </Text>
      ) : (
        text
      )}
    </HStack>
  );
};
