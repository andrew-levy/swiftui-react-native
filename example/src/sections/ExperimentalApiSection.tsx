import { SwiftUI, useBinding } from 'swiftui-react-native';

const { HStack, Image, Label, Spacer, Text, Toggle, List, Stepper } = SwiftUI;

export const ExperimentalApiSection = () => {
  console.log('ExperimentalApiSection');
  const isOn = useBinding(true);
  const stepperValue = useBinding(0);
  return List(() => [
    List.Section('Experimental API', () => [
      HStack(() => [Image('person'), Text('Hello, World!')]),
      HStack(() => [
        Label('Sound', 'speaker.3.fill'),
        Spacer(),
        Toggle('Toggle', isOn),
      ]),
      Stepper(stepperValue, [0, 10], console.log),
    ]),
  ]);
};
