function capitalize<T extends string>(string: string): T {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}` as T;
}

export {
  capitalize,
};
