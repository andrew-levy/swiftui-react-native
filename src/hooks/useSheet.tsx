import { getValueOrBinding } from '../utils/binding';
import { Modifiers } from '../utils/modifiers';

export function useSheet(sheetModifier: Modifiers['sheet']) {
  const isSheetPresented = getValueOrBinding(sheetModifier?.isPresented);
  const onSheetDismissed = () => {
    if (
      typeof sheetModifier?.isPresented == 'object' &&
      'setValue' in sheetModifier?.isPresented
    ) {
      sheetModifier.isPresented.setValue(false);
    }
    sheetModifier?.onDismiss?.();
  };
  return { isSheetPresented, onSheetDismissed };
}
