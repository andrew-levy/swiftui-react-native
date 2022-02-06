import React, { useState } from "react";
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
import { VStack } from "../VStack";
import { HStack } from "../HStack";
import { Spacer } from "../Spacer";
import { Text } from "../Text";

type RectangleProps = Modifiers

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
    const defaultBackgroundColor = colorScheme.colorScheme == "light" ? "black" : "white";


    // stretch the frame if needed so it's stretched before onLayout fires
    if (!frame?.width) frame.width = "100%";
    if (!frame?.height) frame.height = "100%";

    return (
        <VStack
            style={[
                {
                    opacity,
                    backgroundColor: backgroundColor || defaultBackgroundColor,
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

// onLayout={(event) => {
//     if (onLayout) {
//         console.log(event.nativeEvent.layout);
//         onLayout(event.nativeEvent.layout.width, event.nativeEvent.layout.height);
//         setLayout({
//             width: event.nativeEvent.layout.width,
//             height: event.nativeEvent.layout.height,
//         });
//     }
// }}