import type { PropsWithChildren } from 'react';
import css from './Layout.module.css';

function Layout(properties: PropsWithChildren<unknown>): JSX.Element {
  const { children } = properties;
  return (
    <main className={css.layout}>
      {children}
    </main>
  );
}

export {
  Layout,
};
