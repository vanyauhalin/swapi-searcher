/**
 * Simplified version of `@github/mini-throttle`.
 * @see https://github.com/github/mini-throttle
 */
function debounce<T extends unknown[]>(
  callback: (...arguments_: T) => unknown,
  wait = 0,
): {
    (...arguments_: T): void;
    cancel(): void;
  } {
  let timer: ReturnType<typeof setTimeout>;
  let cancelled = false;
  function fn(this: unknown, ...arguments_: T): void {
    if (cancelled) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, arguments_);
    }, wait);
  }
  fn.cancel = () => {
    clearTimeout(timer);
    cancelled = true;
  };
  return fn;
}

export {
  debounce,
};
