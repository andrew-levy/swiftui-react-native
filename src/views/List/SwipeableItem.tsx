import React from 'react';
import { View, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { UIColor } from '../../themes/colors';

type SwipeableItemProps = {
  onDelete: () => void;
};

export const SwipeableItem: React.FC<SwipeableItemProps> = ({
  onDelete,
  children,
}) => {
  return (
    <Swipeable
      renderRightActions={(progress, dragX) => (
        <DeleteAction progress={progress} dragX={dragX} />
      )}
      onSwipeableRightOpen={onDelete}
    >
      {children}
    </Swipeable>
  );
};

const DeleteAction = ({ progress, dragX }) => {
  const translateX = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: UIColor.systemRed,
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}
    >
      <Animated.Text
        style={{
          color: 'white',
          paddingHorizontal: 20,
          fontWeight: '600',
          transform: [{ translateX }],
        }}
      >
        Delete
      </Animated.Text>
    </View>
  );
};
