import React, { PropsWithChildren } from 'react';
import { Share } from 'react-native';
import { Button } from '../Button';
import { ButtonProps } from '../Button/Button';
import { SystemName } from '../Image/types';
import { Label } from '../Label';
import { Image } from '../Image';

type ShareLinkProps = PropsWithChildren<
  {
    item: string;
    message?: string;
    subject?: string;
    systemImage?: SystemName;
  } & Omit<ButtonProps, 'action'>
>;

export const ShareLink = ({
  item,
  message,
  subject,
  children,
  title,
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
      console.warn(`Couldn't share ${item}`);
    }
  };
  return (
    <Button action={share} {...props}>
      {title ? (
        <Label title={title} systemImage={systemImage} />
      ) : (
        children || <Image systemName={systemImage} />
      )}
    </Button>
  );
};
