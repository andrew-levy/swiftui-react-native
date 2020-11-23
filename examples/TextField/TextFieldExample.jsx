import React, { useState } from 'react';
import { TextField } from 'swiftui-react-native';

export const TextFieldExample = () => {
  const [name, setName] = useState('');
  return (
    <TextField
      placeholder='Enter your name'
      text={name}
      onChangeText={(text) => setName(text)}
    />
  );
};
