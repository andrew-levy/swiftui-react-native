import React from 'react';
import {
  Frame,
  Padding,
  HorizontalAlignment,
} from '../../types/stylePropTypes';
import { Spacer } from '../Spacer';
import { UIColor } from '../../themes/colors';
import { FlexAlignType, View } from 'react-native';
import { getPadding } from '../../utils/getPadding';
import { Alignments } from '../../themes/alignments';
import { getFrame } from '../../utils/getFrame';

type VStackProps = {
  background?: string;
  alignment?: HorizontalAlignment;
  padding?: Padding;
  spacing?: number;
  width?: number;
  frame?: Frame;
  fillSpace?: string;
  cornerRadius?: number;
  children: React.ReactElement<any> | React.ReactElement<any>[];
};

export const VStack = ({
  background = UIColor.transparent,
  spacing,
  alignment = Alignments.horizontal.center as HorizontalAlignment,
  fillSpace,
  cornerRadius = 0,
  padding,
  frame,
  children,
}: VStackProps) => {
  return (
    <View
      style={{
        backgroundColor: background,
        alignItems: Alignments.horizontal[alignment] as FlexAlignType,
        justifyContent: 'center',
        borderRadius: cornerRadius,
        ...getFrame(frame),
        ...getPadding(padding),
      }}
    >
      {spacing && spacing !== 0
        ? React.Children.map(children, (child) => (
            <>
              <Spacer space={spacing} />
              {child}
              <Spacer space={spacing} />
            </>
          ))
        : children}
    </View>
  );
};

// Spacer version:

// export const ChildPositionContext = createContext(null);
// ...
// const [childPositions, setChildPositions] = useState([]);
// ...
// <ChildPositionContext.Provider
//   value={{ childPositions, setChildPositions }}
// >
//  <View onLayout={(e) => console.log('height: ', e.nativeEvent.layout.height)}> ... </View>
// </ChildPositionContext.Provider>
