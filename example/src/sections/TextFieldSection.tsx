import React from 'react';
import { List, ListRow, TextField, useBinding } from 'swiftui-react-native';

export const TextFieldSection = () => {
  const text = useBinding('');
  return (
    <List inset header='Text Field'>
      <ListRow>
        <TextField placeholder='Enter your name' text={text} />
      </ListRow>
    </List>
  );
};
