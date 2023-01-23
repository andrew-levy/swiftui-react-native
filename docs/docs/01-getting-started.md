---
slug: /
title: Welcome
---

Bringing the best **SwiftUI** features to your **React Native** app :rocket:

<img style={{ borderRadius: 20, boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", marginTop: 20 }} src="img/cover.png" />

## At a Glance

- :white_check_mark: SwiftUI-like API
- :white_check_mark: Dark Mode out of the box
- :white_check_mark: Access to Apple's design system
- :white_check_mark: Written in TypeScript

## Usage

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

```tsx
import {
  VStack,
  Text,
  TextField,
  Button,
  useBinding,
} from 'swiftui-react-native';

function App() {
  const $text = useBinding('');
  return (
    <VStack
      aligment="leading"
      backgroundColor="systemGray6"
      padding={{ leading: 30 }}
      cornerRadius={20}
    >
      <Text font="title">Some cool text</Text>
      <TextField text={$text} placeholder="Name" />
      <Button action={doSomething}>
        <Text bold>Click the cool button</Text>
      </Button>
    </VStack>
  );
}
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

```swift
import SwiftUI

struct App: View {

    @State var text = ""

    var body: some View {
        VStack(alignment: .leading) {
            Text("Some cool text")
                .font(.title)
            TextField("Name", text: $text)
            Button(action: doSomething) {
                Text("Click the cool button").bold()
            }
        }
        .background(Color(.systemGray6))
        .padding(.leading, 30)
        .cornerRadius(20)
    }
}
```

</TabItem>
<TabItem value="react-native" label="React Native">

```tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

function App() {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Some cool text</Text>
      <TextInput
        placeholder="Name"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <TouchableOpacity onPress={doSomething}>
        <Text style={styles.buttonText}>Click the cool button</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: '#F2F2F7FF',
    paddingLeft: 30,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});
```

</TabItem>
</Tabs>

## Acknowledgements

Thanks to [Zach Grimaldi](https://github.com/zpg6) for contributing awesome ideas and for bringing a much needed iOS developer's perspective to table.
