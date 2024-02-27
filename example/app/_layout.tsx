import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'SwiftUI RN',
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="experimental"
        options={{ title: 'Experimental API' }}
      />
      <Stack.Screen name="buttons" options={{ title: 'Buttons' }} />
      <Stack.Screen name="controls" options={{ title: 'Controls' }} />
      <Stack.Screen name="images" options={{ title: 'Images' }} />
      <Stack.Screen name="text" options={{ title: 'Text' }} />
      <Stack.Screen name="textfield" options={{ title: 'Text Fields' }} />
      <Stack.Screen name="progress" options={{ title: 'Progress' }} />
      <Stack.Screen name="shapes" options={{ title: 'Shapes' }} />
      <Stack.Screen name="stacks" options={{ title: 'Stacks' }} />
      <Stack.Screen name="filters" options={{ title: 'Filters' }} />
      <Stack.Screen name="colors" options={{ title: 'Colors' }} />
      <Stack.Screen name="pickers" options={{ title: 'Pickers' }} />
    </Stack>
  );
}
