import React from "react";
import { Modifiers } from "../../utils/modifiers";
import { Rectangle } from "./Rectangle";

type RoundedRectangleProps = Omit<Modifiers,"backgroundColor"> & {
    fill?: string
};

export const RoundedRectangle: React.FC<RoundedRectangleProps> = ({
    fill,
    cornerRadius = 10,
    ...rest
}) => {

    return <Rectangle {...{
        fill,
        cornerRadius,
        ...rest
    }}></Rectangle>;
};
