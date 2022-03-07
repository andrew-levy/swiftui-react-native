export type Rotation = { degrees?: number; radians?: number };

export const getTransform = (scaleEffect: number, rotationEffect: Rotation) => {
  if (!scaleEffect && !rotationEffect) return null;

  let rotate = '0deg';
  let scale = scaleEffect || 1;
  if (rotationEffect?.degrees) {
    rotate = Math.round(rotationEffect.degrees) + 'deg';
  } else if (rotationEffect?.radians) {
    rotate = rotationEffect.radians + 'rad';
  }

  return {
    transform: [{ rotate }, { scale }],
  };
};
