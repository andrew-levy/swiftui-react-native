import React from 'react';
import { CustomShape, type CustomShapeProps } from '../generated/components/CustomShape';
import { createPath } from '../generated/modifiers/builders';
import type { PathChain } from '../generated/modifiers/values';
import { encodeArguments } from './bridge';
import type { CGRect } from '../generated/modifiers/support';
import type { SwiftUIViewProps } from './component';
import { Scalar, symbolicRect, type SymbolicRect } from './symbolic';
import { evaluateValue } from './values';

type Parameters = Record<string, number>;
type Symbols<P extends Parameters> = { readonly [Key in keyof P]: Scalar };

/** A declared shape: a component, and a value wherever SwiftUI takes a `Shape`. */
export type DeclaredShape<P extends Parameters> = ((props: Partial<P> & SwiftUIViewProps) => React.JSX.Element) & {
  /** The shape as a value, with these parameters: `clipShape(Wave.with({ amplitude: 8 }))`. */
  with(parameters: Partial<P>): { readonly $shape: unknown };
  /** `path(in:)`: the path for a rectangle, computed by native code as SwiftUI would. */
  path(options: { in: CGRect }, parameters?: Partial<P>): PathChain;
  readonly $shape: unknown;
};

export function createShape(path: (rect: SymbolicRect) => PathChain): DeclaredShape<{}>;
export function createShape<P extends Parameters>(parameters: P, path: (rect: SymbolicRect, parameters: Symbols<P>) => PathChain): DeclaredShape<P>;
export function createShape(first: unknown, second?: unknown): DeclaredShape<Parameters> {
  const defaults = (second ? first : {}) as Parameters;
  const body = (second ?? first) as (rect: SymbolicRect, parameters: Record<string, Scalar>) => PathChain;
  const keys = Object.keys(defaults).sort();
  const symbols = Object.fromEntries(keys.map((key, index) => [key, new Scalar(['param', index])]));
  const path = body(
    symbolicRect((field) => new Scalar(['arg', 0, field])),
    symbols
  );
  const declaration = (parameters: Partial<Parameters>) => ({ $shape: { path, parameters: keys.map((key) => parameters[key] ?? defaults[key]) } });

  function Shape({ modifiers, style, testID, ...parameters }: Partial<Parameters> & SwiftUIViewProps) {
    const props = { shape: declaration(parameters as Partial<Parameters>), modifiers, style, testID } as unknown as CustomShapeProps;
    return <CustomShape {...props} />;
  }
  Shape.displayName = 'SwiftUI.Shape';
  Shape.with = declaration;
  Shape.path = ({ in: rect }: { in: CGRect }, parameters: Partial<Parameters> = {}) => {
    const [value, encodedRect] = encodeArguments([declaration(parameters), rect], 'Shape.path');
    return createPath(evaluateValue('$shapePath', value, 'path(in:)', [encodedRect]) as string);
  };
  Shape.$shape = declaration({}).$shape;
  return Shape as unknown as DeclaredShape<Parameters>;
}
