import React from 'react';
import {
  HStack,
  Label,
  List,
  Section,
  Spacer,
  Stepper,
  Text,
  useBinding,
} from 'swiftui-react-native';

/**
 * A list of SwiftUI Fonts
 */
export const TextSection = () => {
  const count = useBinding(0);
  return (
    <List style={{ flex: 1 }}>
      <Section header="System Fonts">
        <Text font="body">Body</Text>
        <Text font="callout">Callout</Text>
        <Text font="caption">Caption</Text>
        <Text font="caption2">Caption 2</Text>
        <Text font="footnote">Footnote</Text>
        <Text font="headline">Headline</Text>
        <Text font="largeTitle">Large Title</Text>
        <Text font="subheadline">Subheadline</Text>
        <Text font="title">Title</Text>
        <Text font="title2">Title 2</Text>
        <Text font="title3">Title 3</Text>
      </Section>
      <Section header="Markdown">
        <Text>**Bold**</Text>
        <Text>*Italic*</Text>
        <Text>[Link](https://www.google.com)</Text>
        <Text>`Code`</Text>
        <Text>~~Strikethrough~~</Text>
      </Section>
      <Section header="Labels">
        <Label title="Label" systemImage="square.grid.3x1.folder.badge.plus" />
        <Label title="Moon" systemImage="moon.stars" />
      </Section>
      <Section header="Content Transition">
        <HStack>
          <Text
            frame={{ width: 80 }}
            contentTransition="numericText"
            animation={{
              type: 'spring',
              value: count.value,
            }}
          >
            Count: {count.value}
          </Text>
          <Spacer />
          <Stepper value={count} />
        </HStack>
      </Section>
    </List>
  );
};
