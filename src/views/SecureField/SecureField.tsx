import React from 'react';
import { TextField, TextFieldProps } from '../TextField/TextField';

export function SecureField(props: TextFieldProps) {
  return <TextField {...props} secureField={true} textContentType="password" />;
}
