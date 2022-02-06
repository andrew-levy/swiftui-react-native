import React from "react";
import { Modifiers } from "../../utils/modifiers";
import { Rectangle } from "./Rectangle";

type CapsuleProps = Modifiers;

export const Capsule: React.FC<CapsuleProps> = ({
    backgroundColor,
    opacity,
    frame = { width: 100, height: 30 },
    cornerRadius = 15,
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
