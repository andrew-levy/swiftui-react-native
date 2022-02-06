import React from "react";
import { Modifiers } from "../../utils/modifiers";
import { Rectangle } from "./Rectangle";

type RoundedRectangleProps = Modifiers;

export const RoundedRectangle: React.FC<RoundedRectangleProps> = ({
    backgroundColor,
    opacity,
    frame = { width: 50, height: 50 },
    cornerRadius = 5,
    scaleEffect,
    padding,
    border,
    shadow,
    zIndex,
    style,
    onAppear,
    onDisappear,
}) => {

    return <Rectangle {...{
        backgroundColor,
        opacity,
        frame,
        cornerRadius,
        scaleEffect,
        padding,
        border,
        shadow,
        zIndex,
        style,
        onAppear,
        onDisappear,
    }}></Rectangle>;
};
