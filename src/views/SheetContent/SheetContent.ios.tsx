import { requireNativeViewManager } from 'expo-modules-core';
import React, { ReactNode } from 'react';

const NativeSheetContent: React.ComponentType<{
  children: ReactNode;
  style?: object;
}> = requireNativeViewManager('SheetContent');

export function SheetContent({ children }: { children: ReactNode }) {
  return (
    <NativeSheetContent
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </NativeSheetContent>
  );
}
