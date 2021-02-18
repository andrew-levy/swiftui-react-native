import React, { useEffect, useState } from 'react';
import { UIColor } from '../../themes/colors';
import { Animated, Easing, TextInput, StyleSheet } from 'react-native';
import { TextFieldProps } from './TextField';

const { timing, Value } = Animated;

export const AnimatedTextField: React.FC<TextFieldProps> = ({
  placeholder,
  text,
  onChangeText,
  frame = { width: null, height: null },
}) => {
  const translateY = useState(new Value(0))[0];
  const opacity = useState(new Value(0))[0];

  const animatePlaceholder = () => {
    const translateYTo = text === '' ? 20 : 0;
    const opacityTo = text === '' ? 0 : 1;
    timing(translateY, {
      toValue: translateYTo,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
    timing(opacity, {
      toValue: opacityTo,
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (text.length === 1 || text.length === 0) {
      animatePlaceholder();
    }
  }, [text]);

  return (
    <>
      <Animated.Text
        style={[
          styles.text,
          {
            transform: [{ translateY }],
            opacity: opacity,
          },
        ]}
      >
        {placeholder}
      </Animated.Text>
      <TextInput
        placeholder={placeholder}
        value={text}
        onChangeText={onChangeText}
        style={[
          styles.input,
          {
            width: frame.width,
            height: frame.height,
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomColor: UIColor.systemGray3,
    borderBottomWidth: StyleSheet.hairlineWidth * 1.2,
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 18,
  },
  text: {
    position: 'absolute',
    left: 20,
    color: UIColor.systemGray3,
    fontSize: 16,
  },
});
