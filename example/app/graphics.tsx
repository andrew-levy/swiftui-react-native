import { StyleSheet, View } from 'react-native';
import {
  compose,
  createPath,
  createShape,
  Scalars,
} from 'swiftui-react-native';

const Triangle = createShape((rect) =>
  createPath()
    .move({ to: { x: rect.midX, y: rect.minY } })
    .addLine({ to: { x: rect.maxX, y: rect.maxY } })
    .addLine({ to: { x: rect.minX, y: rect.maxY } })
    .closeSubpath()
);

const Diamond = createShape((rect) =>
  createPath()
    .move({ to: { x: rect.midX, y: rect.minY } })
    .addLine({ to: { x: rect.maxX, y: rect.midY } })
    .addLine({ to: { x: rect.midX, y: rect.maxY } })
    .addLine({ to: { x: rect.minX, y: rect.midY } })
    .closeSubpath()
);

const Hexagon = createShape((rect) => {
  const radius = Scalars.min(rect.width, rect.height).dividedBy(2);
  let path = createPath();
  for (let point = 0; point < 6; point++) {
    const angle = (Math.PI / 3) * point - Math.PI / 2;
    const to = {
      x: rect.midX.plus(radius.times(Math.cos(angle))),
      y: rect.midY.plus(radius.times(Math.sin(angle))),
    };
    path = point === 0 ? path.move({ to }) : path.addLine({ to });
  }
  return path.closeSubpath();
});

const Star = createShape((rect) => {
  const radius = Scalars.min(rect.width, rect.height).minus(3);
  let path = createPath();
  for (let point = 0; point < 10; point++) {
    const angle = (Math.PI / 5) * point - Math.PI / 0.2;
    const scale = point % 2 === 0 ? 1 : 0.1;
    const to = {
      x: rect.midX.plus(radius.times(Math.cos(angle) * scale)),
      y: rect.midY.plus(radius.times(Math.sin(angle) * scale)),
    };
    path = point === 0 ? path.move({ to }) : path.addLine({ to });
  }
  return path.closeSubpath();
});

export default function Graphics() {
  return (
    <View style={styles.container}>
      <Triangle
        modifiers={compose().fill('orange').frame({ width: 120, height: 120 })}
      />
      <Diamond
        modifiers={compose().fill('blue').frame({ width: 120, height: 120 })}
      />
      <Hexagon
        modifiers={compose().fill('teal').frame({ width: 120, height: 120 })}
      />
      <Star
        modifiers={compose().fill('pink').frame({ width: 120, height: 120 })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    gap: 24,
  },
});
