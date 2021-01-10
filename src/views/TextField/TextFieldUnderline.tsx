import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UIColor } from '../../themes/colors';
import { Animated, Easing } from 'react-native';
import { getFrameFromProps } from '../../styleProps/frame';
import { TextFieldProps } from './TextField';

const { timing, Value } = Animated;

const StyledTextField = styled.TextInput`
  border-bottom-color: ${UIColor.systemGray6};
  border-bottom-width: 1px;
  width: 80%;
  padding-bottom: 10px;
  font-size: 18px;
  padding-top: 10px;
  ${({ frame }) => getFrameFromProps(frame)}
`;

export const TextFieldUnderline: React.FC<TextFieldProps> = ({
  placeholder,
  text,
  onChangeText,
  frame,
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
    animatePlaceholder();
  }, [text]);

  return (
    <>
      <Animated.Text
        style={{
          transform: [{ translateY }],
          opacity: opacity,
          position: 'absolute',
          color: UIColor.systemGray3,
          fontSize: 16,
        }}
      >
        {placeholder}
      </Animated.Text>
      <StyledTextField
        placeholder={placeholder}
        value={text}
        onChangeText={onChangeText}
        frame={frame}
      />
    </>
  );
};
