export const nameof = function<T>(name: Extract<keyof T, string>): string { return name };