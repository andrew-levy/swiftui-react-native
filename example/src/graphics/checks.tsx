import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import { PixelRatio, View } from 'react-native';
import {
  __evaluate,
  Canvas,
  type CanvasProps,
  Circle,
  compose,
  KeyframeAnimator,
  List,
  OutlineGroup,
  createPath,
  createShape,
  Image,
  LinearGradient,
  Path,
  recorded,
  Rectangle,
  Scalars,
  ScrollView,
  SwiftUI,
  Table,
  Text,
  VStack,
  withAnimation,
} from 'swiftui-react-native';
import oracle from './oracle.json';

const SERVER = 'http://127.0.0.1:8787';

type Report = (status: 'passed' | 'failed', detail?: string) => void;
type Chain = ReturnType<typeof createPath>;

const RED = { red: 1, green: 0, blue: 0 };
const BLUE = { red: 0, green: 0, blue: 1 };
const WHITE: Rgb = [255, 255, 255];
const PURE_RED: Rgb = [255, 0, 0];
const PURE_BLUE: Rgb = [0, 0, 255];

function builtPaths(): Record<string, Chain> {
  const lines = createPath().move({ to: { x: 10, y: 20 } }).addLine({ to: { x: 110, y: 20 } }).addLine({ to: { x: 60, y: 120 } }).closeSubpath();
  const curves = createPath()
    .move({ to: { x: 0, y: 50 } })
    .addQuadCurve({ to: { x: 100, y: 50 }, control: { x: 50, y: 0 } })
    .addCurve({ to: { x: 200, y: 50 }, control1: { x: 130, y: 120 }, control2: { x: 170, y: -20 } });
  const subpaths = createPath().addEllipse({ in: { x: 0, y: 0, width: 120, height: 120 } }).addEllipse({ in: { x: 30, y: 30, width: 60, height: 60 } });
  const square = createPath({ x: 0, y: 0, width: 100, height: 100 });
  const shifted = createPath({ x: 50, y: 50, width: 100, height: 100 });
  return {
    lines,
    curves,
    arcs: createPath()
      .addArc({ center: { x: 50, y: 50 }, radius: 40, startAngle: { degrees: 0 }, endAngle: { degrees: 120 }, clockwise: false })
      .addArc({ center: { x: 150, y: 50 }, radius: 30, startAngle: { degrees: 90 }, endAngle: { degrees: 0 }, clockwise: true })
      .addRelativeArc({ center: { x: 50, y: 150 }, radius: 25, startAngle: { degrees: 45 }, delta: { degrees: 200 } })
      .move({ to: { x: 0, y: 200 } })
      .addArc({ tangent1End: { x: 100, y: 200 }, tangent2End: { x: 100, y: 300 }, radius: 20 }),
    figures: createPath()
      .addRect({ x: 0, y: 0, width: 40, height: 30 })
      .addRoundedRect({ in: { x: 50, y: 0, width: 40, height: 30 }, cornerSize: { width: 8, height: 8 }, style: 'circular' })
      .addEllipse({ in: { x: 100, y: 0, width: 40, height: 30 } })
      .addRects([{ x: 0, y: 40, width: 10, height: 10 }, { x: 20, y: 40, width: 10, height: 10 }])
      .addLines([{ x: 0, y: 60 }, { x: 40, y: 80 }, { x: 80, y: 60 }]),
    subpaths,
    composed: createPath().addPath(lines, { transform: { a: 1, b: 0, c: 0, d: 1, tx: 5, ty: 7 } }).addPath(curves),
    applying: lines.applying({ a: 0, b: 1, c: -1, d: 0, tx: 30, ty: 40 }),
    offsetBy: lines.offsetBy({ dx: 12, dy: -8 }),
    trimmedPath: curves.trimmedPath({ from: 0.25, to: 0.75 }),
    strokedPath: lines.strokedPath({ lineWidth: 6, lineCap: 'round', lineJoin: 'bevel', miterLimit: 4, dash: [8, 4], dashPhase: 2 }),
    normalized: subpaths.normalized({ eoFill: true }),
    union: square.union(shifted),
    intersection: square.intersection(shifted),
    subtracting: square.subtracting(shifted),
    symmetricDifference: square.symmetricDifference(shifted),
    lineIntersection: lines.lineIntersection(shifted),
    lineSubtraction: lines.lineSubtraction(shifted),
    ellipseIn: createPath({ ellipseIn: { x: 1, y: 2, width: 30, height: 40 } }),
    roundedRect: createPath({ roundedRect: { x: 1, y: 2, width: 30, height: 40 }, cornerRadius: 6, style: 'continuous' }),
    empty: createPath(),
  };
}

const PROBES: Record<string, { x: number; y: number }[]> = {
  lines: [{ x: 60, y: 60 }, { x: 5, y: 5 }, { x: 150, y: 90 }],
  figures: [{ x: 20, y: 15 }, { x: 45, y: 15 }],
  subpaths: [{ x: 60, y: 60 }, { x: 15, y: 60 }],
};

function sameDescription(a: string, b: string): boolean {
  const [left, right] = [a.trim().split(/\s+/), b.trim().split(/\s+/)];
  return left.length === right.length && left.every((token, index) => {
    const other = right[index]!;
    if (token === other) return true;
    return Math.abs(Number(token) - Number(other)) < 0.01;
  });
}

const number = (value: unknown) => (value === 'inf' ? Infinity : value === '-inf' ? -Infinity : (value as number));
const close = (a: number, b: number) => a === b || Math.abs(a - b) < 0.01;

function PathsMatchSwift({ report }: { report: Report }) {
  useEffect(() => {
    const built = builtPaths();
    const failures: string[] = [];
    for (const [name, chain] of Object.entries(built)) {
      const expected = (oracle.paths as Record<string, any>)[name];
      if (!sameDescription(chain.description, expected.description)) failures.push(`${name}: ${chain.description} ≠ ${expected.description}`);
      if (chain.isEmpty !== expected.isEmpty) failures.push(`${name}.isEmpty`);
      const bounds = chain.boundingRect as Record<string, number>;
      for (const key of ['x', 'y', 'width', 'height']) {
        if (!close(bounds[key]!, number(expected.boundingRect[key]))) failures.push(`${name}.boundingRect.${key}: ${bounds[key]} ≠ ${expected.boundingRect[key]}`);
      }
      let elements = 0;
      chain.forEach(() => elements++);
      if (elements !== expected.elements) failures.push(`${name}.forEach: ${elements} ≠ ${expected.elements}`);
      (PROBES[name] ?? []).forEach((point, index) => {
        if (chain.contains(point) !== expected.contains[index]) failures.push(`${name}.contains(${point.x}, ${point.y})`);
      });
    }
    const { center, ring } = (oracle.paths as any).evenOdd;
    if (built.subpaths!.contains({ x: 60, y: 60 }, { eoFill: true }) !== center) failures.push('contains eoFill center');
    if (built.subpaths!.contains({ x: 15, y: 60 }, { eoFill: true }) !== ring) failures.push('contains eoFill ring');
    report(failures.length === 0 ? 'passed' : 'failed', failures.length === 0 ? `${Object.keys(built).length} paths agree with Swift` : failures.slice(0, 4).join(' | '));
  }, [report]);
  return <Text>Comparing paths</Text>;
}

const Triangle = createShape((rect) =>
  createPath().move({ to: { x: rect.midX, y: rect.minY } }).addLine({ to: { x: rect.maxX, y: rect.maxY } }).addLine({ to: { x: rect.minX, y: rect.maxY } }).closeSubpath()
);
const Wave = createShape({ amplitude: 0, phase: 0 }, (rect, { amplitude, phase }) => {
  let path = createPath().move({ to: { x: rect.minX, y: rect.midY } });
  for (let step = 1; step <= 8; step++) {
    const progress = step / 8;
    path = path.addLine({ to: { x: rect.minX.plus(rect.width.times(progress)), y: rect.midY.plus(amplitude.times(Scalars.sin(phase.plus(progress * Math.PI * 4)))) } });
  }
  return path;
});
const Pie = createShape((rect) => {
  const center = { x: rect.midX, y: rect.midY };
  return createPath()
    .move({ to: center })
    .addArc({ center, radius: Scalars.min(rect.width, rect.height).dividedBy(2), startAngle: { degrees: 0 }, endAngle: { degrees: 270 }, clockwise: false })
    .closeSubpath();
});

function ShapesMatchSwift({ report }: { report: Report }) {
  useEffect(() => {
    const failures: string[] = [];
    const compare = (name: string, actual: (rect: (typeof oracle.rects)[number]) => string) => {
      oracle.rects.forEach((rect, index) => {
        const expected = (oracle.shapes as Record<string, string[]>)[name]![index]!;
        const description = actual(rect);
        if (!sameDescription(description, expected)) failures.push(`${name}: ${description} ≠ ${expected}`);
      });
    };
    compare('triangle', (rect) => Triangle.path({ in: rect }).description);
    compare('wave', (rect) => Wave.path({ in: rect }, { amplitude: 9, phase: 0.5 }).description);
    compare('pie', (rect) => Pie.path({ in: rect }).description);
    report(failures.length === 0 ? 'passed' : 'failed', failures.length === 0 ? 'path(in:) agrees with Swift for every rectangle' : failures.slice(0, 3).join(' | '));
  }, [report]);
  return <Text>Comparing shapes</Text>;
}

const Measured = createShape((rect) => {
  const base = createPath().addRect(rect);
  const bounds = base.boundingRect;
  return createPath().addRect({ x: 0, y: 0, width: bounds.width, height: bounds.height });
});

function SymbolicQuery({ report }: { report: Report }) {
  useEffect(() => {
    const description = Measured.path({ in: { x: 3, y: 4, width: 50, height: 20 } }).description;
    report(sameDescription(description, '0 0 m 50 0 l 50 20 l 0 20 l h') ? 'passed' : 'failed', description);
  }, [report]);
  return <Text>Symbolic query</Text>;
}

function NativeInterpolation({ report }: { report: Report }) {
  const [amplitude, setAmplitude] = useState(0);
  const renders = useRef(0);
  renders.current += 1;
  useEffect(() => {
    __evaluate('$shapeEvaluations', null, 'start', []);
    const start = setTimeout(() => withAnimation(SwiftUI.Animation.linear({ duration: 0.8 }), () => setAmplitude(20)), 200);
    const verdict = setTimeout(() => {
      const frames = (__evaluate('$shapeEvaluations', null, 'stop', []) as number[][]).map((values) => values[0]!);
      const between = [...new Set(frames.filter((value) => value > 0.01 && value < 19.99))];
      const ascending = between.every((value, index) => index === 0 || value > between[index - 1]!);
      const passed = between.length >= 10 && ascending && renders.current <= 3;
      report(passed ? 'passed' : 'failed', `${between.length} interpolated frames ${between[0]?.toFixed(2)}…${between.at(-1)?.toFixed(2)}, ${renders.current} React renders`);
    }, 1400);
    return () => {
      clearTimeout(start);
      clearTimeout(verdict);
    };
  }, [report]);
  return <Wave amplitude={amplitude} modifiers={compose().stroke('blue', { lineWidth: 3 }).frame({ width: 240, height: 80 })} />;
}

type Rgb = [number, number, number];
type Expected = { at: [number, number]; color: Rgb; why: string };

const TOLERANCE = 12;

const sampled = (colors: number[][], points: [number, number][]): Expected[] =>
  points.map((at, index) => ({ at, color: colors[index] as Rgb, why: `SwiftUI at ${at}` }));

function Pixels({ report, expected, children, size = 120 }: { report: Report; expected: Expected[]; children: ReactNode; size?: number }) {
  const box = useRef<any>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      box.current?.measureInWindow(async (left: number, top: number) => {
        const scale = PixelRatio.get();
        const pixels = expected.map(({ at: [x, y] }) => [Math.round((left + x) * scale), Math.round((top + y) * scale)]);
        const response = await fetch(`${SERVER}/behavior`, { method: 'POST', body: JSON.stringify({ pixels }) });
        const { colors } = (await response.json()) as { colors: Rgb[] };
        const failures = expected.flatMap(({ color, why }, index) => {
          const actual = colors[index]!;
          return actual.every((channel, position) => Math.abs(channel - color[position]!) <= TOLERANCE) ? [] : [`${why}: rgb(${actual}) ≠ rgb(${color})`];
        });
        report(failures.length === 0 ? 'passed' : 'failed', failures.length === 0 ? `${expected.length} pixels` : failures.join(' | '));
      });
    }, 900);
    return () => clearTimeout(timer);
  }, [expected, report]);
  return (
    <View ref={box} collapsable={false} style={{ width: size, height: size, backgroundColor: '#fff' }}>
      {children}
    </View>
  );
}

const frame = compose().frame({ width: 120, height: 120 });
const ring = createPath().addEllipse({ in: { x: 0, y: 0, width: 120, height: 120 } }).addEllipse({ in: { x: 30, y: 30, width: 60, height: 60 } });

const once = (report: Report) => {
  let done = false;
  return (status: 'passed' | 'failed', detail?: string) => {
    if (!done) report(status, detail);
    done = true;
  };
};

const TREE = [{ id: 'root', name: 'Root', items: [{ id: 'leaf', name: 'Leaf' }] }];
const moved = compose().fill(RED).frame({ width: 60, height: 60 });
const HELD_AT_60 = { x: [{ kind: 'move', to: 60 }, { kind: 'linear', to: 60, duration: 30 }] } as const;

const draw = (body: CanvasProps['children']) => <Canvas modifiers={frame}>{body}</Canvas>;

export const graphicsChecks: { name: string; run: (report: Report) => ReactNode }[] = [
  {
    name: 'visualEffect reads GeometryProxy on the native side',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [30, 60], color: PURE_RED, why: 'moved half its width left' }, { at: [100, 60], color: WHITE, why: 'where it was' }]}>
        <Rectangle modifiers={compose().fill(RED).frame({ width: 120, height: 120 }).visualEffect((effect, proxy) => effect.offset({ x: proxy.size.width.times(-0.5) }))} />
      </Pixels>
    ),
  },
  {
    name: 'visualEffect: a method of the proxy, and a field of its result',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [30, 60], color: PURE_RED, why: 'moved by its own maxX in local space, halved' }, { at: [100, 60], color: WHITE, why: 'where it was' }]}>
        <Rectangle modifiers={compose().fill(RED).frame({ width: 120, height: 120 }).visualEffect((effect, proxy) => effect.offset({ x: proxy.frame({ in: 'local' }).maxX.times(-0.5) }))} />
      </Pixels>
    ),
  },
  {
    name: 'visualEffect keeps the order of its steps',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [60, 60], color: [255, 128, 128], why: 'half opacity' }]}>
        <Rectangle modifiers={compose().fill(RED).frame({ width: 120, height: 120 }).visualEffect((effect) => effect.opacity(0.5).scaleEffect(1))} />
      </Pixels>
    ),
  },
  {
    name: 'scrollTransition: the phase is read natively',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [60, 60], color: PURE_RED, why: 'identity phase shows it' }]}>
        <ScrollView modifiers={compose().frame({ width: 120, height: 120 })}>
          <Rectangle modifiers={compose().fill(RED).frame({ width: 120, height: 120 }).scrollTransition(undefined, { transition: (effect, phase) => effect.opacity(Scalars.select(phase.isIdentity, 1, 0)) })} />
        </ScrollView>
      </Pixels>
    ),
  },
  {
    name: 'alignmentGuide computes from ViewDimensions',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [90, 90], color: PURE_RED, why: 'guide moved it right' }, { at: [30, 90], color: WHITE, why: 'left of it' }]}>
        <VStack alignment="leading" spacing={0}>
          <Rectangle modifiers={compose().fill('white').frame({ width: 120, height: 60 })} />
          <Rectangle modifiers={moved.alignmentGuide('leading', { computeValue: (dimensions) => dimensions.width.negated() })} />
        </VStack>
      </Pixels>
    ),
  },
  {
    name: 'onGeometryChange: a recorded transform reaches JavaScript',
    run: (report) => {
      const finish = once(report);
      return <Rectangle modifiers={compose().frame({ width: 80, height: 40 }).onGeometryChange({ of: (proxy) => proxy.size.width, action: (width: number) => finish(width === 80 ? 'passed' : 'failed', `width ${width}`) })} />;
    },
  },
  {
    name: 'keyframeAnimator modifier: its track moves the view',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [90, 30], color: PURE_RED, why: 'held by the track' }, { at: [30, 30], color: WHITE, why: 'where it started' }]}>
        <Rectangle modifiers={moved.keyframeAnimator({ initialValue: { x: 0 } as never, content: (value) => compose().offset({ x: value.x }), keyframes: HELD_AT_60 })} />
      </Pixels>
    ),
  },
  {
    name: 'KeyframeAnimator view applies its chain to React children',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [90, 30], color: PURE_RED, why: 'held by the track' }, { at: [30, 30], color: WHITE, why: 'where it started' }]}>
        <KeyframeAnimator modifiers={compose().frame({ width: 120, height: 120, alignment: 'topLeading' })} initialValue={{ x: 0 } as never} content={(value) => compose().offset({ x: value.x })} keyframes={HELD_AT_60}>
          <Rectangle modifiers={moved} />
        </KeyframeAnimator>
      </Pixels>
    ),
  },
  {
    name: 'phaseAnimator modifier: phases drive a recorded chain',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [90, 30], color: PURE_RED, why: 'moved by the phase' }, { at: [30, 30], color: WHITE, why: 'where it started' }]}>
        <Rectangle modifiers={moved.phaseAnimator([60], { content: (phase) => compose().offset({ x: phase }) })} />
      </Pixels>
    ),
  },
  {
    name: 'modifier(_:) takes a compose() chain',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [60, 60], color: [255, 128, 128], why: 'half red over white' }]}>
        <Rectangle modifiers={compose().fill(RED).frame({ width: 120, height: 120 }).modifier(compose().opacity(0.5))} />
      </Pixels>
    ),
  },
  {
    name: 'animation(_:body:) applies its chain',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [60, 60], color: [255, 128, 128], why: 'half red over white' }]}>
        <Rectangle modifiers={compose().fill(RED).frame({ width: 120, height: 120 }).animation('default', { body: compose().opacity(0.5) })} />
      </Pixels>
    ),
  },
  {
    name: 'onReceive: a timer publisher fires',
    run: (report) => {
      const finish = once(report);
      return <Rectangle modifiers={compose().frame({ width: 10, height: 10 }).onReceive({ every: 0.1 }, { perform: () => finish('passed', 'the timer fired') })} />;
    },
  },
  {
    name: 'Table: a cell renders a row of JavaScript data',
    run: (report) => {
      const finish = once(report);
      return (
        <Table
          modifiers={compose().frame({ width: 200, height: 160 })}
          data={TREE}
          columns={[{ title: 'Name', cell: (row: { name: string }) => { finish(row.name === 'Root' ? 'passed' : 'failed', `row ${row.name}`); return <Text>{row.name}</Text>; } }]}
        />
      );
    },
  },
  {
    name: 'List with children: rows come from the key path',
    run: (report) => {
      const finish = once(report);
      return (
        <List modifiers={compose().frame({ width: 200, height: 160 })} data={TREE} childrenPath="items">
          {(row: { name: string }) => {
            finish(row.name === 'Root' ? 'passed' : 'failed', `row ${row.name}`);
            return <Text>{row.name}</Text>;
          }}
        </List>
      );
    },
  },
  {
    name: 'OutlineGroup: rows come from the key path',
    run: (report) => {
      const finish = once(report);
      return (
        <List modifiers={compose().frame({ width: 200, height: 160 })}>
          <OutlineGroup data={TREE} childrenPath="items">
            {(row: { name: string }) => {
              finish(row.name === 'Root' ? 'passed' : 'failed', `row ${row.name}`);
              return <Text>{row.name}</Text>;
            }}
          </OutlineGroup>
        </List>
      );
    },
  },
  { name: 'Path built in JavaScript equals Swift', run: (report) => <PathsMatchSwift report={report} /> },
  { name: 'createShape equals a Swift Shape', run: (report) => <ShapesMatchSwift report={report} /> },
  { name: 'Query of a symbolic path', run: (report) => <SymbolicQuery report={report} /> },
  { name: 'Animatable parameters interpolate natively', run: (report) => <NativeInterpolation report={report} /> },
  {
    name: 'Fill rule: even-odd leaves the hole',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [60, 60], color: WHITE, why: 'hole' }, { at: [15, 60], color: PURE_RED, why: 'ring' }]}>
        <Path value={ring} modifiers={compose().fill(RED, { style: { eoFill: true } }).frame({ width: 120, height: 120 })} />
      </Pixels>
    ),
  },
  {
    name: 'Fill rule: non-zero fills it',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [60, 60], color: PURE_RED, why: 'center' }]}>
        <Path value={ring} modifiers={compose().fill(RED).frame({ width: 120, height: 120 })} />
      </Pixels>
    ),
  },
  {
    name: 'Path from a string still works',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [60, 40], color: PURE_RED, why: 'inside' }, { at: [60, 110], color: WHITE, why: 'outside' }]}>
        <Path modifiers={compose().fill(RED).frame({ width: 120, height: 120 })}>{'0 0 m 120 0 l 120 80 l 0 80 l h'}</Path>
      </Pixels>
    ),
  },
  {
    name: 'Path closure is inout: its mutating calls edit it',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [30, 30], color: PURE_RED, why: 'added rectangle' }, { at: [100, 100], color: WHITE, why: 'offsetBy returned a new path' }]}>
        <Path modifiers={compose().fill(RED).frame({ width: 120, height: 120 })}>
          {(path) => {
            path.addRect({ x: 0, y: 0, width: 60, height: 60 });
            path.offsetBy({ dx: 60, dy: 60 });
          }}
        </Path>
      </Pixels>
    ),
  },
  {
    name: 'Chains are values: extending one leaves it unchanged',
    run: (report) => {
      const base = createPath().addRect({ x: 0, y: 0, width: 10, height: 10 });
      const extended = base.addRect({ x: 20, y: 0, width: 10, height: 10 });
      const widths = [base.boundingRect.width, extended.boundingRect.width];
      report(widths[0] === 10 && widths[1] === 30 ? 'passed' : 'failed', `widths ${widths}`);
      return <Text>Value semantics</Text>;
    },
  },
  {
    name: 'Shape value chain: a trimmed circle as a clip',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [60, 100], color: PURE_RED, why: 'kept half' }, { at: [60, 20], color: WHITE, why: 'trimmed half' }]}>
        <Rectangle modifiers={compose().fill(RED).frame({ width: 120, height: 120 }).clipShape(SwiftUI.Shape.of('circle').trim({ from: 0, to: 0.5 }))} />
      </Pixels>
    ),
  },
  {
    name: 'Custom shape fills its path',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [60, 90], color: PURE_RED, why: 'inside' }, { at: [8, 8], color: WHITE, why: 'corner' }, { at: [112, 8], color: WHITE, why: 'other corner' }]}>
        <Triangle modifiers={compose().fill(RED).frame({ width: 120, height: 120 })} />
      </Pixels>
    ),
  },
  {
    name: 'fill then stroke keeps both',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [60, 60], color: PURE_RED, why: 'fill' }, { at: [60, 2], color: PURE_BLUE, why: 'stroke' }]}>
        <Circle modifiers={compose().fill(RED).stroke(BLUE, { lineWidth: 10 }).frame({ width: 120, height: 120 })} />
      </Pixels>
    ),
  },
  {
    name: 'fill then strokeBorder stays inside the shape',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [60, 60], color: PURE_RED, why: 'fill' }, { at: [60, 6], color: PURE_BLUE, why: 'border, inset' }, { at: [8, 8], color: WHITE, why: 'outside' }]}>
        <Circle modifiers={compose().fill(RED).strokeBorder(BLUE, { lineWidth: 12 }).frame({ width: 120, height: 120 })} />
      </Pixels>
    ),
  },
  {
    name: 'strokeBorder of a custom shape',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [60, 114], color: PURE_BLUE, why: 'bottom border' }, { at: [60, 90], color: PURE_RED, why: 'fill' }]}>
        <Triangle modifiers={compose().fill(RED).strokeBorder(BLUE, { lineWidth: 12 }).frame({ width: 120, height: 120 })} />
      </Pixels>
    ),
  },
  {
    name: 'trim keeps part of the path',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [60, 115], color: PURE_RED, why: 'bottom half' }, { at: [60, 5], color: WHITE, why: 'top half' }]}>
        <Circle modifiers={compose().trim({ from: 0, to: 0.5 }).stroke(RED, { lineWidth: 10 }).frame({ width: 120, height: 120 })} />
      </Pixels>
    ),
  },
  {
    name: 'Gradient in a shape',
    run: (report) => (
      <Pixels report={report} expected={sampled(oracle.drawn.shapeGradient, [[60, 3], [60, 60], [60, 117]])}>
        <Rectangle modifiers={compose().fill({ gradient: { colors: [RED, BLUE] }, startPoint: 'top', endPoint: 'bottom' }).frame({ width: 120, height: 120 })} />
      </Pixels>
    ),
  },
  {
    name: 'ShapeStyle chain: opacity of a style',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [60, 60], color: [255, 128, 128], why: 'half red over white' }]}>
        <Rectangle modifiers={compose().fill(SwiftUI.ShapeStyle.of(RED).opacity(0.5)).frame({ width: 120, height: 120 })} />
      </Pixels>
    ),
  },
  {
    name: 'clipShape with a custom shape',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [60, 90], color: PURE_RED, why: 'inside' }, { at: [8, 8], color: WHITE, why: 'clipped' }]}>
        <LinearGradient gradient={{ colors: [RED, RED] }} startPoint="top" endPoint="bottom" modifiers={compose().clipShape(Triangle).frame({ width: 120, height: 120 })} />
      </Pixels>
    ),
  },
  {
    name: 'mask with a custom shape',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [60, 90], color: PURE_RED, why: 'inside' }, { at: [8, 8], color: WHITE, why: 'masked' }]}>
        <Rectangle modifiers={compose().fill(RED).frame({ width: 120, height: 120 }).mask({ mask: <Triangle modifiers={compose().fill('black')} /> })} />
      </Pixels>
    ),
  },
  {
    name: 'Canvas: symbolic size and fill',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [30, 60], color: PURE_RED, why: 'left half' }, { at: [90, 60], color: WHITE, why: 'right half' }]}>
        {draw((context, size) => {
          context.fill(createPath().addRect({ x: 0, y: 0, width: size.width.dividedBy(2), height: size.height }), { with: { color: RED } });
        })}
      </Pixels>
    ),
  },
  {
    name: 'Canvas: transforms apply in order',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [90, 20], color: PURE_RED, why: 'moved square' }, { at: [20, 20], color: WHITE, why: 'origin' }]}>
        {draw((context) => {
          context.translateBy({ x: 80, y: 10 });
          context.scaleBy({ x: 2, y: 2 });
          context.fill(createPath().addRect({ x: 0, y: 0, width: 10, height: 10 }), { with: { color: RED } });
        })}
      </Pixels>
    ),
  },
  {
    name: 'Canvas: copy() does not share state',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [10, 10], color: PURE_BLUE, why: 'original stays at the origin' }, { at: [70, 70], color: PURE_RED, why: 'copy moved' }]}>
        {draw((context) => {
          const copy = context.copy();
          copy.translateBy({ x: 60, y: 60 });
          copy.fill(createPath().addRect({ x: 0, y: 0, width: 20, height: 20 }), { with: { color: RED } });
          context.fill(createPath().addRect({ x: 0, y: 0, width: 20, height: 20 }), { with: { color: BLUE } });
        })}
      </Pixels>
    ),
  },
  {
    name: 'Canvas: clip and inverse clip',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [20, 60], color: PURE_RED, why: 'inside the clip' }, { at: [90, 60], color: WHITE, why: 'outside the clip' }, { at: [90, 20], color: PURE_BLUE, why: 'inverse clip' }]}>
        {draw((context) => {
          const inside = context.copy();
          inside.clip({ to: createPath().addRect({ x: 0, y: 40, width: 60, height: 80 }) });
          inside.fill(createPath().addRect({ x: 0, y: 0, width: 120, height: 120 }), { with: { color: RED } });
          const outside = context.copy();
          outside.clip({ to: createPath().addRect({ x: 0, y: 40, width: 120, height: 80 }), options: 'inverse' });
          outside.fill(createPath().addRect({ x: 0, y: 0, width: 120, height: 120 }), { with: { color: BLUE } });
        })}
      </Pixels>
    ),
  },
  {
    name: 'Canvas: opacity property and drawLayer',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [60, 60], color: [255, 128, 128], why: 'half red' }]}>
        {draw((context) => {
          context.opacity = 0.5;
          context.drawLayer({
            content: (layer) => {
              layer.fill(createPath().addRect({ x: 0, y: 0, width: 120, height: 120 }), { with: { color: RED } });
            },
          });
        })}
      </Pixels>
    ),
  },
  {
    name: 'Canvas: gradient shading',
    run: (report) => (
      <Pixels report={report} expected={sampled(oracle.drawn.canvasGradient, [[3, 60], [60, 60], [117, 60]])}>
        {draw((context, size) => {
          context.fill(createPath().addRect({ x: 0, y: 0, width: size.width, height: size.height }), {
            with: { linearGradient: { gradient: { colors: [RED, BLUE] }, startPoint: { x: 0, y: 0 }, endPoint: { x: size.width, y: 0 } } },
          });
        })}
      </Pixels>
    ),
  },
  {
    name: 'Canvas: symbols are resolved by tag and drawn',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [90, 90], color: PURE_RED, why: 'symbol drawn at its point' }, { at: [20, 20], color: WHITE, why: 'nowhere else' }]}>
        <Canvas
          modifiers={frame}
          symbols={<Rectangle modifiers={compose().fill(RED).frame({ width: 40, height: 40 }).tag('square')} />}
        >
          {(context) => {
            context.draw(context.resolveSymbol({ id: 'square' }) as NonNullable<ReturnType<typeof context.resolveSymbol>>, { at: { x: 90, y: 90 } });
          }}
        </Canvas>
      </Pixels>
    ),
  },
  {
    name: 'Image: a require() asset loads and resizes',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [10, 10], color: PURE_RED, why: 'top left' }, { at: [110, 110], color: PURE_RED, why: 'bottom right' }]}>
        <Image uiImage={require('../../assets/check-red.png')} modifiers={compose().resizable().frame({ width: 120, height: 120 })} />
      </Pixels>
    ),
  },
  {
    name: 'Canvas: an Image value drawn by a recorded closure',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [60, 60], color: PURE_RED, why: 'drawn by the image' }, { at: [10, 10], color: WHITE, why: 'outside the image' }]}>
        {draw((context) => {
          const renderer = recorded<SwiftUI.GraphicsContext>('GraphicsContext', (image) => {
            image.fill(createPath().addRect({ x: 0, y: 0, width: 40, height: 40 }), { with: { color: RED } });
          });
          context.draw({ size: { width: 40, height: 40 }, renderer }, { at: { x: 60, y: 60 } });
        })}
      </Pixels>
    ),
  },
  {
    name: 'Canvas: resolved text measures and draws',
    run: (report) => (
      <Pixels report={report} expected={[{ at: [60, 100], color: PURE_RED, why: 'bar as wide as the text' }, { at: [116, 100], color: WHITE, why: 'past the text' }]}>
        {draw((context, size) => {
          const text = context.resolve('MMMMMMMM');
          const measured = text.measure({ in: size });
          context.fill(createPath().addRect({ x: 0, y: 90, width: measured.width, height: 20 }), { with: { color: RED } });
        })}
      </Pixels>
    ),
  },
];
