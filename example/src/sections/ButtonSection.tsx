import React, { useState } from 'react';
import {
  Button,
  Image,
  Link,
  List,
  ListRow,
  Text,
  useAlert,
  useUIColor,
} from 'swiftui-react-native';

export const ButtonSection = () => {
  const UIColor = useUIColor();
  const [showAlert, setShowAlert] = useState(false);
  useAlert(showAlert, {
    title: 'SwiftUI is Cool',
    message: 'So is React Native!',
    buttons: [{ text: 'Cancel', onPress: () => setShowAlert(false) }],
  });
  return (
    <List inset header='Buttons'>
      <ListRow>
        <Button action={() => setShowAlert(true)}>
          <Text alignment='leading'>Button</Text>
        </Button>
      </ListRow>
      <ListRow
        trailing={
          <Image
            systemName='chevron.right'
            foregroundColor={UIColor.systemGray2}
          />
        }
      >
        <Link destination='https://www.apple.com'>
          <Text alignment='leading'>Link</Text>
        </Link>
      </ListRow>
    </List>
  );
};
