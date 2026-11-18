import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { resolveColor } from 'swiftui-react-native';

type Example = { title: string; path: string; ready: boolean };

/**
 * Component demos are marked `ready: false` until their views are moved from Expo's
 * view managers to the Fabric components; opening them shows an "unimplemented view"
 * error until then.
 */
const examples: Example[] = [
  { title: 'Generated API (proof of concept)', path: '/generated', ready: true },
  { title: 'Habits', path: '/habits', ready: true },
  { title: 'Library', path: '/library', ready: true },
  { title: 'Recipes', path: '/recipes', ready: true },
  { title: 'SwiftUI catalog', path: '/catalog', ready: true },
  { title: 'New modifiers', path: '/new-modifiers', ready: true },
  { title: 'Shapes and graphics', path: '/graphics', ready: true },
  { title: 'Animations', path: '/animations', ready: true },
  { title: 'Environment Object', path: '/environment', ready: true },
  { title: 'Observation', path: '/observation', ready: true },
  { title: 'Nitro Modules', path: '/nitro', ready: true },
  { title: 'Text', path: '/text', ready: false },
  { title: 'Colors', path: '/colors', ready: false },
  { title: 'Buttons', path: '/buttons', ready: false },
  { title: 'Stacks', path: '/stacks', ready: false },
  { title: 'Lists', path: '/lists', ready: false },
  { title: 'Controls', path: '/controls', ready: false },
  { title: 'Images', path: '/images', ready: false },
  { title: 'Pickers', path: '/pickers', ready: false },
  { title: 'Progress', path: '/progress', ready: false },
  { title: 'Shapes', path: '/shapes', ready: false },
  { title: 'TextField', path: '/textfield', ready: false },
  { title: 'Filters', path: '/filters', ready: false },
];

function nitroStatus() {
  try {
    return { ok: true, text: `Nitro OK · indigo = ${resolveColor('indigo')}` };
  } catch (error) {
    return { ok: false, text: `Nitro unavailable: ${String(error)}` };
  }
}

/** Opens a screen on launch (`EXPO_PUBLIC_INITIAL_ROUTE=/generated yarn start`): handy for screenshots and CI. */
const initialRoute = process.env.EXPO_PUBLIC_INITIAL_ROUTE;

export default function Page() {
  const router = useRouter();
  const nitro = nitroStatus();
  useEffect(() => {
    if (initialRoute) router.push(initialRoute as any);
  }, [router]);
  return (
    <ScrollView
      style={styles.screen}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
    >
      <Text style={styles.header}>SWIFTUI REACT NATIVE</Text>
      <View style={styles.group}>
        {examples.map((example, index) => (
          <Pressable
            key={example.path}
            onPress={() => router.push(example.path as any)}
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
          >
            <Text style={styles.title}>{example.title}</Text>
            {!example.ready && <Text style={styles.badge}>Pending</Text>}
            <Text style={styles.chevron}>›</Text>
            {index < examples.length - 1 && <View style={styles.separator} />}
          </Pressable>
        ))}
      </View>
      <Text style={styles.footer}>
        Each item demonstrates a component or feature of swiftui-react-native.
      </Text>
      <Text
        style={[styles.footer, { color: nitro.ok ? '#248a3d' : '#d70015' }]}
      >
        {nitro.text}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f2f2f7' },
  content: { padding: 16 },
  header: { fontSize: 13, color: '#6d6d72', marginLeft: 16, marginBottom: 8 },
  group: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    paddingHorizontal: 16,
  },
  rowPressed: { backgroundColor: '#e5e5ea' },
  title: { flex: 1, fontSize: 17, color: '#007aff' },
  badge: { fontSize: 13, color: '#8e8e93', marginRight: 8 },
  chevron: { fontSize: 22, color: '#c7c7cc' },
  separator: {
    position: 'absolute',
    left: 16,
    right: 0,
    bottom: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#c6c6c8',
  },
  footer: {
    fontSize: 13,
    color: '#6d6d72',
    marginHorizontal: 16,
    marginTop: 8,
  },
});
