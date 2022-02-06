import React from "react";
import { Modifiers } from "../../utils/modifiers";
import { Rectangle } from "./Rectangle";

type CapsuleProps = Omit<Modifiers,"backgroundColor"> & {
    fill: string
}

export const Capsule: React.FC<CapsuleProps> = ({
    fill,
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

    const width = frame?.width || "100%";
    const height = frame?.height || "100%";

    return (
        <Rectangle
            {...{
                fill,
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
