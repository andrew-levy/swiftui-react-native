import React, { useEffect, useState } from 'react';
import { Text } from './Text';
import styled from 'styled-components';
import { UIColor } from '../themes/colors';
import { Animated, Easing } from 'react-native';
import { Frame } from '../types/stylePropTypes';
import { getFrameFromProps } from '../styleProps/frame';

type TextFieldProps = {
  placeholder?: string;
  text: string;
  onChangeText: () => void;
  frame?: Frame;
  textFieldStyle?: 'underline' | 'default';
};

const StyledTextFieldDefault = styled.TextInput`
  border-bottom-color: ${UIColor.systemGray6};
  border-bottom-width: 1px;
  width: 80%;
  padding-bottom: 10px;
  font-size: 18px;
  padding-top: 10px;
  ${({ frame }) => getFrameFromProps(frame)}
`;

const StyledTextFieldBox = styled.TextInput`
  background-color: ${UIColor.systemGray6};
  border-radius: 6px;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 10px;
  padding-right: 10px;
  color: ${UIColor.black};
  ${({ frame }) => getFrameFromProps(frame)}
`;

const { timing, Value } = Animated;

export const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  text,
  onChangeText,
  textFieldStyle,
  frame,
}) => {
  const [translateY, setTranslateY] = useState(new Value(0));
  const [opacity, setOpacity] = useState(new Value(0));

  const animatePlaceholder = () => {
    timing(translateY, {
      toValue: text === '' ? 20 : 0,
      duration: 100,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
    timing(opacity, {
      toValue: text === '' ? 0 : 1,
      duration: 100,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animatePlaceholder();
  }, [text]);

  if (textFieldStyle === 'underline') {
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
        <StyledTextFieldDefault
          placeholder={placeholder}
          value={text}
          onChangeText={onChangeText}
          frame={frame}
        />
      </>
    );
  }
  return (
    <StyledTextFieldBox
      placeholder={placeholder}
      value={text}
      onChangeText={onChangeText}
      frame={frame}
    />
  );
};

/* PROPS:
 * textfield styles: default, plain, underline
 * + overrides
 */
