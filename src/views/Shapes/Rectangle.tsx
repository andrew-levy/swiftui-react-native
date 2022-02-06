import React from "react";
import { View } from "react-native";
import { useLifecycle } from "../../hooks/useLifecycle";
import { getBorder } from "../../utils/border";
import { getCornerRadius } from "../../utils/cornerRadius";
import { Modifiers } from "../../utils/modifiers";
import { getPadding } from "../../utils/padding";
import { getScaleEffect } from "../../utils/scaleEffect";
import { getShadow } from "../../utils/shadow";
import { getFrame } from "../../utils/frame";
import { useColorScheme } from "../../hooks/useColorScheme";

type RectangleProps = Modifiers;

export const Rectangle: React.FC<RectangleProps> = ({
    backgroundColor,
    opacity,
    frame = { width: 50, height: 50 },
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
    const defaultBackgroundColor = (colorScheme.colorScheme == 'light' ? 'black':'white')

    var stretchedFrame = frame;
    if (!stretchedFrame.width) stretchedFrame.width = "100%";
    if (!stretchedFrame.height) stretchedFrame.height = "100%";

    return (
        <View
            style={[
                {
                    opacity,                            
                    backgroundColor: backgroundColor || defaultBackgroundColor,
                    zIndex,
                    ...getFrame(stretchedFrame),
                    ...getCornerRadius(cornerRadius),
                    ...getShadow(shadow),
                    ...getPadding(padding),
                    ...getBorder(border),
                    ...getScaleEffect(scaleEffect),
                },
                style,
            ]}
        >
        </View>
    );
};
