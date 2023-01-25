import React, { ReactNode, useState } from 'react';
import { View } from 'react-native';
import { Modifiers } from '../../utils/modifiers';

type GeometryReaderProps = Modifiers & {
  children?: ReactNode | ((proxy: GeometryProxy) => ReactNode);
};

type GeometryProxy = {
  frame: {
    x: number;
    y: number;
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    midX: number;
    midY: number;
  };
  size: {
    width: number;
    height: number;
  };
};

export function GeometryReader({ children }: GeometryReaderProps) {
  const [layout, setLayout] = useState<GeometryProxy>({
    frame: {
      x: 0,
      y: 0,
      minX: 0,
      minY: 0,
      maxX: 0,
      maxY: 0,
      midX: 0,
      midY: 0,
    },
    size: {
      width: 0,
      height: 0,
    },
  });

  const handleLayout = (event) => {
    const { layout } = event.nativeEvent;
    setLayout({
      frame: {
        x: layout.x,
        y: layout.y,
        minX: layout.x,
        minY: layout.y,
        maxX: layout.x + layout.width,
        maxY: layout.y + layout.height,
        midX: layout.x + layout.width / 2,
        midY: layout.y + layout.height / 2,
      },
      size: {
        width: layout.width,
        height: layout.height,
      },
    });
  };

  return (
    <View onLayout={handleLayout}>
      {typeof children === 'function' ? children(layout) : children}
    </View>
  );
}
