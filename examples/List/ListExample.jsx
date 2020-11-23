import React from 'react';
import { List, Text } from 'swiftui-react-native';

export const StaticListExample = () => {
  return (
    <List listStyle='grouped'>
      <Text>Andrew</Text>
      <Text>Kendra</Text>
      <Text>Peter</Text>
      <Text>Tyler</Text>
      <Text>Teddy</Text>
    </List>
  );
};

export const DynamicListExample = () => {
  const names = ['Andrew', 'Kendra', 'Peter', 'Tyler', 'Teddy'];
  return (
    <List listStyle='grouped'>
      {names.map((name) => (
        <Text>{name}</Text>
      ))}
    </List>
  );
};
