import React from 'react';
import { Button, Label, List, useBinding } from 'swiftui-react-native';

export const ButtonSection = () => {
  const showAlert = useBinding(false);
  return (
    <List style={{ flex: 1 }}>
      <Button action={showAlert.toggle} buttonStyle="bordered" padding={8}>
        <Label title="hello world" systemImage="moon.circle" bold padding />
      </Button>
      <Button
        title="Bordered"
        action={showAlert.toggle}
        buttonStyle="bordered"
        padding={8}
      />
      <Button
        title="Borderless"
        action={showAlert.toggle}
        buttonStyle="borderless"
        padding={8}
      />
      <Button
        title="Bordered Prominent"
        action={showAlert.toggle}
        buttonStyle="borderedProminent"
        padding={8}
      />
      <Button
        buttonStyle="plain"
        title="Plain"
        action={showAlert.toggle}
        padding={8}
      />
      <Button padding={8} title="List Row" action={showAlert.toggle} />
    </List>
  );
};
