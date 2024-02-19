import { requireNativeViewManager } from 'expo-modules-core';
import React, { ReactNode } from 'react';

const NativeSheetContent: React.ComponentType<{
  children: ReactNode;
  style: object;
}> = requireNativeViewManager('SheetContent');

export function SheetContent({ children }: { children: ReactNode }) {
  return (
    <NativeSheetContent
      style={{
        position: 'absolute',
      }}
    >
      {children}
    </NativeSheetContent>
  );
}
