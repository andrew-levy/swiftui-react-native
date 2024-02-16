import { Stack } from 'expo-router';
import React from 'react';
import { EnvironmentProvider } from 'swiftui-react-native';

export default function Layout() {
  return (
    <EnvironmentProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'SwiftUI RN',
            headerLargeTitle: true,
          }}
        />
      </Stack>
    </EnvironmentProvider>
  );
}
