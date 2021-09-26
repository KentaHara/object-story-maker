/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type Constructor<T> =
  | { new (...args: any): T }
  | ((...args: any[]) => T)
  | Function
