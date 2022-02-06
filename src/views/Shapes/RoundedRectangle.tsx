import React from "react";
import { Modifiers } from "../../utils/modifiers";
import { Rectangle } from "./Rectangle";

type RoundedRectangleProps = Omit<Modifiers,"backgroundColor"> & {
    fill: string
};

export const RoundedRectangle: React.FC<RoundedRectangleProps> = ({
    fill,
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
        fill,
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
