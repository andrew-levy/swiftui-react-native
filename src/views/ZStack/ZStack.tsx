import React from 'react';
import {
  VerticalAlignment,
  HorizontalAlignment,
  Frame,
  Padding,
} from '../../types/propTypes';
import { systemColor, UIColor } from '../../utils/colors';
import { View } from 'react-native';
import { getPadding } from '../../utils/padding';
import { getFrame } from '../../utils/frame';
import { useColorScheme } from '../../hooks/useColorScheme';

type ZStackProps = {
  background?: string;
  alignment?: HorizontalAlignment | VerticalAlignment;
  padding?: Padding;
  spacing?: number;
  width?: number;
  frame?: Frame;
  cornerRadius?: number;
  children: React.ReactElement<any> | React.ReactElement<any>[];
};

export const ZStack = ({
  background = UIColor.transparent,
  cornerRadius = 0,
  padding,
  frame,
  children,
}: ZStackProps) => {
  const { colorScheme } = useColorScheme();
  return (
    <View
      style={{
        backgroundColor: systemColor(background, colorScheme),
        justifyContent: 'center',
        borderRadius: cornerRadius,
        ...getFrame(frame),
        ...getPadding(padding),
      }}
    >
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          ...child.props,
          style: { zIndex: i, position: 'absolute' },
        })
      )}
    </View>
  );
};
