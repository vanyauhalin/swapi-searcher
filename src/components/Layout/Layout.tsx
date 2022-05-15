import type { PropsWithChildren } from 'react';
import css from './Layout.module.css';

function Layout({ children }: PropsWithChildren<{}>): JSX.Element {
  return (
    <main className={css.layout}>
      {children}
    </main>
  );
}

export {
  Layout,
};
