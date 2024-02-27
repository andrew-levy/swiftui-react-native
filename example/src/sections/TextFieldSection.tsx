import React from 'react';

import {
  List,
  SecureField,
  Text,
  TextEditor,
  TextField,
  useBinding,
} from 'swiftui-react-native';

export const TextFieldSection = () => {
  const text = useBinding('Andrew');
  const password = useBinding('password');
  const bio = useBinding('My bio...');
  return (
    <List>
      <TextField placeholder="Username" text={text} />
      <SecureField placeholder="Password" text={password} />
      <TextEditor
        placeholder="Bio"
        text={bio}
        style={{ height: 100, width: 300 }}
      />
      <Text>Username: {text.value}</Text>
      <Text>Password: {password.value}</Text>
      <Text>Bio: {bio.value}</Text>
    </List>
  );
};
