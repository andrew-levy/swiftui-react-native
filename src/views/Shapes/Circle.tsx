import React from "react";
import { Modifiers } from "../../utils/modifiers";
import { Rectangle } from "./Rectangle";

type CircleProps = Omit<Modifiers, "backgroundColor"> & {
  fill?: string;
  frame?: { width?: number; height?: number };
};

export const Circle: React.FC<CircleProps> = ({
  frame,
  cornerRadius = 99999,
  ...rest
}) => {
  let diameter;
  if (frame) {
    const { width: frameWidth, height: frameHeight } = frame;
    if (frameWidth && frameHeight) diameter = Math.max(frameWidth, frameHeight);
    else if (frameWidth && !frameHeight) diameter = frameWidth;
    else if (frameHeight && !frameWidth) diameter = frameHeight;
    else diameter = 100;
  }

  return (
    <Rectangle
      frame={{ width: diameter, height: diameter }}
      cornerRadius={cornerRadius}
      {...rest}
    />
  );
};
