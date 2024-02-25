import { NativeSyntheticEvent } from 'react-native';
import { Modifiers } from './modifiers';

export function onBaseEvent(
  e: { nativeEvent: { [key: string]: any } },
  modifiers: Modifiers,
  extraEvents?: {
    [key: string]: (e?: NativeSyntheticEvent<any>) => void;
  }
) {
  const eventName = Object.keys(e.nativeEvent).filter((key) =>
    key.startsWith('on')
  )[0];
  console.log('eventName', eventName);
  switch (eventName) {
    case 'onAppear':
      modifiers.onAppear?.();
      break;
    case 'onDisappear':
      modifiers.onDisappear?.();
      break;
    // case 'onSheetDismissed':
    //   if (
    //     typeof modifiers.sheet.isPresented === 'object' &&
    //     'setValue' in modifiers.sheet.isPresented
    //   ) {
    //     modifiers.sheet.isPresented.setValue(false);
    //   }
    //   modifiers.sheet.onDismiss?.();
    //   break;
  }

  if (extraEvents && extraEvents[eventName]) {
    extraEvents[eventName](e);
  }
}
