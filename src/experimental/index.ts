import { HStack as HStackComp } from '../views/HStack';
import { Image as ImageComp } from '../views/Image';
import { Text as TextComp } from '../views/Text';
import { VStack as VStackComp } from '../views/VStack';
import { createSwiftUIComponent } from './createSwiftUIComponent';

const Text = (text: string) => createSwiftUIComponent(TextComp, {}, text);
const Image = (systemName: string) =>
  createSwiftUIComponent(ImageComp, { systemName }, undefined);

const VStack = (children: () => any) =>
  createSwiftUIComponent(VStackComp, {}, children());

const HStack = (children: () => any) =>
  createSwiftUIComponent(HStackComp, {}, children());

export const SwiftUI = {
  Text,
  Image,
  VStack,
  HStack,
};
