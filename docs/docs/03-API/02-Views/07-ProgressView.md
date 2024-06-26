---
---

A view that shows the progress towards completion of a task.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Example

<Tabs>
<TabItem value="srn" label="swiftui-react-native">

### Indeterminate

```tsx
<ProgressView />
```

### Linear

```tsx
<ProgressView value={progress} />
```

</TabItem>
<TabItem value="swiftui" label="SwiftUI">

### Indeterminate

```swift
ProgressView()
```

### Linear

```swift
ProgressView(value: progress).progressViewStyle(.linear)
```

</TabItem>
</Tabs>

## Props

ProgressView inherits all [View Modifiers](../modifiers#full-list) as props.

| prop    | description            | type     | required | default     |
| ------- | ---------------------- | -------- | -------- | ----------- |
| `value` | The progress value     | `number` | no       | `undefined` |
| `total` | The max progress value | `number` | no       | `100`       |
