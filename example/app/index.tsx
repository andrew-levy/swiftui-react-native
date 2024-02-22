import { useRouter } from 'expo-router';
import React from 'react';
import { Button, HStack, Image, List, Spacer } from 'swiftui-react-native';

export default function Page() {
  return (
    <List
      style={{ flex: 1 }}
      environment={{
        colorScheme: 'light',
      }}
      listStyle="insetGrouped"
      header="SwiftUI for React Native"
      footer='This is a demo of the **"swiftui-react-native"** library. Each section demonstrates a different component or feature.'
    >
      <ListRow title="Text" path="/text" />
      <ListRow title="Colors" path="/colors" />
      <ListRow title="Buttons" path="/buttons" />
      <ListRow title="Stacks" path="/stacks" />
      <ListRow title="Controls" path="/controls" />
      <ListRow title="Images" path="/images" />
      <ListRow title="Sheet" path="/sheet" />
      <ListRow title="Pickers" path="/pickers" />
      <ListRow title="Progress" path="/progress" />
      <ListRow title="Shapes" path="/shapes" />
      <ListRow title="Group" path="/group" />
      <ListRow title="TextField" path="/textfield" />
      <ListRow title="Experimental API" path="/experimental" />
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
