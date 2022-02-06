import { Rotation } from "../rotationEffect";

export const getTransform = (scaleEffect: number, rotationEffect: Rotation) => {
    if (!scaleEffect && !rotationEffect) return null;

    let rotate;
    let scale = scaleEffect;
    if (rotationEffect?.degrees) {
        rotate = Math.round(rotationEffect.degrees) + "deg";
    } else if (rotationEffect?.radians) {
        rotate = rotationEffect.radians + "rad";
    }
    return {
        transform: [{ rotate }, { scale }],
    };
};
