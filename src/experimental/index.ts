import { Binding, BooleanBinding } from '../utils/binding';
import { HStack as HStackComp } from '../views/HStack';
import { Image as ImageComp } from '../views/Image';
import { Label as LabelComp } from '../views/Label';
import { List as ListComp } from '../views/List';
import { Spacer as SpacerComp } from '../views/Spacer';
import { Stepper as StepperComp } from '../views/Stepper';
import { Text as TextComp } from '../views/Text';
import { Toggle as ToggleComp } from '../views/Toggle';
import { VStack as VStackComp } from '../views/VStack';
import {
  ElementWithModifiers,
  createSwiftUIComponent,
} from './createSwiftUIComponent';

const Text = (text: string) => createSwiftUIComponent(TextComp, {}, text);

const Image = (systemName: string) =>
  createSwiftUIComponent(ImageComp, { systemName }, undefined);

const VStack = (children: ElementWithModifiers[]) =>
  createSwiftUIComponent(VStackComp, {}, children);

const HStack = (children: ElementWithModifiers[]) =>
  createSwiftUIComponent(HStackComp, {}, children);

const Toggle = (label: string, isOn: boolean | BooleanBinding) =>
  createSwiftUIComponent(ToggleComp, { label, isOn }, undefined);

const Stepper = (
  value: number | Binding<number>,
  range: [number, number],
  onChange: (value: number) => void
) => createSwiftUIComponent(StepperComp, { value, range, onChange }, undefined);

const Spacer = () => createSwiftUIComponent(SpacerComp, {}, undefined);

const Label = (title: string, systemImage: string) =>
  createSwiftUIComponent(LabelComp, { systemImage, title }, undefined);

const List = (children: () => any) =>
  createSwiftUIComponent(ListComp, {}, children());

export const SwiftUI = {
  Text,
  Image,
  VStack,
  HStack,
  Spacer,
  Toggle,
  Label,
  List,
  Stepper,
};
