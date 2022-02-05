import React from "react";
import { View } from "react-native";
import { useUIColor } from "../../hooks/useUIColor";
import { useLifecycle } from "../../hooks/useLifecycle";
import { getBorder } from "../../utils/border";
import { getCornerRadius } from "../../utils/cornerRadius";
import { Modifiers } from "../../utils/modifiers";
import { getPadding } from "../../utils/padding";
import { getScaleEffect } from "../../utils/scaleEffect";
import { getShadow } from "../../utils/shadow";

type CircleProps = Omit<Modifiers, "frame"> & {
    radius: number;
};

export const Circle: React.FC<CircleProps> = ({
    backgroundColor,
    opacity,
    radius,
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
                    ...getCornerRadius(radius || 50),
                    ...getShadow(shadow),
                    ...getPadding(padding),
                    ...getBorder(border),
                    ...getScaleEffect(scaleEffect),
                },
                { width: radius || 100, height: radius || 100 },
                style,
            ]}
        />
    );
};
