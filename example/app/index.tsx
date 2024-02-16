import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, List } from 'swiftui-react-native';

export default function Page() {
  const router = useRouter();
  return (
    <List style={{ flex: 1 }}>
      <Button title="Fonts" action={() => router.push('/fonts')} />
      <Button title="Colors" action={() => router.push('/colors')} />
      <Button title="Buttons" action={() => router.push('/buttons')} />
      <Button title="Stacks" action={() => router.push('/stacks')} />
      <Button title="Controls" action={() => router.push('/controls')} />
      <Button title="Images" action={() => router.push('/images')} />
      <Button title="Lists" action={() => router.push('/lists')} />
      <Button title="Navigation" action={() => router.push('/navigation')} />
      <Button title="Pickers" action={() => router.push('/pickers')} />
      <Button title="Progress" action={() => router.push('/progress')} />
      <Button title="Shapes" action={() => router.push('/shapes')} />
      <Button title="Group" action={() => router.push('/group')} />
      <Button title="TextField" action={() => router.push('/textfield')} />
    </List>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 960,
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 36,
    color: '#38434D',
  },
});
