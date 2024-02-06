import React from "react";
import {
  List,
  SecureField,
  TextEditor,
  TextField,
  useBinding,
} from "swiftui-react-native";

export const TextFieldSection = () => {
  const text = useBinding("");
  const password = useBinding("");
  const bio = useBinding("");
  return (
    <List inset header="Editable Text">
      <TextField frame={{ width: "100%" }} placeholder="Username" text={text} />
      <SecureField
        frame={{ width: "100%" }}
        placeholder="Password"
        text={password}
      />
      <TextEditor frame={{ width: "100%" }} placeholder="Bio" text={bio} />
    </List>
  );
};
