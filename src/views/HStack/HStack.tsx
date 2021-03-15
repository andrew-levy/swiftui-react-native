import React from 'react';
import { VerticalAlignment, Frame, Padding } from '../../types/propTypes';
import { Spacer } from '../Spacer';
import { systemColor, UIColor } from '../../utils/colors/utils';
import { FlexAlignType, View } from 'react-native';
import { getPadding } from '../../utils/getPadding';
import { Alignments } from '../../utils/alignments';
import { getFrame } from '../../utils/getFrame';
import { useColorScheme } from '../../hooks/useColorScheme';

type HStackProps = {
  background?: string;
  alignment?: VerticalAlignment;
  padding?: Padding;
  spacing?: number | 'stretch';
  fillSpace?: 'left' | 'right';
  frame?: Frame;
  cornerRadius?: number;
  children: React.ReactElement<any> | React.ReactElement<any>[];
};

export const HStack: React.FC<HStackProps> = ({
  background = UIColor.transparent,
  spacing,
  alignment = Alignments.vertical.center,
  fillSpace,
  cornerRadius = 0,
  padding,
  frame,
  children,
}) => {
  const spacer =
    spacing && typeof spacing === 'number' ? (
      <Spacer direction='horizontal' space={spacing} />
    ) : null;
  const { colorScheme } = useColorScheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: fillSpace
          ? fillSpace === 'left'
            ? 'flex-end'
            : 'flex-start'
          : spacing === 'stretch'
          ? 'space-between'
          : 'center',
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
              {spacer}
              {child}
              {spacer}
            </>
          ))
        : children}
    </View>
  );
};
