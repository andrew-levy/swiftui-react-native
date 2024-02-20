import React from 'react';
import { getValueOrBinding } from '../utils/binding';
import { Modifiers } from '../utils/modifiers';
import { SheetContent } from '../views/SheetContent/SheetContent.ios';

export function useSheet(sheetModifier: Modifiers['sheet']) {
  const isSheetPresented = getValueOrBinding(sheetModifier?.isPresented);
  const onSheetDismissed = () => {
    if (
      typeof sheetModifier.isPresented == 'object' &&
      'setValue' in sheetModifier.isPresented
    ) {
      sheetModifier.isPresented.setValue(false);
    }
    sheetModifier?.onDismiss?.();
  };
  const sheetContent = sheetModifier && (
    <SheetContent>{sheetModifier.content}</SheetContent>
  );
  return { isSheetPresented, onSheetDismissed, sheetContent };
}
