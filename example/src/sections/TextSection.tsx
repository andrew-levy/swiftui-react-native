import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {
  HStack,
  Label,
  List,
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
    <ScrollView>
      <List frame={{ height: 560 }} header="Fonts" scrollDisabled>
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
      </List>
      <List frame={{ height: 280 }} header="Markdown" scrollDisabled>
        <Text>**Bold**</Text>
        <Text>*Italic*</Text>
        <Text>[Link](https://www.google.com)</Text>
        <Text>`Code`</Text>
        <Text>~~Strikethrough~~</Text>
      </List>
      <List frame={{ height: 150 }} header="Labels" scrollDisabled>
        <Label title="Label" systemImage="square.grid.3x1.folder.badge.plus" />
        <Label title="Moon" systemImage="moon.stars" />
      </List>
      <List frame={{ height: 200 }} header="Content Transition" scrollDisabled>
        <HStack>
          <Text
            frame={{ width: 100 }}
            border={{ color: 'black', width: 1 }}
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
      </List>
    </ScrollView>
  );
};
