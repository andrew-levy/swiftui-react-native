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
        font="body"
        modifiers={{
          font: 'body',
        }}
      >
        Body
      </Text>
      <Text alignment="leading" font="callout" modifiers={{ font: 'callout' }}>
        Callout
      </Text>
      <Text alignment="leading" modifiers={{ font: 'caption' }} font="caption">
        Caption
      </Text>
      <Text
        alignment="leading"
        modifiers={{ font: 'caption2' }}
        font="caption2"
      >
        Caption 2
      </Text>
      <Text
        alignment="leading"
        modifiers={{ font: 'footnote' }}
        font="footnote"
      >
        Footnote
      </Text>
      <Text
        alignment="leading"
        modifiers={{ font: 'headline' }}
        font="headline"
      >
        Headline
      </Text>
      <Text
        alignment="leading"
        modifiers={{ font: 'largeTitle' }}
        font="largeTitle"
      >
        Large Title
      </Text>
      <Text
        alignment="leading"
        modifiers={{ font: 'subheadline' }}
        font="subheadline"
      >
        Subheadline
      </Text>
      <Text alignment="leading" modifiers={{ font: 'title' }} font="title">
        Title
      </Text>
      <Text alignment="leading" modifiers={{ font: 'title2' }} font="title2">
        Title 2
      </Text>
      <Text alignment="leading" modifiers={{ font: 'title3' }} font="title3">
        Title 3
      </Text>
      <Label title="Labels" systemImage="square.grid.3x1.folder.badge.plus" />
    </List>
  );
};
