import React from 'react';
import { List, SwiftUI } from 'swiftui-react-native';

export const ExperimentalApiSection = () => {
  return (
    <List>
      <List.Section header="Experimental API">
        {SwiftUI.HStack(() => [
          SwiftUI.Text('Hello, World!'),
          SwiftUI.Image('person'),
        ]).padding(10)}
      </List.Section>
    </List>
  );
};
