---
---

## Add the package to your app

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

`react-native-sfsymbols` requires extra steps to set up. Complete them [here](https://github.com/birkir/react-native-sfsymbols).
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

:::caution Heads up
`react-native-sfsymbols` is only supported on iOS due to [Apple's Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/sf-symbols/overview/).
:::

## Go Build!

You should be all set now. Go build something awesome!

:::caution Having trouble?
If you run into any errors during installation, try stopping your metro bundler and run

```console
yarn start --reset-cache
```

:::
