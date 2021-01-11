type TypeConstructor =
  | StringConstructor
  | NumberConstructor
  | DateConstructor
  | BooleanConstructor;

export const requireType = (type: TypeConstructor) => {
  return { type: type, required: true };
};
