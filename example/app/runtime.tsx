import { useFonts } from 'expo-font';
import React, { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import { LogBox, StyleSheet, Text as RNText, View } from 'react-native';
import {
  AppStorage,
  Button,
  compose,
  Environment,
  GeometryReader,
  HStackLayout,
  LazyVStack,
  NavigationStack,
  Observable,
  ObservableObject,
  RoundedRectangle,
  ScaledMetric,
  ScrollView as SwiftUIScrollView,
  ScrollViewReader,
  SwiftUI,
  Text,
  TextField,
  ToolbarItem,
  useBinding,
  useBindable,
  useEnvironment,
  useEnvironmentObject,
  useFocusedObject,
  useFocusedValue,
  useStateObject,
  VStack,
  withAnimation,
  withObservationTracking,
  withTransaction,
} from 'swiftui-react-native';
import { graphicsChecks } from '../src/graphics/checks';

const SERVER = 'http://127.0.0.1:8787';
const TIMEOUT_MS = 6000;
const TOUCH_TIMEOUT_MS = 60000;

type Report = (status: 'passed' | 'failed', detail?: string) => void;
type Check = {
  name: string;
  run: (report: Report) => ReactNode;
  touch?: 'testTap' | 'testDrag';
};

const nativeWarnings: string[] = [];

function AnimationCompletion({ report }: { report: Report }) {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const started = Date.now();
    const timer = setTimeout(() => {
      withAnimation(
        SwiftUI.Animation.linear({ duration: 1 }),
        () => setWide(true),
        {
          completion: () => {
            const elapsed = Date.now() - started - 100;
            report(
              elapsed > 800 && elapsed < 2500 ? 'passed' : 'failed',
              `completion after ${elapsed} ms of a 1000 ms animation`
            );
          },
        }
      );
    }, 100);
    return () => clearTimeout(timer);
  }, [report]);
  // The text has nothing to animate: it must not end the scope early.
  return (
    <VStack>
      <Text>{wide ? 'Wide' : 'Narrow'}</Text>
      <RoundedRectangle
        cornerRadius={8}
        modifiers={compose()
          .foregroundStyle('blue')
          .frame({ width: wide ? 300 : 60, height: 40 })}
      />
    </VStack>
  );
}

function TransactionPatch({ report }: { report: Report }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const timer = setTimeout(
      () => withTransaction({ disablesAnimations: true }, () => setOn(true)),
      100
    );
    const verdict = setTimeout(() => {
      const rejected = nativeWarnings.find((line) =>
        line.includes('withTransaction')
      );
      report(
        rejected ? 'failed' : 'passed',
        rejected ?? 'native applied the commit inside withTransaction'
      );
    }, 600);
    return () => {
      clearTimeout(timer);
      clearTimeout(verdict);
    };
  }, [report]);
  return <Text modifiers={compose().opacity(on ? 0.5 : 1)}>Transaction</Text>;
}

function EnvironmentReadWrite({ report }: { report: Report }) {
  return (
    <VStack modifiers={compose().environment('colorScheme', 'dark')}>
      <Environment keyPath="colorScheme">
        {(value) => {
          if (value === 'dark')
            report(
              'passed',
              'read back the value written by environment(_:_:)'
            );
          return <Text>{String(value)}</Text>;
        }}
      </Environment>
    </VStack>
  );
}

class CheckModel extends ObservableObject {
  count = 0;
  items: string[] = [];
  label = 'start';
}

function EnvironmentObjectReader({ report }: { report: Report }) {
  const model = useEnvironmentObject(CheckModel);
  const { count, items, label } = model;
  useEffect(() => {
    if (count === 1 && items.length === 1 && label === 'done') {
      report('passed', 'a reader inside a SwiftUI render closure saw every change');
    }
  }, [count, items.length, label, report]);
  return (
    <VStack>
      <Text>{`${count} ${items.join(',')} ${label}`}</Text>
      <TextField text={model.$label}>Label</TextField>
    </VStack>
  );
}

function EnvironmentObjectFlow({ report }: { report: Report }) {
  const model = useStateObject(() => new CheckModel());
  useEffect(() => {
    const timer = setTimeout(() => {
      withAnimation(() => {
        model.count += 1;
        model.items.push('row');
      });
      model.$label.setValue('done');
    }, 100);
    return () => clearTimeout(timer);
  }, [model]);
  return (
    <VStack modifiers={compose().environmentObject(model)}>
      <GeometryReader modifiers={compose().frame({ width: 300, height: 120 })}>
        {() => <EnvironmentObjectReader report={report} />}
      </GeometryReader>
    </VStack>
  );
}

function ToolbarObjectReader({ report }: { report: Report }) {
  const model = useEnvironmentObject(CheckModel);
  useEffect(() => {
    if (model.label === 'start') model.label = 'toolbar';
    else if (model.label === 'toolbar') report('passed', 'a toolbar item read the object and re-rendered after a change');
  }, [model, model.label, report]);
  return <Text>{model.label}</Text>;
}

function EnvironmentObjectToolbar({ report }: { report: Report }) {
  const model = useStateObject(() => new CheckModel());
  return (
    <NavigationStack style={{ height: 240 }} modifiers={compose().environmentObject(model)}>
      <Text
        modifiers={compose().toolbar({
          content: (
            <ToolbarItem placement="topBarTrailing">
              <ToolbarObjectReader report={report} />
            </ToolbarItem>
          ),
        })}
      >
        Toolbar
      </Text>
    </NavigationStack>
  );
}

function DestinationObjectReader({ report }: { report: Report }) {
  const model = useEnvironmentObject(CheckModel);
  useEffect(() => {
    if (model.count === 0) {
      const timer = setTimeout(() => withAnimation(() => (model.count += 1)), 100);
      return () => clearTimeout(timer);
    }
    report('passed', 'a pushed navigationDestination closure read the object and re-rendered after a change');
    return undefined;
  }, [model, model.count, report]);
  return <Text>{`Detail ${model.count}`}</Text>;
}

function EnvironmentObjectDestination({ report }: { report: Report }) {
  const model = useStateObject(() => new CheckModel());
  const item = useBinding<string | null>(null);
  useEffect(() => {
    const timer = setTimeout(() => item.setValue('detail'), 300);
    return () => clearTimeout(timer);
  }, []);
  return (
    <NavigationStack style={{ height: 240 }} modifiers={compose().environmentObject(model)}>
      <Text
        modifiers={compose().navigationDestination({
          item,
          destination: () => <DestinationObjectReader report={report} />,
        })}
      >
        Root
      </Text>
    </NavigationStack>
  );
}

class AdminModel extends CheckModel {}
class MissingModel extends ObservableObject {}

// The missing-object check throws on purpose; keep its expected error off the screen.
LogBox.ignoreLogs([/No ObservableObject of type MissingModel found/, /No Observable object of type MissingLibrary found/]);

class CatchError extends Component<{ onError: (message: string) => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error) {
    this.props.onError(error.message);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function LookupProbe({ onRead }: { onRead: (object: CheckModel) => void }) {
  const object = useEnvironmentObject(CheckModel);
  useEffect(() => {
    onRead(object);
  }, [object, onRead]);
  return <Text>{object instanceof AdminModel ? 'admin' : 'base'}</Text>;
}

function MissingProbe() {
  useEnvironmentObject(MissingModel);
  return null;
}

function EnvironmentObjectLookup({ report }: { report: Report }) {
  const base = useStateObject(() => new CheckModel());
  const admin = useStateObject(() => new AdminModel());
  const seen = useRef<{ outer?: CheckModel; inner?: CheckModel; error?: string }>({});
  const settle = useRef(() => {
    const { outer, inner, error } = seen.current;
    if (!outer || !inner || error === undefined) return;
    const expected = 'No ObservableObject of type MissingModel found. A View.environmentObject(_:) for MissingModel may be missing as an ancestor of this view.';
    const ok = outer === base && inner === admin && error === expected;
    report(ok ? 'passed' : 'failed', ok ? 'nearest ancestor won, a subclass satisfied its base, and a missing type threw SwiftUI’s message' : JSON.stringify({ outer: outer === base, inner: inner === admin, error }));
  }).current;
  const onOuter = useRef((object: CheckModel) => ((seen.current.outer = object), settle())).current;
  const onInner = useRef((object: CheckModel) => ((seen.current.inner = object), settle())).current;
  const onError = useRef((message: string) => ((seen.current.error = message), settle())).current;
  return (
    <VStack modifiers={compose().environmentObject(base)}>
      <LookupProbe onRead={onOuter} />
      <VStack modifiers={compose().environmentObject(admin)}>
        <LookupProbe onRead={onInner} />
        <CatchError onError={onError}>
          <MissingProbe />
        </CatchError>
      </VStack>
    </VStack>
  );
}

class CollectionModel extends ObservableObject {
  scores = new Map<string, number>([['a', 1]]);
  tags = new Set<string>();
  updated = new Date(0);
}

function CollectionReader({ report }: { report: Report }) {
  const model = useEnvironmentObject(CollectionModel);
  const summary = `${model.scores.get('a')} ${[...model.tags].join(',')} ${model.updated.getUTCFullYear()}`;
  useEffect(() => {
    if (summary === '2 new 2026') report('passed', 'Map, Set and Date changes inside withAnimation re-rendered the reader');
  }, [summary, report]);
  return <Text>{summary}</Text>;
}

function EnvironmentObjectCollections({ report }: { report: Report }) {
  const model = useStateObject(() => new CollectionModel());
  useEffect(() => {
    const timer = setTimeout(
      () =>
        withAnimation(() => {
          model.scores.set('a', 2);
          model.tags.add('new');
          model.updated.setUTCFullYear(2026);
        }),
      100
    );
    return () => clearTimeout(timer);
  }, [model]);
  return (
    <VStack modifiers={compose().environmentObject(model)}>
      <CollectionReader report={report} />
    </VStack>
  );
}

class CheckBook extends Observable {
  title = 'Dune';
}

class CheckLibrary extends Observable {
  name = 'City';
  books: CheckBook[] = [new CheckBook()];
  get count() {
    return this.books.length;
  }
}

type RenderCounts = { name: number; books: number };

function LibraryName({ renders }: { renders: { current: RenderCounts } }) {
  const library = useEnvironment(CheckLibrary);
  renders.current.name += 1;
  return <Text>{library.name}</Text>;
}

// No hook of its own: it reads through the parent's view, so the parent re-renders for it.
function BookTitle({ book }: { book: CheckBook }) {
  return <Text>{book.title}</Text>;
}

function LibraryBooks({ renders }: { renders: { current: RenderCounts } }) {
  const library = useEnvironment(CheckLibrary);
  renders.current.books += 1;
  return (
    <VStack>
      {library.books.map((book, index) => (
        <BookTitle key={index} book={book} />
      ))}
      <Text>{`${library.count} books`}</Text>
    </VStack>
  );
}

function ObservablePrecision({ report }: { report: Report }) {
  const [library] = useState(() => new CheckLibrary());
  const renders = useRef<RenderCounts>({ name: 0, books: 0 });
  useEffect(() => {
    const deltas: RenderCounts[] = [];
    const steps = [
      () => withAnimation(() => library.books.push(new CheckBook())),
      () => (library.books[0]!.title = 'Emma'),
      () => (library.name = 'Town'),
    ];
    let before = { ...renders.current };
    const timers = steps.map((step, index) =>
      setTimeout(() => {
        if (index > 0) deltas.push({ name: renders.current.name - before.name, books: renders.current.books - before.books });
        before = { ...renders.current };
        step();
      }, 200 + index * 250)
    );
    timers.push(
      setTimeout(() => {
        deltas.push({ name: renders.current.name - before.name, books: renders.current.books - before.books });
        const [push, title, name] = deltas as [RenderCounts, RenderCounts, RenderCounts];
        const ok = push.name === 0 && push.books > 0 && title.name === 0 && title.books > 0 && name.name > 0 && name.books === 0;
        report(ok ? 'passed' : 'failed', `renders per change (name, books): push ${push.name},${push.books}; nested title ${title.name},${title.books}; name ${name.name},${name.books}`);
      }, 200 + steps.length * 250)
    );
    return () => timers.forEach(clearTimeout);
  }, [library, report]);
  return (
    <VStack modifiers={compose().environment(library)}>
      <LibraryName renders={renders} />
      <LibraryBooks renders={renders} />
    </VStack>
  );
}

class MissingLibrary extends Observable {}

function OptionalProbe({ onRead }: { onRead: (value: unknown) => void }) {
  const missing = useEnvironment(MissingLibrary, { optional: true });
  useEffect(() => {
    onRead(missing);
  }, [missing, onRead]);
  return null;
}

function RequiredProbe() {
  useEnvironment(MissingLibrary);
  return null;
}

function BoundTitle({ book, onTitle }: { book: CheckBook; onTitle: (title: string) => void }) {
  const bindable = useBindable(book);
  useEffect(() => {
    onTitle(bindable.title);
  }, [bindable.title, onTitle]);
  useEffect(() => {
    const timer = setTimeout(() => bindable.$title.setValue('Bound'), 150);
    return () => clearTimeout(timer);
  }, [bindable]);
  return <TextField text={bindable.$title}>Title</TextField>;
}

function BindableAndEnvironment({ report }: { report: Report }) {
  const [book] = useState(() => new CheckBook());
  const seen = useRef<{ optional?: unknown; error?: string; titles: string[]; tracked?: string }>({ titles: [] });
  const settle = useRef(() => {
    const { optional, error, titles, tracked } = seen.current;
    if (error === undefined || !titles.includes('Bound') || tracked === undefined) return;
    const expected = 'No Observable object of type MissingLibrary found. A View.environment(_:) for MissingLibrary may be missing as an ancestor of this view.';
    const ok = optional === null && error === expected && tracked === 'Dune';
    report(ok ? 'passed' : 'failed', ok ? 'a $ binding wrote through useBindable, an optional lookup gave null, a missing one threw SwiftUI’s message, and withObservationTracking saw the old value' : JSON.stringify(seen.current));
  }).current;
  const onRead = useRef((value: unknown) => ((seen.current.optional = value), settle())).current;
  const onError = useRef((message: string) => ((seen.current.error = message), settle())).current;
  const onTitle = useRef((title: string) => (seen.current.titles.push(title), settle())).current;
  useEffect(() => {
    withObservationTracking(() => book.title, {
      onChange: () => {
        seen.current.tracked = book.title;
        settle();
      },
    });
  }, [book, settle]);
  return (
    <VStack>
      <BoundTitle book={book} onTitle={onTitle} />
      <OptionalProbe onRead={onRead} />
      <CatchError onError={onError}>
        <RequiredProbe />
      </CatchError>
    </VStack>
  );
}

class FocusDocument extends ObservableObject {
  name = 'scene';
}

class FocusDraft extends Observable {
  words = 0;
}

type FocusSample = { document: string | null; draft: number | null };

function FocusReader({ onSample }: { onSample: (sample: FocusSample) => void }) {
  const document = useFocusedObject(FocusDocument);
  const draft = useFocusedValue(FocusDraft);
  const sample = { document: document?.name ?? null, draft: draft ? draft.words : null };
  useEffect(() => {
    onSample(sample);
  }, [sample.document, sample.draft]);
  return <Text>{`${sample.document} ${sample.draft}`}</Text>;
}

function FocusedObjects({ report }: { report: Report }) {
  const [sceneDocument] = useState(() => new FocusDocument());
  const [fieldDocument] = useState(() => {
    const document = new FocusDocument();
    document.name = 'field';
    return document;
  });
  const [draft] = useState(() => new FocusDraft());
  const [sceneDraft] = useState(() => {
    const scene = new FocusDraft();
    scene.words = 100;
    return scene;
  });
  const text = useBinding('');
  const focused = useBinding(false);
  const samples = useRef<FocusSample[]>([]);
  const onSample = useRef((sample: FocusSample) => {
    samples.current.push(sample);
  }).current;
  useEffect(() => {
    const timers = [
      setTimeout(() => focused.setValue(true), 400),
      setTimeout(() => (draft.words = 3), 1200),
      setTimeout(() => focused.setValue(false), 1800),
      setTimeout(() => {
        const seen = samples.current.map((s) => `${s.document}/${s.draft}`);
        const order = ['scene/100', 'field/0', 'field/3', 'scene/100'];
        let at = 0;
        for (const entry of seen) if (entry === order[at]) at += 1;
        report(at === order.length ? 'passed' : 'failed', `focus samples: ${seen.join(' → ')}`);
      }, 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);
  return (
    <VStack modifiers={compose().focusedSceneObject(sceneDocument).focusedSceneValue(sceneDraft)}>
      <VStack modifiers={compose().focusedObject(fieldDocument).focusedValue(draft)}>
        <TextField text={text} modifiers={compose().focused(focused)}>
          Field
        </TextField>
      </VStack>
      <FocusReader onSample={onSample} />
    </VStack>
  );
}

function DismissHandle({ report }: { report: Report }) {
  const presented = useBinding(false);
  const called = useRef(false);
  useEffect(() => {
    const timer = setTimeout(() => presented.setValue(true), 100);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (called.current && !presented.value)
      report('passed', 'dismiss() closed the sheet and wrote the binding');
  }, [presented.value, report]);
  return (
    <Text
      modifiers={compose().sheet({
        isPresented: presented,
        content: (
          <Environment keyPath="dismiss">
            {(dismiss) => {
              if (!called.current) {
                called.current = true;
                setTimeout(() => {
                  dismiss().catch((error: unknown) =>
                    report('failed', String(error))
                  );
                }, 700);
              }
              return <Text>Sheet</Text>;
            }}
          </Environment>
        ),
      })}
    >
      Host
    </Text>
  );
}

function ScrollProxy({ report }: { report: Report }) {
  const called = useRef(false);
  return (
    <SwiftUIScrollView modifiers={compose().frame({ height: 80 })}>
      <ScrollViewReader>
        {(proxy) => {
          if (!called.current) {
            called.current = true;
            setTimeout(() => {
              proxy
                .scrollTo('end', { anchor: 'bottom' })
                .catch((error: unknown) => report('failed', String(error)));
            }, 300);
          }
          return (
            <LazyVStack>
              <Text modifiers={compose().frame({ height: 3000 })}>Top</Text>
              <Text
                modifiers={compose()
                  .id('end')
                  .onAppear({
                    perform: () => report('passed', 'the last row appeared'),
                  })}
              >
                End
              </Text>
            </LazyVStack>
          );
        }}
      </ScrollViewReader>
    </SwiftUIScrollView>
  );
}

function GeometryFrame({ report }: { report: Report }) {
  const called = useRef(false);
  return (
    <GeometryReader modifiers={compose().frame({ width: 120, height: 60 })}>
      {(proxy) => {
        if (!called.current) {
          called.current = true;
          setTimeout(() => {
            proxy.frame({ in: 'global' }).then(
              (frame) =>
                report(
                  frame.width === 120 && frame.height === 60
                    ? 'passed'
                    : 'failed',
                  JSON.stringify(frame)
                ),
              (error: unknown) => report('failed', String(error))
            );
          }, 200);
        }
        return <Text>Geometry</Text>;
      }}
    </GeometryReader>
  );
}

function PreferenceFlow({ report }: { report: Report }) {
  return (
    <VStack
      modifiers={compose().onPreferenceChange('answer', {
        perform: (value) => {
          if (value === 42)
            report('passed', 'the parent received the value set by its child');
        },
      })}
    >
      <Text modifiers={compose().preference({ key: 'answer', value: 42 })}>
        Child
      </Text>
    </VStack>
  );
}

function AppStorageRoundTrip({ report }: { report: Report }) {
  const wrote = useRef(false);
  const target = useRef(Date.now() % 100000);
  return (
    <AppStorage wrappedValue={0} swiftKey="swiftui-react-native.validation">
      {(value, setValue) => {
        if (value === target.current)
          report('passed', `stored and read back ${value}`);
        else if (!wrote.current) {
          wrote.current = true;
          setTimeout(
            () =>
              setValue(target.current).catch((error: unknown) =>
                report('failed', String(error))
              ),
            100
          );
        }
        return <Text>{String(value)}</Text>;
      }}
    </AppStorage>
  );
}

function ScaledValue({ report }: { report: Report }) {
  return (
    <VStack modifiers={compose().dynamicTypeSize('accessibility3')}>
      <ScaledMetric wrappedValue={100}>
        {(value) => {
          if (value > 100)
            report('passed', `100 scales to ${value} at accessibility3`);
          return <Text>{String(value)}</Text>;
        }}
      </ScaledMetric>
    </VStack>
  );
}

function FontAlias({ report }: { report: Report }) {
  const [loaded] = useFonts({
    SwrnCheckFont: require('@expo-google-fonts/material-symbols/400Regular/MaterialSymbols_400Regular.ttf'),
  });
  const widths = useRef<{ missing?: number; alias?: number }>({});
  const measured = (key: 'missing' | 'alias', name: string) =>
    compose()
      .font({ custom: { name, size: 24 } })
      .fixedSize()
      .onGeometryChange({
        of: (proxy) => proxy.size.width,
        action: (width: number) => {
          widths.current[key] = width;
          const { missing, alias } = widths.current;
          if (missing === undefined || alias === undefined) return;
          report(
            missing === alias ? 'failed' : 'passed',
            `missing font ${missing}, alias ${alias}`
          );
        },
      });
  if (!loaded) return <Text>Loading font</Text>;
  return (
    <VStack>
      <Text modifiers={measured('missing', 'SwrnNoSuchFont')}>home</Text>
      <Text modifiers={measured('alias', 'SwrnCheckFont')}>home</Text>
    </VStack>
  );
}

function FocusBinding({ report }: { report: Report }) {
  const first = useBinding('');
  const second = useBinding('');
  const firstFocused = useBinding(false);
  const secondFocused = useBinding(false);
  const moved = useRef(false);
  useEffect(() => {
    const focus = setTimeout(() => firstFocused.setValue(true), 200);
    const move = setTimeout(() => {
      moved.current = true;
      secondFocused.setValue(true);
    }, 1000);
    return () => {
      clearTimeout(focus);
      clearTimeout(move);
    };
  }, []);
  useEffect(() => {
    if (moved.current && !firstFocused.value)
      report('passed', 'SwiftUI moved focus and wrote the first binding back');
  }, [firstFocused.value, report]);
  return (
    <VStack>
      <TextField text={first} modifiers={compose().focused(firstFocused)}>
        First
      </TextField>
      <TextField text={second} modifiers={compose().focused(secondFocused)}>
        Second
      </TextField>
    </VStack>
  );
}

function LayoutContainer({ report }: { report: Report }) {
  useEffect(() => {
    const timer = setTimeout(() => report('passed', 'mounted'), 300);
    return () => clearTimeout(timer);
  }, [report]);
  return (
    <HStackLayout spacing={12}>
      <Text>Left</Text>
      <Text>Right</Text>
    </HStackLayout>
  );
}

function TapCallback({ report }: { report: Report }) {
  return (
    <RoundedRectangle
      cornerRadius={8}
      modifiers={compose()
        .foregroundStyle('green')
        .frame({ width: 300, height: 300 })
        .gesture(
          SwiftUI.TapGesture().onEnded(() =>
            report('passed', 'onEnded ran from a real touch')
          )
        )}
    />
  );
}

function DragCallback({ report }: { report: Report }) {
  const changes = useRef(0);
  useEffect(() => {
    const timer = setTimeout(
      () =>
        report(
          'failed',
          `no onEnded after ${changes.current} onChanged calls; native said: ${nativeWarnings.slice(-2).join(' | ') || 'nothing'}`
        ),
      TOUCH_TIMEOUT_MS - 2000
    );
    return () => clearTimeout(timer);
  }, [report]);
  const gesture = SwiftUI.DragGesture({
    minimumDistance: 1,
    coordinateSpace: 'local',
  })
    .onChanged(() => void (changes.current += 1))
    .onEnded((value) => {
      const moved = value.translation.height;
      report(
        changes.current > 0 && moved > 50 ? 'passed' : 'failed',
        `${changes.current} changes: ${JSON.stringify({ start: value.startLocation, end: value.location, translation: value.translation })}`
      );
    });
  return (
    <RoundedRectangle
      cornerRadius={8}
      modifiers={compose()
        .foregroundStyle('orange')
        .frame({ width: 300, height: 300 })
        .gesture(gesture)}
    />
  );
}

const checks: Check[] = [
  {
    name: 'withAnimation completion waits for the animation',
    run: (report) => <AnimationCompletion report={report} />,
  },
  {
    name: 'withTransaction with a patch',
    run: (report) => <TransactionPatch report={report} />,
  },
  {
    name: 'environment write, Environment read',
    run: (report) => <EnvironmentReadWrite report={report} />,
  },
  {
    name: 'environmentObject reaches useEnvironmentObject',
    run: (report) => <EnvironmentObjectFlow report={report} />,
  },
  {
    name: 'environmentObject reaches a toolbar item',
    run: (report) => <EnvironmentObjectToolbar report={report} />,
  },
  {
    name: 'environmentObject reaches a pushed navigationDestination',
    run: (report) => <EnvironmentObjectDestination report={report} />,
  },
  {
    name: 'environmentObject lookup: nearest, subclass, missing',
    run: (report) => <EnvironmentObjectLookup report={report} />,
  },
  {
    name: 'environmentObject: Map, Set and Date changes',
    run: (report) => <EnvironmentObjectCollections report={report} />,
  },
  {
    name: 'Observable: a reader re-renders only for what it read',
    run: (report) => <ObservablePrecision report={report} />,
  },
  {
    name: 'Bindable, Environment(Model.self), withObservationTracking',
    run: (report) => <BindableAndEnvironment report={report} />,
  },
  {
    name: 'focusedObject, focusedValue and their scene variants follow focus',
    run: (report) => <FocusedObjects report={report} />,
  },
  {
    name: 'dismiss handle through Nitro',
    run: (report) => <DismissHandle report={report} />,
  },
  {
    name: 'ScrollViewProxy.scrollTo',
    run: (report) => <ScrollProxy report={report} />,
  },
  {
    name: 'GeometryProxy.frame(in:)',
    run: (report) => <GeometryFrame report={report} />,
  },
  {
    name: 'preference reaches onPreferenceChange',
    run: (report) => <PreferenceFlow report={report} />,
  },
  {
    name: 'AppStorage round trip',
    run: (report) => <AppStorageRoundTrip report={report} />,
  },
  {
    name: 'ScaledMetric value',
    run: (report) => <ScaledValue report={report} />,
  },
  {
    name: 'useFonts alias reaches Font.custom',
    run: (report) => <FontAlias report={report} />,
  },
  {
    name: 'focused(_:) mirror',
    run: (report) => <FocusBinding report={report} />,
  },
  {
    name: 'Layout conformer as a container',
    run: (report) => <LayoutContainer report={report} />,
  },
  {
    name: 'TapGesture().onEnded from a touch',
    run: (report) => <TapCallback report={report} />,
    touch: 'testTap',
  },
  {
    name: 'DragGesture callbacks from a drag',
    run: (report) => <DragCallback report={report} />,
    touch: 'testDrag',
  },
  ...graphicsChecks,
];

export default function RuntimeScreen() {
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<string[]>([]);
  const settled = useRef(-1);
  const check = checks[index];

  const current = useRef(index);
  current.current = index;
  const finish = useRef<(at: number, ...result: Parameters<Report>) => void>(
    () => {}
  );
  finish.current = (at, status, detail) => {
    if (at !== index || settled.current === index) return;
    settled.current = index;
    const name = checks[index]!.name;
    setResults((list) => [...list, `${status}: ${name}`]);
    fetch(`${SERVER}/behavior`, {
      method: 'POST',
      body: JSON.stringify({ name, status, detail }),
    })
      .catch(() => {})
      .finally(() => setTimeout(() => setIndex((value) => value + 1), 150));
  };
  // Checks report from render functions too: the screen's state changes after that render.
  const report = useRef<Report>((status, detail) => {
    const at = current.current;
    setTimeout(() => finish.current(at, status, detail), 0);
  }).current;

  useEffect(() => {
    const warn = console.warn;
    console.warn = (...args: unknown[]) => {
      nativeWarnings.push(args.map(String).join(' '));
      warn(...args);
    };
    return () => {
      console.warn = warn;
    };
  }, []);

  useEffect(() => {
    if (!check) {
      fetch(`${SERVER}/behavior`, {
        method: 'POST',
        body: JSON.stringify({ done: true }),
      }).catch(() => {});
      return;
    }
    const touch = check.touch
      ? setTimeout(
          () =>
            fetch(`${SERVER}/behavior`, {
              method: 'POST',
              body: JSON.stringify({ touch: check.touch }),
            }).catch(() => {}),
          500
        )
      : undefined;
    const timer = setTimeout(
      () => report('failed', 'timed out'),
      check.touch ? TOUCH_TIMEOUT_MS : TIMEOUT_MS
    );
    return () => {
      clearTimeout(touch);
      clearTimeout(timer);
    };
  }, [check, report]);

  return (
    <View style={styles.screen}>
      <RNText style={styles.title}>{check ? check.name : 'Finished'}</RNText>
      <View key={index} style={styles.stage}>
        {check?.run(report)}
      </View>
      {results.map((line) => (
        <RNText key={line} style={styles.result}>
          {line}
        </RNText>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff', padding: 16, paddingTop: 60 },
  title: { fontSize: 15, fontWeight: '600', marginBottom: 12 },
  stage: { minHeight: 320 },
  result: { fontSize: 12, color: '#6d6d72' },
});
