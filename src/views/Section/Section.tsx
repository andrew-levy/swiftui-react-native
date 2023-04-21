import React, { Children, ReactElement, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modifiers } from '../../utils/modifiers';
import { useLifecycle } from '../../hooks/useLifecycle';
import { getShadow } from '../../utils/shadow';
import { getBorder } from '../../utils/border';
import { getFrame } from '../../utils/frame';
import { getPadding } from '../../utils/padding';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getTransform } from '../../utils/transform';
import { useColorScheme } from '../../hooks/useColorScheme';
import { getColor, UIColor } from '../../utils/colors';
import { useAlert } from '../../hooks/useAlert';
import { ListRow } from '../List/ListRow';
import { Text } from '../Text/Text';

type SectionProps = Modifiers & {
  header?: string | ReactElement<any>;
  footer?: string | ReactElement<any>;
  listStyle?: 'grouped' | 'insetGrouped';
  separatorTint?: UIColor;
  separatorHidden?: boolean;
  children?: ReactNode;
};

export function Section({
  header,
  footer,
  separatorTint = 'separator',
  separatorHidden = false,
  listStyle = 'insetGrouped',
  backgroundColor,
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
}: SectionProps) {
  useAlert(alert);
  useLifecycle(onAppear, onDisappear);
  const colorScheme = useColorScheme(preferredColorScheme);

  return (
    <View
      style={[
        {
          marginBottom: 20,
          opacity,
          zIndex,
          backgroundColor: getColor(backgroundColor, colorScheme),
          ...getCornerRadius(cornerRadius),
          ...getPadding(padding),
          ...getFrame(frame),
          ...getBorder(border, colorScheme),
          ...getShadow(shadow, colorScheme),
          ...getTransform(scaleEffect, rotationEffect),
        },
        style,
      ]}
    >
      {header &&
        (typeof header === 'string' ? (
          <Text
            alignment="leading"
            style={[
              styles.caption,
              { marginLeft: listStyle === 'grouped' ? 20 : 40 },
            ]}
            foregroundColor={getColor('systemGray', colorScheme)}
            font="footnote"
          >
            {header.toUpperCase()}
          </Text>
        ) : (
          header
        ))}
      <View
        style={[
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
          ]}
        >
          {Children.map(
            children as React.ReactElement<any>[],
            (child, index: number) => {
              return (
                <ListRow
                  key={`listRow-${index}-${child}`}
                  separatorTint={getColor(
                    separatorTint,
                    colorScheme,
                    'separator'
                  )}
                  hideSeparator={
                    separatorHidden
                      ? true
                      : index === Children.count(children) - 1
                  }
                >
                  {child}
                </ListRow>
              );
            }
          )}
        </View>
      </View>
      {footer &&
        (typeof header === 'string' ? (
          <Text
            alignment="leading"
            style={[
              styles.caption,
              { marginLeft: listStyle === 'grouped' ? 20 : 40 },
            ]}
            foregroundColor={getColor('systemGray', colorScheme)}
            font="footnote"
          >
            {footer}
          </Text>
        ) : (
          footer
        ))}
    </View>
  );
}

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
  groupedContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth * 1.2,
    borderTopWidth: StyleSheet.hairlineWidth * 1.2,
  },
  insetGroupedContainer: {
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  caption: {
    marginVertical: 10,
  },
});
