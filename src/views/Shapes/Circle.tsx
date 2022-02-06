import React from "react";
import { Modifiers } from "../../utils/modifiers";
import { Rectangle } from "./Rectangle";

type CircleProps = Omit<Modifiers,"backgroundColor"> & {
    fill?: string
}

export const Circle: React.FC<CircleProps> = ({
    frame,
    cornerRadius,
    ...rest
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
                frame: { width, height },
                cornerRadius: Number.MAX_SAFE_INTEGER,
                ...rest
            }}
        />
    );
};
