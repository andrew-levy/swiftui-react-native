import { useRouter } from 'expo-router';
import React from 'react';
import { Button, HStack, Image, List, Spacer } from 'swiftui-react-native';

export default function Page() {
  const router = useRouter();
  return (
    <List
      style={{ flex: 1 }}
      modifiers={{
        environment: {
          colorScheme: 'light',
        },
      }}
    >
      <ListRow title="Fonts" path="/fonts" />
      <ListRow title="Colors" path="/colors" />
      <ListRow title="Buttons" path="/buttons" />
      <ListRow title="Stacks" path="/stacks" />
      <ListRow title="Controls" path="/controls" />
      <ListRow title="Images" path="/images" />
      <ListRow title="Lists" path="/lists" />
      <ListRow title="Navigation" path="/navigation" />
      <ListRow title="Pickers" path="/pickers" />
      <ListRow title="Progress" path="/progress" />
      <ListRow title="Shapes" path="/shapes" />
      <ListRow title="Group" path="/group" />
      <ListRow title="TextField" path="/textfield" />
      <ListRow title="Experimental" path="/experimental" />
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
        style={{ width: 10, height: 10 }}
        modifiers={{
          imageScale: 'small',
          foregroundStyle: 'systemGray',
        }}
      />
    </HStack>
  );
}
