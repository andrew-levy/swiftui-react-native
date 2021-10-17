import React, {
  Children,
  ReactElement,
  cloneElement,
  PropsWithChildren,
} from 'react';
import { View, StyleSheet } from 'react-native';
import { Modifiers } from '../../../utils/modifiers';
import { Caption } from '../Caption';
import { ListStyleProvider } from '../ListStyleProvider';
import { ListRowProps } from '../ListRow';
import { useLifecycle } from '../../../hooks/useLifecycle';
import { getShadow } from '../../../utils/shadow';
import { getBorder } from '../../../utils/border';
import { getFrame } from '../../../utils/frame';
import { getPadding } from '../../../utils/padding';
import { useUIColor } from '../../../hooks/useUIColor';
import { getCornerRadius } from '../../../utils/cornerRadius';

export type ListProps = Modifiers &
  PropsWithChildren<{
    inset?: boolean;
    sideBar?: boolean;
    header?: string | ReactElement<any>;
    footer?: string | ReactElement<any>;
    separatorColor?: string;
  }>;

export const List = ({
  inset = false,
  sideBar = false,
  header,
  footer,
  backgroundColor,
  separatorColor,
  cornerRadius,
  padding,
  border,
  frame,
  shadow,
  opacity,
  zIndex,
  children,
  style,
  onAppear,
  onDisappear,
}: ListProps) => {
  useLifecycle(onAppear, onDisappear);
  const UIColor = useUIColor();
  const listStyle = inset ? 'insetGrouped' : 'grouped';
  return (
    <ListStyleProvider
      sideBar={sideBar}
      separatorColor={separatorColor || UIColor.separator}
    >
      <View
        style={[
          getOuterContainerStyles(listStyle),
          {
            opacity,
            zIndex,
            ...getCornerRadius(cornerRadius),
            ...getPadding(padding),
            ...getFrame(frame),
            ...getBorder(border),
            ...getShadow(shadow),
          },
        ]}
      >
        {header && <Caption caption={header} />}
        <View
          style={[
            getContainerStyles(listStyle),
            {
              backgroundColor: backgroundColor || UIColor.systemBackground,
              borderColor: separatorColor || UIColor.separator,
            },
            style,
          ]}
        >
          {Children.map(
            children,
            (child: React.ReactElement<ListRowProps>, index: number) =>
              cloneElement(child, {
                hideSeparator: index === Children.count(children) - 1,
                ...child.props,
              })
          )}
        </View>
        {footer && <Caption caption={footer} />}
      </View>
    </ListStyleProvider>
  );
};

const getOuterContainerStyles = (type: string) => {
  switch (type) {
    case 'grouped':
      return styles.groupedOuterContainer;
    case 'insetGrouped':
      return styles.insetGroupedOuterContainer;
    default:
      return styles.groupedOuterContainer;
  }
};

const getContainerStyles = (type: string) => {
  switch (type) {
    case 'grouped':
      return styles.groupedContainer;
    case 'insetGrouped':
      return styles.insetGroupedContainer;
    default:
      return styles.groupedContainer;
  }
};

const styles = StyleSheet.create({
  groupedOuterContainer: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  insetGroupedOuterContainer: {
    width: '90%',
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  groupedContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth * 1.2,
    borderTopWidth: StyleSheet.hairlineWidth * 1.2,
  },
  insetGroupedContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});
