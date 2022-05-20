function merge(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export {
  merge,
};
