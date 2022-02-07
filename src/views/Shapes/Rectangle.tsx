import React from "react";
import { useLifecycle } from "../../hooks/useLifecycle";
import { getBorder } from "../../utils/border";
import { getCornerRadius } from "../../utils/cornerRadius";
import { Modifiers } from "../../utils/modifiers";
import { getPadding } from "../../utils/padding";
import { getScaleEffect } from "../../utils/scaleEffect";
import { getShadow } from "../../utils/shadow";
import { getFrame } from "../../utils/frame";
import { VStack } from "../VStack";
import { Spacer } from "../Spacer";
import { useUIColor } from "../..";

type RectangleProps = Omit<Modifiers, "backgroundColor"> & {
  fill?: string;
};

export const Rectangle: React.FC<RectangleProps> = ({
  fill,
  opacity,
  frame = { width: "100%", height: "100%" },
  cornerRadius,
  scaleEffect,
  padding,
  border,
  shadow,
  zIndex,
  style,
  onAppear,
  onDisappear,
}) => {
  useLifecycle(onAppear, onDisappear);
  const UIColor = useUIColor();

  return (
    <VStack
      style={[
        {
          opacity,
          backgroundColor: fill || UIColor.systemBackground,
          zIndex,
          ...getFrame(frame),
          ...getCornerRadius(cornerRadius),
          ...getShadow(shadow),
          ...getPadding(padding),
          ...getBorder(border),
          ...getScaleEffect(scaleEffect),
        },
        style,
      ]}
    >
      <Spacer />
    </VStack>
  );
};
