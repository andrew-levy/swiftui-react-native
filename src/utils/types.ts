export type RemoveField<Type, Field extends string> = {
  [Property in keyof Type as Exclude<Property, Field>]: Type[Property];
};
