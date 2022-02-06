import React from "react";
import { Modifiers } from "../../utils/modifiers";
import { Rectangle } from "./Rectangle";

type CircleProps = Modifiers;

export const Circle: React.FC<CircleProps> = ({
    backgroundColor,
    opacity,
    frame,
    scaleEffect,
    padding,
    border,
    shadow,
    zIndex,
    style,
    onAppear,
    onDisappear,
}) => {
    var width: any = frame?.width;
    var height: any = frame?.height;

    if (width && height) {
        try {
            // width/height could be a string
            const size = Math.max(width, height);
            width = size;
            height = size;
        } catch (e) {}
    } else if (width) {
        height = width;
    } else if (height) {
        width = height;
    }

    return (
        <Rectangle
            {...{
                backgroundColor,
                opacity,
                frame: { width, height },
                cornerRadius: Number.MAX_SAFE_INTEGER,
                scaleEffect,
                padding,
                border,
                shadow,
                zIndex,
                style,
                onAppear,
                onDisappear,
            }}
        />
    );
};
