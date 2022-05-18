import type { PropsWithChildren } from 'react';
import styles from './SearchRoot.module.css';

function SearchRoot(properties: PropsWithChildren<unknown>): JSX.Element {
  const { children } = properties;
  return (
    <form className={styles.Search}>
      {children}
    </form>
  );
}

export {
  SearchRoot,
};
