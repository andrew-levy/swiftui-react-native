import React from "react";
import { Modifiers } from "../../utils/modifiers";
import { Rectangle } from "./Rectangle";

type CapsuleProps = Modifiers;

export const Capsule: React.FC<CapsuleProps> = ({
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

    const width = frame.width || "100%";
    const height = frame.height || "100%";

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
