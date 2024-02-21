import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { mapToNativeModifiers } from '../../utils/modifiers';
import { NativeSectionProps, SectionProps } from './types';

const NativeSection: React.ComponentType<NativeSectionProps> =
  requireNativeViewManager('Section');

export function Section({
  style,
  children,
  header,
  footer,
  ...modifiers
}: SectionProps) {
  const { width } = useWindowDimensions();
  let rowWidth = width;
  switch (modifiers.listStyle || 'insetGrouped') {
    default:
    case 'insetGrouped':
      rowWidth = width - 80;
      break;
    case 'inset':
    case 'grouped':
    case 'plain':
      rowWidth = width - 40;
      break;
  }

  return (
    <NativeSection
      modifiers={mapToNativeModifiers(modifiers)}
      header={header}
      footer={footer}
      style={{
        width: '100%',
        height: 500,
        ...(style as object),
      }}
    >
      {children}
    </NativeSection>
  );
}
