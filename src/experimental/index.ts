import React from 'react';
import { type Color as ColorType } from '../utils/colors';
import { Button as ButtonComp } from '../views/Button';
import { Color as ColorComp } from '../views/Color';
import { ColorPicker as ColorPickerComp } from '../views/ColorPicker';
import { DatePicker as DatePickerComp } from '../views/DatePicker';
import { Divider as DividerComp } from '../views/Divider';
import { HStack as HStackComp } from '../views/HStack';
import { Image as ImageComp } from '../views/Image';
import { Label as LabelComp } from '../views/Label';
import { List as ListComp } from '../views/List';
import { Menu as MenuComp } from '../views/Menu';
import { Picker as PickerComp } from '../views/Picker';
import { ProgressView as ProgressViewComp } from '../views/ProgressView';
import { Section as SectionComp } from '../views/Section';
import {
  Circle as CircleComp,
  Ellipse as EllipseComp,
  Rectangle as RectangleComp,
  RoundedRectangle as RoundedRectangleComp,
  UnevenRoundedRectangle as UnevenRoundedRectangleComp,
} from '../views/Shape';
import { Slider as SliderComp } from '../views/Slider';
import { Spacer as SpacerComp } from '../views/Spacer';
import { Stepper as StepperComp } from '../views/Stepper';
import { Text as TextComp } from '../views/Text';
import {
  SecureField as SecureFieldComp,
  TextEditor as TextEditorComp,
  TextField as TextFieldComp,
} from '../views/TextField';
import { Toggle as ToggleComp } from '../views/Toggle';
import { VStack as VStackComp } from '../views/VStack';
import { ZStack as ZStackComp } from '../views/ZStack';

import { ButtonProps } from '../views/Button/types';
import { ColorPickerProps } from '../views/ColorPicker/types';
import { DatePickerProps } from '../views/DatePicker/types';
import { HStackProps } from '../views/HStack/types';
import { LabelProps } from '../views/Label/types';
import { MenuProps } from '../views/Menu/types';
import { PickerProps } from '../views/Picker/types';
import { ProgressProps } from '../views/ProgressView/types';
import { SectionProps } from '../views/Section/types';
import { ShapeCornerRadii, ShapeCornerRadius } from '../views/Shape/types';
import { SliderProps } from '../views/Slider/types';
import { StepperProps } from '../views/Stepper/types';
import { TextFieldProps } from '../views/TextField/types';
import { ToggleProps } from '../views/Toggle/types';
import { VStackProps } from '../views/VStack/types';
import { ZStackProps } from '../views/ZStack/types';
import {
  ElementWithModifiers,
  createSwiftUIComponent,
} from './createSwiftUIComponent';

const Text = (text: string) => createSwiftUIComponent(TextComp, {}, text);

const Button = (
  props: Pick<ButtonProps, 'title' | 'action' | 'role' | 'systemImage'>,
  ...children: ElementWithModifiers[]
) => createSwiftUIComponent(ButtonComp, props, children);

const Image = ({ systemName }: { systemName: string }) =>
  createSwiftUIComponent(ImageComp, { systemName }, undefined);

const VStack = (
  propsOrFirstChild:
    | Pick<VStackProps, 'alignment' | 'spacing'>
    | ElementWithModifiers,
  ...children: ElementWithModifiers[]
) => {
  const hasProps =
    'alignment' in propsOrFirstChild || 'spacing' in propsOrFirstChild;
  const allChildren = hasProps
    ? children
    : [propsOrFirstChild as ElementWithModifiers, ...children];
  return createSwiftUIComponent(
    VStackComp,
    propsOrFirstChild,
    React.Children.map(allChildren, (c) => {
      return React.cloneElement(c, { key: children.indexOf(c) });
    })
  );
};

const ZStack = (
  propsOrFirstChild: Pick<ZStackProps, 'alignment'> | ElementWithModifiers,
  ...children: ElementWithModifiers[]
) => {
  const hasProps = 'alignment' in propsOrFirstChild;
  const allChildren = hasProps
    ? children
    : [propsOrFirstChild as ElementWithModifiers, ...children];
  return createSwiftUIComponent(
    ZStackComp,
    propsOrFirstChild,
    React.Children.map(allChildren, (c) => {
      return React.cloneElement(c, { key: children.indexOf(c) });
    })
  );
};

const HStack = (
  propsOrFirstChild:
    | Pick<HStackProps, 'alignment' | 'spacing'>
    | ElementWithModifiers,
  ...children: ElementWithModifiers[]
) => {
  const hasProps =
    'alignment' in propsOrFirstChild || 'spacing' in propsOrFirstChild;
  const allChildren = hasProps
    ? children
    : [propsOrFirstChild as ElementWithModifiers, ...children];
  return createSwiftUIComponent(
    HStackComp,
    propsOrFirstChild,
    React.Children.map(allChildren, (c) => {
      return React.cloneElement(c, { key: children.indexOf(c) });
    })
  );
};

const Toggle = (props: Pick<ToggleProps, 'title' | 'isOn' | 'onChange'>) =>
  createSwiftUIComponent(ToggleComp, props, undefined);

const Stepper = (
  props: Pick<StepperProps, 'value' | 'range' | 'step' | 'onChange'>
) => createSwiftUIComponent(StepperComp, props, undefined);

const Spacer = () => createSwiftUIComponent(SpacerComp, {}, undefined);

const Label = (props: Pick<LabelProps, 'title' | 'systemImage'>) =>
  createSwiftUIComponent(LabelComp, props, undefined);

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

const ColorPicker = (
  props: Pick<
    ColorPickerProps,
    'title' | 'selection' | 'supportsOpacity' | 'onChange'
  >
) => createSwiftUIComponent(ColorPickerComp, props, undefined);

const DatePicker = (
  props: Pick<
    DatePickerProps,
    'title' | 'selection' | 'displayedComponents' | 'onChange'
  >
) => createSwiftUIComponent(DatePickerComp, props, undefined);

const Picker = (props: Pick<PickerProps, 'selection' | 'onChange'>) =>
  createSwiftUIComponent(PickerComp, props, undefined);

const Slider = (
  props: Pick<SliderProps, 'value' | 'range' | 'step' | 'onChange'>
) => createSwiftUIComponent(SliderComp, props, undefined);

const TextField = (
  props: Pick<TextFieldProps, 'text' | 'placeholder' | 'onChange'>
) => createSwiftUIComponent(TextFieldComp, props, undefined);

const SecureField = (
  props: Pick<TextFieldProps, 'text' | 'placeholder' | 'onChange'>
) => createSwiftUIComponent(SecureFieldComp, props, undefined);

const TextEditor = (
  props: Pick<TextFieldProps, 'text' | 'placeholder' | 'onChange'>
) => createSwiftUIComponent(TextEditorComp, props, undefined);

const ProgressView = (props: Pick<ProgressProps, 'value' | 'total'>) =>
  createSwiftUIComponent(ProgressViewComp, props, undefined);

const Circle = () => createSwiftUIComponent(CircleComp, {}, undefined);
const Capsule = () => createSwiftUIComponent(RectangleComp, {}, undefined);
const Ellipse = () => createSwiftUIComponent(EllipseComp, {}, undefined);
const RoundedRectangle = (props: ShapeCornerRadius) =>
  createSwiftUIComponent(RoundedRectangleComp, props, undefined);
const Rectangle = () => createSwiftUIComponent(RectangleComp, {}, undefined);
const UnevenRoundedRectangle = (props: ShapeCornerRadii) =>
  createSwiftUIComponent(UnevenRoundedRectangleComp, props, undefined);

const Section = (
  propsOrFirstChild:
    | Pick<SectionProps, 'header' | 'footer'>
    | ElementWithModifiers,
  ...children: ElementWithModifiers[]
) => {
  const hasProps =
    'header' in propsOrFirstChild || 'footer' in propsOrFirstChild;
  const allChildren = hasProps
    ? children
    : [propsOrFirstChild as ElementWithModifiers, ...children];
  return createSwiftUIComponent(
    SectionComp,
    {
      header: hasProps ? propsOrFirstChild.header : '',
      footer: hasProps ? propsOrFirstChild.footer : '',
    },
    React.Children.map(allChildren, (c) => {
      return React.cloneElement(c, { key: children.indexOf(c) });
    })
  );
};

const Divider = () => createSwiftUIComponent(DividerComp, {}, undefined);

const Menu = (
  props: Pick<MenuProps, 'title' | 'systemImage' | 'primaryAction'>,
  ...children: ElementWithModifiers[]
) =>
  createSwiftUIComponent(
    MenuComp,
    props,
    React.Children.map(children, (c) => {
      return React.cloneElement(c, { key: children.indexOf(c) });
    })
  );

export {
  Button,
  Capsule,
  Circle,
  Color,
  ColorPicker,
  DatePicker,
  Divider,
  Ellipse,
  HStack,
  Image,
  Label,
  List,
  Menu,
  Picker,
  ProgressView,
  Rectangle,
  RoundedRectangle,
  Section,
  SecureField,
  Slider,
  Spacer,
  Stepper,
  Text,
  TextEditor,
  TextField,
  Toggle,
  UnevenRoundedRectangle,
  VStack,
  ZStack,
};
