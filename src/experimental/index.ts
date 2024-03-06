import React from 'react';
import { Binding, BooleanBinding } from '../utils/binding';
import { type Color as ColorType } from '../utils/colors';
import { Button as ButtonComp } from '../views/Button';
import { Color as ColorComp } from '../views/Color';
import { ColorPicker as ColorPickerComp } from '../views/ColorPicker';
import { DatePicker as DatePickerComp } from '../views/DatePicker';
import { HStack as HStackComp } from '../views/HStack';
import { Image as ImageComp } from '../views/Image';
import { SystemName } from '../views/Image/types';
import { Label as LabelComp } from '../views/Label';
import { List as ListComp } from '../views/List';
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
    | { alignment?: string; spacing?: number }
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
    {
      alignment: hasProps ? propsOrFirstChild.alignment : 'center',
      spacing: hasProps ? propsOrFirstChild.spacing : undefined,
    },
    React.Children.map(allChildren, (c) => {
      return React.cloneElement(c, { key: children.indexOf(c) });
    })
  );
};

const HStack = (
  propsOrFirstChild:
    | { alignment?: string; spacing?: number }
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
    {
      alignment: hasProps ? propsOrFirstChild.alignment : 'center',
      spacing: hasProps ? propsOrFirstChild.spacing : undefined,
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

const ColorPicker = ({
  selection,
  title,
}: {
  selection: Binding<string>;
  title?: string;
}) => createSwiftUIComponent(ColorPickerComp, { selection, title }, undefined);

const DatePicker = ({
  selection,
  label,
  displayedComponents,
}: {
  selection: Binding<Date>;
  label: string;
  displayedComponents: ('date' | 'hourAndMinute')[];
}) =>
  createSwiftUIComponent(
    DatePickerComp,
    { selection, label, displayedComponents },
    undefined
  );

const Picker = ({
  selection,
  options,
  pickerStyle,
}: {
  selection: Binding<string>;
  options: string[];
  pickerStyle: 'segmented' | 'wheel' | 'menu';
}) =>
  createSwiftUIComponent(
    PickerComp,
    { selection, options, pickerStyle },
    undefined
  );

const Slider = ({
  value,
  range,
}: {
  value: Binding<number>;
  range: [number, number];
}) => createSwiftUIComponent(SliderComp, { value, range }, undefined);

const TextField = ({
  text,
  placeholder,
  onCommit,
}: {
  text: Binding<string>;
  placeholder: string;
  onCommit: () => void;
}) =>
  createSwiftUIComponent(
    TextFieldComp,
    { text, placeholder, onCommit },
    undefined
  );

const SecureField = ({
  text,
  placeholder,
  onCommit,
}: {
  text: Binding<string>;
  placeholder: string;
  onCommit: () => void;
}) =>
  createSwiftUIComponent(
    SecureFieldComp,
    { text, placeholder, onCommit },
    undefined
  );

const TextEditor = ({
  text,
  placeholder,
  onCommit,
}: {
  text: Binding<string>;
  placeholder: string;
  onCommit: () => void;
}) =>
  createSwiftUIComponent(
    TextEditorComp,
    { text, placeholder, onCommit },
    undefined
  );

const ProgressView = ({ progress }: { progress: Binding<number> }) =>
  createSwiftUIComponent(ProgressViewComp, { progress }, undefined);

const Circle = () => createSwiftUIComponent(CircleComp, {}, undefined);
const Capsule = () => createSwiftUIComponent(RectangleComp, {}, undefined);
const Ellipse = () => createSwiftUIComponent(EllipseComp, {}, undefined);
const RoundedRectangle = (cornerRadius: number) =>
  createSwiftUIComponent(RoundedRectangleComp, { cornerRadius }, undefined);
const Rectangle = () => createSwiftUIComponent(RectangleComp, {}, undefined);
const UnevenRoundedRectangle = ({
  cornerRadii,
}: {
  cornerRadii: {
    topLeading: number;
    topTrailing: number;
    bottomLeading: number;
    bottomTrailing: number;
  };
}) =>
  createSwiftUIComponent(
    UnevenRoundedRectangleComp,
    { cornerRadii },
    undefined
  );

const Section = (
  propsOrFirstChild:
    | { header?: string; footer?: string }
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

export {
  Button,
  Capsule,
  Circle,
  Color,
  ColorPicker,
  DatePicker,
  Ellipse,
  HStack,
  Image,
  Label,
  List,
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
};
