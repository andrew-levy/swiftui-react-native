import React from 'react';
import { Binding, BooleanBinding } from '../utils/binding';
import { type Color as ColorType } from '../utils/colors';
import { Button as ButtonComp } from '../views/Button';
import { Color as ColorComp } from '../views/Color';
import { HStack as HStackComp } from '../views/HStack';
import { Image as ImageComp } from '../views/Image';
import { SystemName } from '../views/Image/types';
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

const Button = ({ title, action }: { title: string; action: () => void }) =>
  createSwiftUIComponent(ButtonComp, { title, action }, title);

const Image = ({ systemName }: { systemName: string }) =>
  createSwiftUIComponent(ImageComp, { systemName }, undefined);

const VStack = (
  propsOrFirstChild:
    | { alignment: string; spacing: number }
    | ElementWithModifiers,
  ...children: ElementWithModifiers[]
) => {
  const hasProps =
    'alignment' in propsOrFirstChild || 'spacing' in propsOrFirstChild;
  const allChildren = hasProps ? children : [propsOrFirstChild, ...children];
  return createSwiftUIComponent(
    VStackComp,
    {
      alignment: hasProps ? propsOrFirstChild.alignment : 'center',
      spacing: hasProps ? propsOrFirstChild.spacing : 0,
    },
    React.Children.map(allChildren, (c) => {
      return React.cloneElement(c, { key: children.indexOf(c) });
    })
  );
};

const HStack = (
  propsOrFirstChild:
    | { alignment: string; spacing: number }
    | ElementWithModifiers,
  ...children: ElementWithModifiers[]
) => {
  const hasProps =
    'alignment' in propsOrFirstChild || 'spacing' in propsOrFirstChild;
  const allChildren = hasProps ? children : [propsOrFirstChild, ...children];
  return createSwiftUIComponent(
    HStackComp,
    {
      alignment: hasProps ? propsOrFirstChild.alignment : 'center',
      spacing: hasProps ? propsOrFirstChild.spacing : 0,
    },
    React.Children.map(allChildren, (c) => {
      return React.cloneElement(c, { key: children.indexOf(c) });
    })
  );
};

const Toggle = ({
  title,
  isOn,
}: {
  title: string;
  isOn: boolean | BooleanBinding;
}) => createSwiftUIComponent(ToggleComp, { title, isOn }, undefined);

const Stepper = ({
  value,
  range,
}: {
  value: number | Binding<number>;
  range: [number, number];
}) => createSwiftUIComponent(StepperComp, { value, range }, undefined);

const Spacer = () => createSwiftUIComponent(SpacerComp, {}, undefined);

const Label = ({
  systemImage,
  title,
}: {
  systemImage: SystemName;
  title: string;
}) => createSwiftUIComponent(LabelComp, { systemImage, title }, undefined);

const List = (...children: ElementWithModifiers[]) => {
  return createSwiftUIComponent(
    ListComp,
    {},
    React.Children.map(children, (c) => {
      return React.cloneElement(c, { key: children.indexOf(c) });
    })
  );
};

const Color: ((color: ColorType) => ElementWithModifiers) & {
  red: ElementWithModifiers;
  green: ElementWithModifiers;
  blue: ElementWithModifiers;
  black: ElementWithModifiers;
  white: ElementWithModifiers;
  gray: ElementWithModifiers;
  primary: ElementWithModifiers;
  secondary: ElementWithModifiers;
  accentColor: ElementWithModifiers;
  clear: ElementWithModifiers;
  cyan: ElementWithModifiers;
  indigo: ElementWithModifiers;
  mint: ElementWithModifiers;
  orange: ElementWithModifiers;
  pink: ElementWithModifiers;
  purple: ElementWithModifiers;
  teal: ElementWithModifiers;
  yellow: ElementWithModifiers;
} = (color: string) => createSwiftUIComponent(ColorComp, { color }, undefined);

Color.red = Color('red');
Color.green = Color('green');
Color.blue = Color('blue');
Color.black = Color('black');
Color.white = Color('white');
Color.gray = Color('gray');
Color.primary = Color('primary');
Color.secondary = Color('secondary');
Color.accentColor = Color('accentColor');
Color.clear = Color('clear');
Color.cyan = Color('cyan');
Color.indigo = Color('indigo');
Color.mint = Color('mint');
Color.orange = Color('orange');
Color.pink = Color('pink');
Color.purple = Color('purple');
Color.teal = Color('teal');
Color.yellow = Color('yellow');

export {
  Button,
  Color,
  HStack,
  Image,
  Label,
  List,
  Spacer,
  Stepper,
  Text,
  Toggle,
  VStack,
};
