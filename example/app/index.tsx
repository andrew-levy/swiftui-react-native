import { useRouter } from 'expo-router';
import React from 'react';
import {
  Button,
  ForEach,
  HStack,
  Image,
  List,
  Section,
  Spacer,
} from 'swiftui-react-native';

const examples = [
  { title: 'Text', path: '/text' },
  { title: 'Colors', path: '/colors' },
  { title: 'Buttons', path: '/buttons' },
  { title: 'Stacks', path: '/stacks' },
  { title: 'Lists', path: '/lists' },
  { title: 'Controls', path: '/controls' },
  { title: 'Images', path: '/images' },
  { title: 'Pickers', path: '/pickers' },
  { title: 'Progress', path: '/progress' },
  { title: 'Shapes', path: '/shapes' },
  { title: 'TextField', path: '/textfield' },
  { title: 'Filters', path: '/filters' },
  { title: 'Experimental API', path: '/experimental' },
];

export default function Page() {
  return (
    <List
      style={{ flex: 1 }}
      environment={{
        colorScheme: 'light',
      }}
      listStyle="insetGrouped"
    >
      <Section
        header="SwiftUI React Native"
        footer='This is a demo of the **"swiftui-react-native"** library. Each section demonstrates a different component or feature.'
      >
        {ForEach(examples, (example) => (
          <ListRow
            key={example.title}
            title={example.title}
            path={example.path}
          />
        ))}
      </Section>
    </List>
  );
}

function ListRow({ title, path }: { title: string; path: string }) {
  const router = useRouter();
  return (
    <HStack>
      <Button title={title} action={() => router.push(path as any)} />
      <Spacer />
      <Image
        systemName="chevron.right"
        imageScale="small"
        foregroundStyle="gray"
        frame={{ width: 10, height: 10 }}
      />
    </HStack>
  );
}
