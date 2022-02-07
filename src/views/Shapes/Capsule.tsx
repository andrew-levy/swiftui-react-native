import React from "react";
import { Modifiers } from "../../utils/modifiers";
import { Rectangle } from "./Rectangle";

type CapsuleProps = Omit<Modifiers, "backgroundColor"> & {
  fill: string;
};

export const Capsule: React.FC<CapsuleProps> = ({
  frame = { width: "100%", height: "100%" },
  cornerRadius = 99999,
  ...rest
}) => {
  return <Rectangle frame={frame} cornerRadius={cornerRadius} {...rest} />;
};
