import React from "react";
import { Dimensions } from "react-native";
import { Modifiers } from "../../utils/modifiers";
import { Rectangle } from "./Rectangle";

type CircleProps = Modifiers;

export const Circle: React.FC<CircleProps> = ({
    backgroundColor,
    opacity,
    frame = { width: 100, height: 100 },
    cornerRadius = Dimensions.get('window').width,
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
