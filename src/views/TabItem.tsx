import React from 'react';

export type TabItemProps = {
  name: string;
  component: React.ComponentType<any>;
  options: object;
};

export const TabItem: React.FC<TabItemProps> = (props) => {
  return null;
};