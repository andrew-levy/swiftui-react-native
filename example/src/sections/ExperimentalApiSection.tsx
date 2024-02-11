import { SwiftUI, useBinding } from 'swiftui-react-native';

const { HStack, Image, Label, Spacer, Text, Toggle, List } = SwiftUI;

export const ExperimentalApiSection = () => {
  const isOn = useBinding(true);
  return List(() => [
    List.Section('Experimental API', () => [
      HStack(() => [Image('person'), Text('Hello, World!')]),
      HStack(() => [
        Label('Sound', 'speaker.3.fill'),
        Spacer(),
        Toggle('Toggle', isOn),
      ]),
    ]),
  ]);
};
