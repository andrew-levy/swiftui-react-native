import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { resolveColor } from 'swiftui-react-native';

const SWIFTUI_COLORS = [
  'blue',
  'indigo',
  'purple',
  'pink',
  'red',
  'orange',
  'yellow',
  'green',
  'mint',
  'teal',
  'cyan',
  'brown',
  'gray',
  'accentColor',
  'primary',
  'secondary',
];

export default function NitroScreen() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Text style={styles.caption}>
        SwiftUI colors resolved through the SwiftUIColorResolver Nitro module.
      </Text>
      {SWIFTUI_COLORS.map((name) => {
        const hex = resolveColor(name);
        return (
          <View key={name} style={styles.row}>
            <View style={[styles.swatch, { backgroundColor: hex }]} />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.hex}>{hex}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  caption: { margin: 16, color: '#6b6b70' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  swatch: { width: 32, height: 32, borderRadius: 8 },
  name: { flex: 1, fontSize: 16 },
  hex: { fontVariant: ['tabular-nums'], color: '#6b6b70' },
});
