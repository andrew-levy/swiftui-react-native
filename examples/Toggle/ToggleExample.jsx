import React, { useState } from 'react';
import { Toggle } from 'swiftui-react-native';

export const ToggleExample = () => {
  const [darkMode, setDarkMode] = useState(false);
  return <Toggle isOn={darkMode} onToggle={() => setDarkMode(!darkMode)} />;
};
