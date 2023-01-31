import React from 'react';
import { TextField, TextFieldProps } from '../TextField/TextField';

export function TextEditor(props: TextFieldProps) {
  return <TextField {...props} textEditor={true} />;
}
