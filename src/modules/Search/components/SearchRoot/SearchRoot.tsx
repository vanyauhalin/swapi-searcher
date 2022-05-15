import type { PropsWithChildren } from 'react';
import styles from './SearchRoot.module.css';

function SearchRoot({ children }: PropsWithChildren<unknown>): JSX.Element {
  return (
    <form className={styles.Search}>
      {children}
    </form>
  );
}

export {
  SearchRoot,
};
