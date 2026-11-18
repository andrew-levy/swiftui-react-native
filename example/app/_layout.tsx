import * as React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'SwiftUI RN',
          headerLargeTitle: true,
          scrollEdgeEffects: {
            top: 'soft',
          },
        }}
      />
      <Stack.Screen
        name="generated"
        options={{ title: 'Generated API', headerShown: true }}
      />
      <Stack.Screen
        name="habits"
        options={{ title: 'Habits', headerShown: false }}
      />
      <Stack.Screen
        name="library"
        options={{ title: 'Library', headerShown: false }}
      />
      <Stack.Screen
        name="recipes"
        options={{ title: 'Recipes', headerShown: false }}
      />
      <Stack.Screen
        name="animations"
        options={{ title: 'Animations', headerShown: false }}
      />
      <Stack.Screen
        name="environment"
        options={{ title: 'Environment Object', headerShown: false }}
      />
      <Stack.Screen
        name="observation"
        options={{ title: 'Observation', headerShown: false }}
      />
      <Stack.Screen name="coverage" options={{ title: 'Coverage' }} />
      <Stack.Screen
        name="banner"
        options={{ title: 'Banner', headerShown: false }}
      />
      <Stack.Screen
        name="runtime"
        options={{ title: 'Runtime', headerShown: false }}
      />
      <Stack.Screen
        name="catalog"
        options={{ title: 'Catalog', headerShown: false }}
      />
      <Stack.Screen name="new-modifiers" options={{ title: 'New Modifiers' }} />
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
      <Stack.Screen name="lists" options={{ title: 'Lists' }} />
      <Stack.Screen name="nitro" options={{ title: 'Nitro Modules' }} />
    </Stack>
  );
}
