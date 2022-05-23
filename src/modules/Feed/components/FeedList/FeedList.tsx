import type { PropsWithChildren } from 'react';
import styles from './FeedList.module.css';

interface FeedListItemProperties {
  description: string;
  heading: string;
  onSelect(this: void): void;
}

function FeedListItem(properties: FeedListItemProperties): JSX.Element {
  const { description, heading, onSelect } = properties;
  return (
    <li className={styles.FeedItem}>
      <h2 className={styles.FeedItemHeading}>
        <button
          className={styles.FeedItemButton}
          type="button"
          onClick={() => {
            onSelect();
          }}
        >
          {heading}
        </button>
      </h2>
      <p className={styles.FeedItemDescription}>
        {description}
      </p>
    </li>
  );
}

type FeedListProperties = PropsWithChildren<unknown>;

function FeedList(properties: FeedListProperties): JSX.Element {
  const { children } = properties;
  return <ul className={styles.FeedList}>{children}</ul>;
}

export {
  FeedList,
  FeedListItem,
};
