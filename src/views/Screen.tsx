import React from 'react';

export type ScreenProps = {
  name: string;
  component: React.ComponentType<any>;
  options: object;
};

export const Screen: React.FC<ScreenProps> = (props) => {
  return null;
};
