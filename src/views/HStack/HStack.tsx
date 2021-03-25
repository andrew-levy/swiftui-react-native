import React from 'react';
import { VerticalAlignment, Frame, Padding } from '../../types/propTypes';
import { systemColor, UIColor } from '../../utils/colors';
import { FlexAlignType, View } from 'react-native';
import { getPadding } from '../../utils/padding';
import { Alignments } from '../../utils/alignments';
import { getFrame } from '../../utils/frame';
import { useColorScheme } from '../../hooks/useColorScheme';

type HStackProps = {
  background?: string;
  alignment?: VerticalAlignment;
  padding?: Padding;
  spacing?: number | 'stretch';
  frame?: Frame;
  cornerRadius?: number;
  children: React.ReactElement<any> | React.ReactElement<any>[];
};

export const HStack: React.FC<HStackProps> = ({
  background = UIColor.transparent,
  spacing,
  alignment = Alignments.vertical.center,
  cornerRadius = 0,
  padding,
  frame,
  children,
}) => {
  const { colorScheme } = useColorScheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: systemColor(background, colorScheme),
        borderRadius: cornerRadius,
        alignItems: Alignments.vertical[alignment] as FlexAlignType,
        ...getFrame(frame),
        ...getPadding(padding),
      }}
    >
      {spacing && spacing !== 0
        ? React.Children.map(children, (child) => (
            <>
              <View style={{ width: spacing }} />
              {child}
              <View style={{ width: spacing }} />
            </>
          ))
        : children}
    </View>
  );
};
