const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withMetroConfig } = require('react-native-monorepo-config');

const root = path.resolve(__dirname, '..');

// Resolves the library to its TypeScript sources so edits hot-reload without a build step.
/** @type {import('expo/metro-config').MetroConfig} */
module.exports = withMetroConfig(getDefaultConfig(__dirname), {
  root,
  dirname: __dirname,
  conditions: ['swiftui-react-native-source'],
});
