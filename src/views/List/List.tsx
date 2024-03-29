import React, { Children, ReactElement, ReactNode } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Modifiers } from '../../utils/modifiers';
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
import { Section } from '../Section';

type ListProps<T> = Modifiers & {
  listStyle?: 'grouped' | 'insetGrouped';
  separatorTint?: UIColor;
  separatorHidden?: boolean;
  data?: T[];
  children?: ReactNode | ((item: T, index: number) => ReactNode);
};

export function List<T>({
  data,
  listStyle = 'insetGrouped',
  backgroundColor,
  separatorTint,
  separatorHidden,
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

  function getAllChildren() {
    if (typeof children == 'function') {
      return Children.map(data, (item, index) => {
        return children(item, index);
      });
    } else {
      return Children.toArray(children);
    }
  }

  function mapChildrenToSections() {
    const allChildren = getAllChildren();
    const sections = [];
    let currentSection = [];
    allChildren.forEach((child: ReactElement) => {
      if (child.type === Section) {
        if (currentSection.length > 0) {
          sections.push(
            <Section {...{ separatorHidden, separatorTint, listStyle }}>
              {currentSection}
            </Section>
          );
        }
        const childWithProps = React.cloneElement(child, {
          listStyle,
          separatorHidden,
          separatorTint,
          ...child.props,
        });

        sections.push(childWithProps);
        currentSection = [];
      } else {
        currentSection.push(child);
      }
    });
    if (currentSection.length > 0) {
      sections.push(
        <Section {...{ separatorHidden, separatorTint, listStyle }}>
          {currentSection}
        </Section>
      );
    }
    return sections;
  }

  function renderSections() {
    return mapChildrenToSections();
  }

  return (
    <ScrollView
      style={[
        getOuterContainerStyles(listStyle),
        {
          opacity,
          zIndex,
          backgroundColor: getColor(
            backgroundColor,
            colorScheme,
            'secondarySystemBackground'
          ),
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
      {renderSections()}
    </ScrollView>
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

const styles = StyleSheet.create({
  groupedOuterContainer: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  insetGroupedOuterContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
});
