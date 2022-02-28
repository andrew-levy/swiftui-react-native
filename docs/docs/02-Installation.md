---
---

**Step 1:** Install the package in your React Native project

```console
yarn add swiftui-react-native
```

**Step 2:** Complete the following steps based on your target platform

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="ios" label="iOS">

```console
yarn add react-native-reanimated react-native-gesture-handler react-native-sfsymbols
```

:::info Dependency
`react-native-reanimated` requires extra steps to set up. Complete them [here](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/).
:::

:::info Dependency
`react-native-gesture-handler` requires extra steps to set up. Complete them [here](https://docs.swmansion.com/react-native-gesture-handler/docs/).
:::

:::info Dependency
`react-native-sfsymbols` requires extra steps to set up. Complete them [here](https://github.com/birkir/react-native-sfsymbols).
:::

</TabItem>
<TabItem value="android" label="Android">

```console
yarn add react-native-reanimated react-native-gesture-handler
```

:::info Dependency
`react-native-reanimated` requires extra steps to set up. Complete them [here](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/).
:::

:::info Dependency
`react-native-gesture-handler` requires extra steps to set up. Complete them [here](https://docs.swmansion.com/react-native-gesture-handler/docs/).
:::

</TabItem>
</Tabs>

**Step 3:** :tada: You should be all set now! Start up your app and enjoy building.

:::caution Having trouble?
If you run into any errors during installation, try stopping your metro bundler and run

```console
yarn start --reset-cache
```

:::
