import React, { Children, ReactElement, ReactNode } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
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
import { useAlert } from '../../hooks/useAlert';

type ListProps<T> = Modifiers & {
  inset?: boolean;
  header?: string | ReactElement<any>;
  footer?: string | ReactElement<any>;
  separatorTint?: UIColor;
  hideSeparators?: boolean;
  data?: T[];
  children?: ReactNode | ((item: T, index: number) => ReactNode);
};

export function List<T>({
  data,
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
  alert,
  preferredColorScheme,
  onAppear,
  onDisappear,
}: ListProps<T>) {
  useAlert(alert);
  useLifecycle(onAppear, onDisappear);
  const colorScheme = useColorScheme(preferredColorScheme);

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
          ...getBorder(border, colorScheme),
          ...getShadow(shadow, colorScheme),
          ...getTransform(scaleEffect, rotationEffect),
        },
      ]}
    >
      {header && (
        <Caption caption={header} preferredColorScheme={preferredColorScheme} />
      )}
      <ScrollView
        contentContainerStyle={[
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
        {data && typeof children === 'function'
          ? data.map((dataItem, index: number) => {
              const rowId = Math.floor(Math.random()) * 1000;
              return (
                <ListRow
                  key={`listRow-${rowId}-${index}`}
                  separatorTint={getColor(
                    separatorTint,
                    colorScheme,
                    'separator'
                  )}
                  hideSeparator={
                    hideSeparators ? true : index === data.length - 1
                  }
                >
                  {children(dataItem, index)}
                </ListRow>
              );
            })
          : Children.map(
              children as React.ReactElement<any>[],
              (child, index: number) => {
                const rowId = Math.floor(Math.random()) * 1000;
                return (
                  <ListRow
                    key={`listRow-${rowId}-${index}`}
                    separatorTint={getColor(
                      separatorTint,
                      colorScheme,
                      'separator'
                    )}
                    hideSeparator={
                      hideSeparators
                        ? true
                        : index === Children.count(children) - 1
                    }
                  >
                    {child}
                  </ListRow>
                );
              }
            )}
      </ScrollView>
      {footer && <Caption caption={footer} />}
    </View>
  );
}

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

const Caption = ({
  caption,
  preferredColorScheme,
}: {
  caption: string | ReactElement<any>;
  preferredColorScheme?: Modifiers['preferredColorScheme'];
}) => {
  const colorScheme = useColorScheme(preferredColorScheme);
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
