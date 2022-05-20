import type { ComponentType, LazyExoticComponent } from 'react';
import { lazy as defaultLazy } from 'react';

type Component = ComponentType<unknown>;

/**
 * Wrapper for the `React.lazy()` to follow the `import/no-default-export` rule.
 * Path must match the `src/<PascalCase>` mask.
 */
function lazy(path: string): LazyExoticComponent<Component> {
  const matched = path.match(/^src\/[\W\w]+\/([\W\w]*)/);
  if (!matched) throw new Error(`Invalid path: ${path}`);
  const [, name] = matched;
  if (!name) throw new Error(`Component name not in path: ${path}`);
  return defaultLazy(async () => {
    // Omit the type checking, since it's done inside the `React.lazy()`.
    const module = await import(
      `../../${path}/${name}.tsx`
    ) as Record<string, Component>;
    const component = module[name] as Component;
    return {
      default: component,
    };
  });
}

export {
  lazy,
};
