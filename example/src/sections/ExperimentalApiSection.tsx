import { useBinding } from 'swiftui-react-native';
import { SwiftUI } from 'swiftui-react-native/experimental';

const { HStack, Image, Label, Spacer, Text, Toggle, List, Stepper, VStack } =
  SwiftUI;

export const ExperimentalApiSection = () => {
  const isOn = useBinding(true);
  const stepperValue = useBinding(0);
  return VStack([
    HStack([Image('person').imageScale('large').bold(), Text('Hello, World!')]),
    HStack([
      Label('Sound', 'speaker.3.fill'),
      Spacer(),
      Toggle('Toggle', isOn),
    ]),
  ]);
};
