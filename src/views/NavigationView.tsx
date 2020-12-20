import React from 'react';

export type NavigationViewProps = {
  name: string;
  view: React.ComponentType<any>;
  options: object;
  navigationBar?: NavigationBar;
};

type NavigationBar = {
  disabled?: boolean;
  title?: string;
  displayMode?: 'inline' | 'large' | 'animated-inline';
  backgroundStyle?: object;
  foregroundColor?: string;
  leading?: () => React.ReactElement<any>;
  trailing?: () => React.ReactElement<any>;
};

export const NavigationView: React.FC<NavigationViewProps> = (props) => {
  return null;
};

// TODO: Separate each option out to its own prop matching up with swiftui.
// For example, navigationBarTitle={{ text: 'Title', displayMode: 'inline' }}
// Add animation
