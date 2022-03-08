import React, { ReactElement } from 'react';
import { useAlert } from '../../hooks/useAlert';
import { useLifecycle } from '../../hooks/useLifecycle';
import { Modifiers, TextModifiers, WithChildren } from '../../utils/modifiers';
import { HStack } from '../HStack';
import { Image } from '../Image';
import { SystemName } from '../Image/types';
import { Text } from '../Text';

type LabelProps = Modifiers &
  WithChildren &
  TextModifiers & {
    title?: string | ReactElement<any>;
    icon?: ReactElement<any>;
    systemImage?: SystemName;
    spacing?: number;
  };

export const Label = ({
  fontSize,
  font,
  foregroundColor,
  fontWeight,
  title,
  icon,
  systemImage,
  alert,
  onAppear,
  onDisappear,
  spacing = 5,
  ...containerProps
}: LabelProps) => {
  useAlert(alert);
  useLifecycle(onAppear, onDisappear);

  return (
    <HStack spacing={spacing} {...containerProps}>
      {icon || (
        <Image
          systemName={systemImage}
          fontWeight={fontWeight}
          fontSize={fontSize}
          foregroundColor={foregroundColor}
          font={font}
        />
      )}

      {typeof title === 'string' ? (
        <Text
          fontWeight={fontWeight}
          fontSize={fontSize}
          foregroundColor={foregroundColor}
          font={font}
        >
          {title}
        </Text>
      ) : (
        title
      )}
    </HStack>
  );
};
