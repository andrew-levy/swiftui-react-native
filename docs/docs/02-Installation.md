---
---

:::info Note
Due to the nature of the project, there was a bias towards iOS while developing and testing this library. Though Android is supported, some features (like sfsymbols) can't be implemented.
:::

## Add the package

```console
yarn add swiftui-react-native
```

## Add the dependencies

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="ios" label="iOS">

```console
yarn add react-native-reanimated react-native-gesture-handler react-native-sfsymbols
```

:::info Dependencies
`react-native-reanimated` requires extra steps to set up. Complete them [here](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/).

`react-native-gesture-handler` requires extra steps to set up. Complete them [here](https://docs.swmansion.com/react-native-gesture-handler/docs/).

`react-native-sfsymbols` requires extra steps to set up. Complete them [here](https://github.com/birkir/react-native-sfsymbols). This library is only supported on iOS due to [Apple's Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/sf-symbols/overview/).
:::

</TabItem>
<TabItem value="android" label="Android">

```console
yarn add react-native-reanimated react-native-gesture-handler
```

:::info Dependencies
`react-native-reanimated` requires extra steps to set up. Complete them [here](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/).

`react-native-gesture-handler` requires extra steps to set up. Complete them [here](https://docs.swmansion.com/react-native-gesture-handler/docs/).
:::

</TabItem>
</Tabs>

## Go build!

You should be all set now. Go build something awesome!
