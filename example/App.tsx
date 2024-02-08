import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import {
  EnvironmentProvider,
  Text,
  useEnvironment,
  useUIColor,
} from 'swiftui-react-native';
import { ButtonSection } from './src/sections/ButtonSection';
import { ColorSection } from './src/sections/ColorSection';
import { ControlSection } from './src/sections/ControlSection';
import { FontSection } from './src/sections/FontSection';
import { ImageSection } from './src/sections/ImageSection';
import { PickerSection } from './src/sections/PickerSection';
import { ProgressSection } from './src/sections/ProgressSection';
import { ShapeSection } from './src/sections/ShapeSection';
import { StackSection } from './src/sections/StackSection';
import { TextFieldSection } from './src/sections/TextFieldSection';

// Wrap the app in a EnvironmentProvider to enable light/dark mode by default
export default function App() {
  return (
    <EnvironmentProvider colorScheme="light">
      <Examples />
    </EnvironmentProvider>
  );
}

const Examples = () => {
  const env = useEnvironment();
  const UIColor = useUIColor();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: UIColor.secondarySystemBackground },
      ]}
    >
      <StatusBar
        barStyle={
          env?.colorScheme === 'dark' ? 'light-content' : 'dark-content'
        }
      />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <Text padding={20} alignment="leading" font="title" bold>
          SwiftUI React Native
        </Text>
        <FontSection />
        <ButtonSection />
        <ControlSection />
        <TextFieldSection />
        <ProgressSection />
        <PickerSection />
        <ImageSection />
        <StackSection />
        <ShapeSection />
        <ColorSection />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    justifyContent: 'flex-start',
  },
  contentContainerStyle: { paddingBottom: 50 },
});
