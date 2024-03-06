import { useBinding } from 'swiftui-react-native';
import {
  Button,
  Color,
  ColorPicker,
  HStack,
  Image,
  Label,
  List,
  Section,
  Spacer,
  Text,
  Toggle,
  VStack,
} from 'swiftui-react-native/experimental';

export const ExperimentalApiSection = () => {
  const isOn = useBinding(true);
  const stepperValue = useBinding(0);
  const color = useBinding('#ff0000');
  return List(
    Section(
      { header: 'Experimental API' },
      HStack(
        { alignment: 'leading', spacing: 10 },
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

      Toggle({ title: 'Sound', isOn }).frame({ width: 320 }),
      Label({ systemImage: '02.circle.fill', title: 'Sound' })
        .bold()
        .frame({ width: 100 }),
      VStack(
        { alignment: 'leading', spacing: 10 },
        Text('Hello, World!'),
        Text('Hello, World!'),
        Text('Hello, World!'),
        Button({
          title: 'Hello, World!',
          action: () => console.log('Hello, World!'),
        })
      ),
      ColorPicker({ selection: color, title: 'Color' })
    )
  ).style({ flex: 1 });
};
