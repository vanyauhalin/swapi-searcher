import type { PropsWithChildren, RefObject } from 'react';
import { useEffect, useRef } from 'react';
import { Portal, SearchIcon } from 'src/components';
import styles from './SearchOutput.module.css';

interface SearchOutputItemProperties {
  label: string;
}

function SearchOutputItem(properties: SearchOutputItemProperties): JSX.Element {
  const { label } = properties;
  return (
    <li className={styles.SearchOutputItem}>
      <SearchIcon className={styles.SearchOutputIcon} />
      <a
        className={styles.SearchOutputLink}
        href="/details"
      >
        {label}
      </a>
    </li>
  );
}

type SearchOutputProperties = PropsWithChildren<{
  anchor: RefObject<HTMLElement>;
  isVisible: boolean;
}>;

function SearchOutput(properties: SearchOutputProperties): JSX.Element | null {
  const { anchor, children, isVisible } = properties;
  const output = useRef<HTMLOutputElement>(null);

  useEffect(() => {
    if (!isVisible) return;
    if (output.current && anchor.current) {
      const anchorRect = anchor.current.getBoundingClientRect();
      output.current.style.top = `${anchorRect.bottom}px`;
      output.current.style.left = `${anchorRect.left}px`;
      output.current.style.right = `${document.documentElement
        .clientWidth - anchorRect.right}px`;
    }
  }, [anchor, isVisible]);

  return (
    isVisible
      ? (
        <Portal>
          <output
            className={styles.SearchOutput}
            ref={output}
          >
            <hr className={styles.SearchOutputLine} />
            <ul className={styles.SearchOutputList}>
              {children}
            </ul>
          </output>
        </Portal>
      )
      : null
  );
}

export {
  SearchOutput,
  SearchOutputItem,
};
