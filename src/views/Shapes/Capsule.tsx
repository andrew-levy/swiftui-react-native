import React from "react";
import { StyleSheet, View } from "react-native";
import { useUIColor } from "../../hooks/useUIColor";
import { useLifecycle } from "../../hooks/useLifecycle";
import { getBorder } from "../../utils/border";
import { getCornerRadius } from "../../utils/cornerRadius";
import { Frame, getFrame } from "../../utils/frame";
import { Modifiers } from "../../utils/modifiers";
import { getPadding } from "../../utils/padding";
import { getScaleEffect } from "../../utils/scaleEffect";
import { getShadow } from "../../utils/shadow";
import { HStack } from "../HStack";
import { Image } from "../Image";
import { Spacer } from "../Spacer";
import { Text } from "../Text";
import { VStack } from "../VStack";

type CapsuleProps = Omit<Modifiers, "frame"> & {
    width: number;
    height: number;
};

export const Capsule: React.FC<CapsuleProps> = ({
    backgroundColor,
    opacity,
    width,
    height,
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
    
    const radius = Math.min(width || 100, height || 100)/2

    return (
        <VStack
            style={[
                {
                    opacity,
                    backgroundColor: backgroundColor || UIColor.systemBlue,
                    zIndex,
                    ...getCornerRadius(radius),
                    ...getShadow(shadow),
                    ...getPadding(padding),
                    ...getBorder(border),
                    ...getScaleEffect(scaleEffect),
                },
                { width: width || "100%", height: height || "100%", },
                style,
            ]}
        >
            <Spacer />
            <HStack>
                <Spacer />
                <Text>{""}</Text>
                <Spacer />
            </HStack>
            <Spacer />
        </VStack>
    );
};
