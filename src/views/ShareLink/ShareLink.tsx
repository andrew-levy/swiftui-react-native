import React from 'react';
import { Share } from 'react-native';
import { RemoveField } from '../../utils/types';
import { Button } from '../Button';
import { ButtonProps } from '../Button/Button';
import { SystemName } from '../Image/types';
import { Label } from '../Label';

type ShareLinkProps = RemoveField<ButtonProps, 'action'> & {
  item: string;
  message?: string;
  subject?: string;
  systemImage?: SystemName;
};

export const ShareLink = ({
  item,
  message,
  subject,
  children,
  title = 'Share',
  systemImage = 'square.and.arrow.up',
  ...props
}: ShareLinkProps) => {
  const share = async () => {
    try {
      const isUrl = item.startsWith('https:') || item.startsWith('data:');
      await Share.share(
        {
          url: isUrl ? item : undefined,
          message,
        },
        {
          subject,
        }
      );
    } catch (error) {
      console.warn(`Couldn't share ${item}. Failed with error: ${error}`);
    }
  };

  return (
    <Button action={share} {...props}>
      {children ? children : <Label title={title} systemImage={systemImage} />}
    </Button>
  );
};
