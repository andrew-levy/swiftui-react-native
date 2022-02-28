---
---

Provides global context to the app. Wrap your app in a `SwiftUIRoot` to access environment variables like `colorScheme`.

```tsx
<SwiftUIRoot environment={{ colorScheme: 'dark', isLoggedIn: false }}>
  <MyApp />
</SwiftUIRoot>
```
