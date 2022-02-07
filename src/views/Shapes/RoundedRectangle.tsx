import React from "react";
import { Modifiers } from "../../utils/modifiers";
import { Rectangle } from "./Rectangle";

type RoundedRectangleProps = Omit<Modifiers, "backgroundColor"> & {
  fill?: string;
};

export const RoundedRectangle: React.FC<RoundedRectangleProps> = ({
  cornerRadius = 10,
  ...rest
}) => {
  return <Rectangle cornerRadius={cornerRadius} {...rest} />;
};
