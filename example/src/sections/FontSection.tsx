import React from 'react';
import { Label, List, Text } from 'swiftui-react-native';

/**
 * A list of SwiftUI Fonts
 */
export const FontSection = () => {
  return (
    <List style={{ flex: 1 }}>
      <Text
        alignment="leading"
        modifiers={{
          font: 'body',
        }}
      >
        Body
      </Text>
      <Text alignment="leading" modifiers={{ font: 'callout' }}>
        Callout
      </Text>
      <Text alignment="leading" modifiers={{ font: 'caption' }}>
        Caption
      </Text>
      <Text alignment="leading" modifiers={{ font: 'caption2' }}>
        Caption 2
      </Text>
      <Text alignment="leading" modifiers={{ font: 'footnote' }}>
        Footnote
      </Text>
      <Text alignment="leading" modifiers={{ font: 'headline' }}>
        Headline
      </Text>
      <Text alignment="leading" modifiers={{ font: 'largeTitle' }}>
        Large Title
      </Text>
      <Text alignment="leading" modifiers={{ font: 'subheadline' }}>
        Subheadline
      </Text>
      <Text alignment="leading" modifiers={{ font: 'title' }}>
        Title
      </Text>
      <Text alignment="leading" modifiers={{ font: 'title2' }}>
        Title 2
      </Text>
      <Text alignment="leading" modifiers={{ font: 'title3' }}>
        Title 3
      </Text>
      <Label title="Labels" systemImage="square.grid.3x1.folder.badge.plus" />
    </List>
  );
};
