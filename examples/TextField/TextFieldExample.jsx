import React, { useState } from 'react';
import { TextField } from 'react-native-swiftui';

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
