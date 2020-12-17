import React from 'react';

export type NavigationViewProps = {
  name: string;
  view: React.ComponentType<any>;
  options: object;
};

export const NavigationView: React.FC<NavigationViewProps> = (props) => {
  return null;
};

// TODO: Separate each option out to its own prop matching up with swiftui.
// For example, navigationBarTitle={{ text: 'Title', displayMode: 'inline' }}
// Add animation
