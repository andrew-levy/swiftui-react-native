import React from 'react';
import { View, ScrollView, StatusBar, StyleSheet } from 'react-native';
import {
  Text,
  useUIColor,
  useColorScheme,
  ColorSchemeProvider,
  Font,
  Alignment,
} from 'swiftui-react-native';
import { ButtonSection } from './sections/ButtonSection';
import { ColorSection } from './sections/ColorSection';
import { ControlSection } from './sections/ControlSection';
import { FontSection } from './sections/FontSection';
import { ImageSection } from './sections/ImageSection';
import { StackSection } from './sections/StackSection';
import { TextFieldSection } from './sections/TextFieldSection';

/**
 * This is a demo app that displays all of the components offered by the library.
 * To present them nicely, each section is wrapped in a List view, but they are not
 * required to be.
 */
export default function App() {
  return (
    // Wrap the app in a ColorSchemeProvider to enable light/dark mode by default
    <ColorSchemeProvider preferredColorScheme='light'>
      <Examples />
    </ColorSchemeProvider>
  );
}

const Examples = () => {
  // Get the current color scheme
  const { colorScheme } = useColorScheme();
  // Get the current UIColor palette
  const UIColor = useUIColor();
  return (
    <View style={[styles.container, { backgroundColor: UIColor.systemGray6 }]}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <ScrollView>
        <Text
          padding={20}
          alignment={Alignment.leading}
          font={Font.title}
          fontWeight='bold'
        >
          SwiftUI React Native
        </Text>
        <FontSection />
        <ButtonSection />
        <ControlSection />
        <ImageSection />
        <TextFieldSection />
        <StackSection />
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
});
