import React from 'react';
import {
  Button,
  Divider,
  Label,
  List,
  Menu,
  Section,
  Text,
  Toggle,
  useBinding,
} from 'swiftui-react-native';

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
      <Menu systemImage="00.square" border={{}}>
        <Text>This is some text</Text>
        <Button
          title="Button + SF Symbol"
          systemImage="person"
          action={() => console.log('world')}
        />
        <Divider />
        <Button title="Dividers!" action={() => console.log('hello')} />
        <Section header="This is a section">
          <Button
            title="Lets gooo"
            systemImage="bag.badge.minus"
            action={showAlert.toggle}
          />
          <Toggle title="Toggle works too" isOn={showAlert} />
          <Label
            title="This is a label"
            systemImage="moon.circle"
            bold
            padding
          />
        </Section>
        <Menu title="Want a sub menu?">
          <Button
            title="Lets gooo!"
            systemImage="person.icloud"
            action={showAlert.toggle}
          />
          <Section header="Actions">
            <Button
              role="destructive"
              title="Delete"
              systemImage="trash"
              action={showAlert.toggle}
            />
          </Section>
        </Menu>
      </Menu>
    </List>
  );
};
