import React from "react";
import { Modifiers } from "../../utils/modifiers";
import { Rectangle } from "./Rectangle";

type RoundedRectangleProps = Modifiers;

export const RoundedRectangle: React.FC<RoundedRectangleProps> = ({
    backgroundColor,
    opacity,
    frame,
    cornerRadius = 10,
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
