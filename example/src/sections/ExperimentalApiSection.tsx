import { useMemo } from 'react';
import { useBinding } from 'swiftui-react-native';
import {
  Button,
  Color,
  ColorPicker,
  DatePicker,
  HStack,
  Image,
  Label,
  List,
  RoundedRectangle,
  Section,
  Slider,
  Spacer,
  Text,
  Toggle,
  VStack,
  ZStack,
} from 'swiftui-react-native/experimental';

export const ExperimentalApiSection = () => {
  const isOn = useBinding(true);
  const stepperValue = useBinding(0);
  const color = useBinding('#ff0000');
  const today = useMemo(() => new Date(), []);
  const date = useBinding(today);
  return List(
    Section(
      { header: 'Experimental API' },
      ZStack(
        { alignment: 'center' },
        RoundedRectangle({ cornerRadius: 10 })
          .frame({
            width: 100,
            height: 100,
          })
          .fill('blue'),
        Text('Hello, World!')
          .bold()
          .foregroundStyle('white')
          .border({ width: 4, color: 'green' })
      )
        .border({ width: 4, color: 'green' })
        .padding({ vertical: 20 })
        .italic(),
      DatePicker({
        title: 'Date',
        selection: date,
        displayedComponents: ['date', 'hourAndMinute'],
      }).border({ width: 1, color: 'gray' }),

      Slider({ value: stepperValue, range: [0, 100], step: 10 }).frame({
        width: 320,
      }),

      HStack(
        { alignment: 'center', spacing: 10 },
        Image({ systemName: 'person' }).bold(),
        Spacer(),
        Text('Hello, World!').bold()
      ),
      Button(
        { action: () => console.log('Hello, World!') },
        Label({ systemImage: 'person', title: 'Hello, World!' })
      ),
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
        Text('Hello, World!')
      ).frame({ height: 200 }),
      ColorPicker({ selection: color, title: 'Color' })
        .style({ width: '100%' })
        .border({ width: 1, color: 'gray' })
        .padding({ vertical: 10 })
    )
  ).style({ flex: 1 });
};
