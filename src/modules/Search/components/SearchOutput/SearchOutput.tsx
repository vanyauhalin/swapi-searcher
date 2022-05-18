import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';
import { Portal, SearchIcon } from 'src/components';
import type { rest } from 'src/plugins';
import styles from './SearchOutput.module.css';

interface SearchOutputProperties {
  anchor: RefObject<HTMLElement>;
  content: Awaited<ReturnType<typeof rest.search>>;
  isVisible: boolean;
}

function SearchOutput(properties: SearchOutputProperties): JSX.Element | null {
  const { anchor, content, isVisible } = properties;
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
              {content.map((item) => (
                <li
                  className={styles.SearchOutputItem}
                  key={`${item.resource}${item.label}`}
                >
                  <SearchIcon className={styles.SearchOutputIcon} />
                  <a
                    className={styles.SearchOutputLink}
                    href="/details"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </output>
        </Portal>
      )
      : null
  );
}

export {
  SearchOutput,
};
