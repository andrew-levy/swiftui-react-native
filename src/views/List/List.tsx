import React, { Children, ReactElement, PropsWithChildren } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Modifiers } from '../../utils/modifiers';
import { ListRow, ListRowProps } from './ListRow';
import { useLifecycle } from '../../hooks/useLifecycle';
import { getShadow } from '../../utils/shadow';
import { getBorder } from '../../utils/border';
import { getFrame } from '../../utils/frame';
import { getPadding } from '../../utils/padding';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getTransform } from '../../utils/transform';
import { useColorScheme } from '../../hooks/useColorScheme';
import { UIColor, getColor } from '../../utils/colors';

type ListProps = Modifiers &
  PropsWithChildren<{
    inset?: boolean;
    header?: string | ReactElement<any>;
    footer?: string | ReactElement<any>;
    separatorTint?: UIColor;
    hideSeparators?: boolean;
  }>;

export const List = ({
  inset = false,
  header,
  footer,
  backgroundColor,
  separatorTint,
  hideSeparators,
  cornerRadius,
  scaleEffect,
  rotationEffect,
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
  const colorScheme = useColorScheme();

  const listStyle = inset ? 'insetGrouped' : 'grouped';
  return (
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
          ...getTransform(scaleEffect, rotationEffect),
        },
      ]}
    >
      {header && <Caption caption={header} />}
      <View
        style={[
          getContainerStyles(listStyle),
          {
            backgroundColor: getColor(
              backgroundColor,
              colorScheme,
              'systemBackground'
            ),
            borderColor: getColor(separatorTint, colorScheme, 'separator'),
          },
          style,
        ]}
      >
        {Children.map(
          children,
          (child: React.ReactElement<ListRowProps>, index: number) => (
            <ListRow
              separatorTint={getColor(separatorTint, colorScheme, 'separator')}
              hideSeparator={
                hideSeparators ? true : index === Children.count(children) - 1
              }
            >
              {child}
            </ListRow>
          )
        )}
      </View>
      {footer && <Caption caption={footer} />}
    </View>
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

const Caption = ({ caption }: { caption: string | ReactElement<any> }) => {
  const colorScheme = useColorScheme();
  return typeof caption === 'string' ? (
    <Text
      style={[styles.caption, { color: getColor('systemGray', colorScheme) }]}
    >
      {caption}
    </Text>
  ) : (
    caption
  );
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
  caption: {
    fontWeight: '500',
    marginLeft: '3%',
    marginVertical: 10,
  },
});
