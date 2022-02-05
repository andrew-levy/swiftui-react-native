import React from "react";
import { useUIColor } from "../../hooks/useUIColor";
import { useLifecycle } from "../../hooks/useLifecycle";
import { getBorder } from "../../utils/border";
import { getCornerRadius } from "../../utils/cornerRadius";
import { Modifiers } from "../../utils/modifiers";
import { getPadding } from "../../utils/padding";
import { getScaleEffect } from "../../utils/scaleEffect";
import { getShadow } from "../../utils/shadow";
import { View } from "react-native";

type RoundedRectangleProps = Omit<Modifiers, "frame"> & {
    cornerRadius: number;
    width: number | string;
    height: number | string;
};

export const RoundedRectangle: React.FC<RoundedRectangleProps> = ({
    backgroundColor,
    opacity,
    width,
    height,
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
    const UIColor = useUIColor();

    return (
        <View
            style={[
                {
                    opacity,
                    backgroundColor: backgroundColor || UIColor.systemBlue,
                    zIndex,
                    ...getCornerRadius(cornerRadius || 15),
                    ...getShadow(shadow),
                    ...getPadding(padding),
                    ...getBorder(border),
                    ...getScaleEffect(scaleEffect),
                },
                { width: width || "100%", height: height || "100%" },
                style,
            ]}
        >
        </View>
    );
};
