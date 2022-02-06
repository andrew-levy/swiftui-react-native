export type Rotation = {degrees?: number, radians?: number};

export const getRotationEffect = (rotation: Rotation) => {
    if (rotation?.degrees) {
        const rotate = Math.round(rotation.degrees) + 'deg'
        return {
            transform: [{ rotate }],
        };
    }
    if (rotation?.radians) {
        const rotate = rotation.radians + 'rad'
        return {
            transform: [{ rotate }],
        };
    }
    return null;
  };
  