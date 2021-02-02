import React from 'react';
import {
  VerticalAlignment,
  HorizontalAlignment,
  Frame,
  Padding,
} from '../../types/stylePropTypes';
import { UIColor } from '../../themes/colors';
import { View } from 'react-native';
import { getPadding } from '../../utils/getPadding';
import { getFrame } from '../../utils/getFrame';

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
  return (
    <View
      style={{
        backgroundColor: background,
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
