import { useBinding } from 'swiftui-react-native';
import { SwiftUI } from 'swiftui-react-native/experimental';

const {
  HStack,
  Image,
  Label,
  Spacer,
  Text,
  Toggle,
  List,
  Stepper,
  VStack,
  Button,
  Color,
} = SwiftUI;

export const ExperimentalApiSection = () => {
  const isOn = useBinding(true);
  const stepperValue = useBinding(0);
  return List(
    HStack(
      { alignment: 'center', spacing: 10 },
      Image({ systemName: 'person' }).bold(),
      Spacer(),
      Text('Hello, World!').bold()
    ),
    Button({
      title: 'Hello, World!',
      action: () => console.log('Hello, World!'),
    }),
    Image({ systemName: 'person' }),
    Color.red.frame({ width: 100, height: 100 }),
    Toggle({ label: 'Sound', isOn }).frame({ width: 320 }),
    Label({ systemImage: '02.circle.fill', title: 'Sound' })
      .bold()
      .frame({ width: 100 }),
    VStack(
      Text('Hello, World!'),
      Text('Hello, World!'),
      Text('Hello, World!'),
      Button({
        title: 'Hello, World!',
        action: () => console.log('Hello, World!'),
      })
    )
  );
};
