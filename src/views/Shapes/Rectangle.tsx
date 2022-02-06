import React from "react";
import { useLifecycle } from "../../hooks/useLifecycle";
import { getBorder } from "../../utils/border";
import { getCornerRadius } from "../../utils/cornerRadius";
import { Modifiers } from "../../utils/modifiers";
import { getPadding } from "../../utils/padding";
import { getScaleEffect } from "../../utils/scaleEffect";
import { getShadow } from "../../utils/shadow";
import { getFrame } from "../../utils/frame";
import { useColorScheme } from "../../hooks/useColorScheme";
import { VStack } from "../VStack";
import { Spacer } from "../Spacer";

type RectangleProps = Omit<Modifiers,"backgroundColor"> & {
    fill?: string
}

export const Rectangle: React.FC<RectangleProps> = ({
    fill,
    opacity,
    frame = { width: "100%", height: "100%" },
    cornerRadius,
    scaleEffect,
    padding,
    border,
    shadow,
    zIndex,
    style,
    onAppear,
    onDisappear,
}) => {
    useLifecycle(onAppear, onDisappear);
    const colorScheme = useColorScheme();

    // could be replaced with UIColor.primary if that is created
    const defaultBackgroundColor = colorScheme.colorScheme == "light" ? "black" : "white";

    return (
        <VStack
            style={[
                {
                    opacity,
                    backgroundColor: fill || defaultBackgroundColor,
                    zIndex,
                    ...getFrame(frame),
                    ...getCornerRadius(cornerRadius),
                    ...getShadow(shadow),
                    ...getPadding(padding),
                    ...getBorder(border),
                    ...getScaleEffect(scaleEffect),
                },
                style,
            ]}
        >
            <Spacer/>
        </VStack>
    );
};