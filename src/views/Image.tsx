import React from 'react';
import styled from 'styled-components';

type ImageProps = {
  name: string;
};

const StyledImage = styled.Image``;

export const Image: React.FC<ImageProps> = ({ name }) => {
  return <StyledImage soruce={null} />;
};

/* PROPS:
 * clipShape
 * image
 * margin
 * border
 * hidden
 * shaddow radius
 */
