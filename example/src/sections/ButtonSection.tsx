import React from 'react';
import { Button, List, useBinding } from 'swiftui-react-native';

export const ButtonSection = () => {
  const showAlert = useBinding(false);
  return (
    <List style={{ flex: 1 }}>
      <Button
        title="Bordered"
        action={showAlert.toggle}
        buttonStyle="bordered"
      />
      <Button
        title="Borderless"
        action={showAlert.toggle}
        buttonStyle="borderless"
      />
      <Button
        title="Bordered Prominent"
        action={showAlert.toggle}
        buttonStyle="borderedProminent"
      />
      <Button buttonStyle="plain" title="Plain" action={showAlert.toggle} />
      <Button title="List Row" action={showAlert.toggle} />
    </List>
  );
};
