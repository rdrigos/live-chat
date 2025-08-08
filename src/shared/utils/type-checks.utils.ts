export function hasValue<T>(value?: T | null): value is T {
  return value !== undefined && value !== null;
}
