import { useRouter } from 'expo-router';
import React from 'react';
import { Button, HStack, Image, List, Spacer } from 'swiftui-react-native';

const sections = [
  { title: 'Text', path: '/text' },
  { title: 'Colors', path: '/colors' },
  { title: 'Buttons', path: '/buttons' },
  { title: 'Stacks', path: '/stacks' },
  { title: 'Controls', path: '/controls' },
  { title: 'Images', path: '/images' },
  { title: 'Sheet', path: '/sheet' },
  { title: 'Pickers', path: '/pickers' },
  { title: 'Progress', path: '/progress' },
  { title: 'Shapes', path: '/shapes' },
  { title: 'Group', path: '/group' },
  { title: 'TextField', path: '/textfield' },
  { title: 'Filters', path: '/filters' },
  { title: 'Experimental API', path: '/experimental' },
];

export default function Page() {
  return (
    <List
      data={sections}
      style={{ flex: 1 }}
      environment={{
        colorScheme: 'light',
      }}
      listStyle="insetGrouped"
      header="SwiftUI for React Native"
      footer='This is a demo of the **"swiftui-react-native"** library. Each section demonstrates a different component or feature.'
    >
      {(item) => <ListRow title={item.title} path={item.path} />}
    </List>
  );
}

function ListRow({ title, path }: { title: string; path: string }) {
  const router = useRouter();
  return (
    <HStack>
      <Button title={title} action={() => router.push(path)} />
      <Spacer />
      <Image
        systemName="chevron.right"
        imageScale="small"
        foregroundStyle="gray"
        style={{ width: 10, height: 10 }}
      />
    </HStack>
  );
}
