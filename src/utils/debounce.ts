interface Debounced<T extends unknown[]> {
  (...arguments_: T): void;
  cancel(): void;
}

/**
 * Simplified version of `@github/mini-throttle`.
 * @see https://github.com/github/mini-throttle
 */
function debounce<T extends unknown[]>(
  callback: (...arguments_: T) => unknown,
  wait = 0,
): Debounced<T> {
  let timer: ReturnType<typeof setTimeout>;
  let cancelled = false;
  function inner(this: unknown, ...arguments_: T): void {
    if (cancelled) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, arguments_);
    }, wait);
  }
  inner.cancel = () => {
    clearTimeout(timer);
    cancelled = true;
  };
  return inner;
}

export {
  debounce,
};
