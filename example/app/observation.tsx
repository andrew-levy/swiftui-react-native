import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Button,
  compose,
  HStack,
  List,
  NavigationStack,
  Observable,
  Section,
  Spacer,
  Text,
  TextField,
  ToolbarItem,
  useBindable,
  useEnvironment,
  useFocusedValue,
  withAnimation,
} from 'swiftui-react-native';

class Note extends Observable {
  title: string;

  constructor(title: string) {
    super();
    this.title = title;
  }
}

class Notebook extends Observable {
  name = 'Ideas';
  notes: Note[] = [new Note('Groceries'), new Note('Trip plan')];

  get count() {
    return this.notes.length;
  }

  addNote() {
    this.notes.push(new Note(`Note ${this.notes.length + 1}`));
  }
}

function useRenderCount() {
  const renders = useRef(0);
  renders.current += 1;
  return renders.current;
}

function RenderBadge({ count }: { count: number }) {
  return (
    <Text modifiers={compose().font('caption').monospacedDigit().foregroundStyle('secondary')}>
      {`renders ${count}`}
    </Text>
  );
}

function NotebookName() {
  const notebook = useEnvironment(Notebook);
  const renders = useRenderCount();
  return (
    <HStack>
      <Text>{notebook.name}</Text>
      <Spacer />
      <RenderBadge count={renders} />
    </HStack>
  );
}

function NoteCount() {
  const notebook = useEnvironment(Notebook);
  const renders = useRenderCount();
  return (
    <HStack>
      <Text>{`${notebook.count} notes`}</Text>
      <Spacer />
      <RenderBadge count={renders} />
    </HStack>
  );
}

function Precision() {
  const notebook = useEnvironment(Notebook);
  return (
    <Section title="Each row re-renders only for what it reads">
      <NotebookName />
      <NoteCount />
      <Button onPress={() => (notebook.name = notebook.name === 'Ideas' ? 'Plans' : 'Ideas')}>
        Rename notebook
      </Button>
      <Button onPress={() => withAnimation(() => notebook.addNote())}>Add note</Button>
    </Section>
  );
}

function NoteEditor({ note }: { note: Note }) {
  const bindable = useBindable(note);
  return (
    <TextField text={bindable.$title} modifiers={compose().focusedValue(note)}>
      Title
    </TextField>
  );
}

function Editors() {
  const notebook = useEnvironment(Notebook);
  return (
    <Section title="@Bindable: each field binds to its note">
      {notebook.notes.map((note, index) => (
        <NoteEditor key={index} note={note} />
      ))}
    </Section>
  );
}

function FocusedNote() {
  const note = useFocusedValue(Note);
  return (
    <Section title="@FocusedValue: the note being edited">
      <Text modifiers={compose().foregroundStyle(note ? 'primary' : 'secondary')}>
        {note ? `Editing “${note.title}” · ${note.title.length} characters` : 'Tap a title above to edit it'}
      </Text>
    </Section>
  );
}

export default function ObservationScreen() {
  const router = useRouter();
  const [notebook] = useState(() => new Notebook());
  return (
    <NavigationStack modifiers={compose().environment(notebook)}>
      <List
        modifiers={compose()
          .navigationTitle('Observation')
          .toolbar({
            content: (
              <ToolbarItem placement="topBarLeading">
                <Button systemImage="chevron.left" onPress={() => router.back()}>
                  Back
                </Button>
              </ToolbarItem>
            ),
          })}
      >
        <Precision />
        <FocusedNote />
        <Editors />
      </List>
    </NavigationStack>
  );
}
