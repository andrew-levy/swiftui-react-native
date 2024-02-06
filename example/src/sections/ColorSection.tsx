import React from "react";
import {
  List,
  Text,
  HStack,
  VStack,
  UIColor,
  useUIColor,
  ForEach,
  Label,
} from "swiftui-react-native";
import { toWords } from "../utils";

export const ColorSection = () => {
  const UIColors = useUIColor();
  return (
    <>
      <List inset header="Colors">
        {ForEach(Object.keys(UIColors), (color, i) => (
          <Label
            key={i}
            title={toWords(color)}
            icon={<Swatch color={color as UIColor} />}
          />
        ))}
      </List>
    </>
  );
};

const Swatch = ({ color }: { color: UIColor }) => {
  return (
    <VStack
      frame={{ width: 20, height: 20 }}
      cornerRadius={6}
      border={{ width: 1, color: "systemGray5" }}
      backgroundColor={color}
    />
  );
};
