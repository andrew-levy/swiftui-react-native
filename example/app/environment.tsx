import { useRouter } from 'expo-router';
import React from 'react';
import {
  Button,
  compose,
  HStack,
  Image,
  List,
  NavigationStack,
  ObservableObject,
  Section,
  Text,
  TextField,
  Toggle,
  ToolbarItem,
  useBinding,
  useEnvironmentObject,
  useStateObject,
  withAnimation,
} from 'swiftui-react-native';

const languages: string[] = [
  'Swift',
  'TypeScript',
  'Rust',
  'Kotlin',
  'Go',
  'Zig',
];

class Session extends ObservableObject {
  name = 'Ada';
  notifications = true;
  favorites: string[] = ['Swift'];

  get canAddFavorite() {
    return this.favorites.length < languages.length;
  }

  addFavorite() {
    const next = languages.find(
      (language) => !this.favorites.includes(language)
    );
    if (next) this.favorites.push(next);
  }

  removeFavorite() {
    this.favorites.pop();
  }
}

function Greeting() {
  const session = useEnvironmentObject(Session);

  return (
    <Section title="Reads the object">
      <HStack spacing={12}>
        <Image
          systemName={session.notifications ? 'bell.fill' : 'bell.slash'}
          modifiers={compose()
            .foregroundStyle(session.notifications ? 'orange' : 'secondary')
            .contentTransition('symbolEffect')}
        />
        <Text>{`Hello, ${session.name || 'stranger'}`}</Text>
      </HStack>
    </Section>
  );
}

function Profile() {
  const session = useEnvironmentObject(Session);
  return (
    <Section title="Edits it through $ bindings">
      <TextField text={session.$name}>Name</TextField>
      <Toggle isOn={session.$notifications}>Notifications</Toggle>
    </Section>
  );
}

function Favorites() {
  const session = useEnvironmentObject(Session);
  return (
    <Section title="Mutates an array inside withAnimation">
      {session.favorites.map((language) => (
        <Text key={language}>{language}</Text>
      ))}
      <Button
        modifiers={compose().disabled(!session.canAddFavorite)}
        onPress={() => withAnimation(() => session.addFavorite())}
      >
        Add favorite
      </Button>
      <Button
        modifiers={compose().disabled(session.favorites.length === 0)}
        onPress={() => withAnimation(() => session.removeFavorite())}
      >
        Remove last
      </Button>
    </Section>
  );
}

function SheetContent({ onDone }: { onDone: () => void }) {
  const session = useEnvironmentObject(Session);
  return (
    <NavigationStack>
      <List
        modifiers={compose()
          .navigationTitle('Same object')
          .toolbar({
            content: (
              <ToolbarItem placement="confirmationAction">
                <Button onPress={onDone}>Done</Button>
              </ToolbarItem>
            ),
          })}
      >
        <Section title="Edits here show behind the sheet">
          <TextField text={session.$name}>Name</TextField>
          <Text>{`${session.favorites.length} favorites`}</Text>
        </Section>
      </List>
    </NavigationStack>
  );
}

export default function EnvironmentObjectScreen() {
  const router = useRouter();
  const session = useStateObject(() => new Session());
  const presented = useBinding(false);
  return (
    <NavigationStack modifiers={compose().environmentObject(session)}>
      <List
        modifiers={compose()
          .navigationTitle('Environment Object')
          .toolbar({
            content: (
              <ToolbarItem placement="topBarLeading">
                <Button
                  systemImage="chevron.left"
                  onPress={() => router.back()}
                >
                  Back
                </Button>
              </ToolbarItem>
            ),
          })
          .sheet({
            isPresented: presented,
            content: <SheetContent onDone={() => presented.setValue(false)} />,
          })}
      >
        <Greeting />
        <Profile />
        <Favorites />
        <Section title="Reaches presented content">
          <Button onPress={() => presented.setValue(true)}>Open sheet</Button>
        </Section>
      </List>
    </NavigationStack>
  );
}
