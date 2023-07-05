export function isString(value: any) {
  return typeof value === 'string';
}
export function isArray(value: any) {
  return Array.isArray(value);
}
export function isObject(value: any) {
  return typeof value === 'object' && !isNull(value) && !isArray(value);
}
export function isNull(value: any) {
  return typeof value === 'object' && value === null;
}
export function isNaNCheck(value: any) {
  return typeof value === 'number' && isNaN(value);
}
export function isUndefined(value: any) {
  return typeof value === 'undefined';
}
export function isBool(value: any) {
  return typeof value === 'boolean';
}
export function isBoolean(value: any) {
  return isBool(value);
}
export function isInfinity(value: any) {
  return typeof value === 'number' && Math.abs(value) === Infinity;
}
export function isNumber(value: any) {
  return (
    typeof value === 'number' &&
    !isNaNCheck(value) &&
    Math.abs(value) !== Infinity
  );
}
export function isPosNumber(value: any) {
  return isNumber(value) && value > 0;
}
export function isNegNumber(value: any) {
  return isNumber(value) && value < 0;
}
export function isFunction(value: any) {
  return typeof value === 'function';
}
