import type { PropsWithChildren } from 'react';
import { Portal } from 'src/components';
import styles from './FeedDetails.module.css';

type FeedDetailsProperties = PropsWithChildren<{
  data: Record<string, unknown>;
  isVisible: boolean;
  onClose(this: void): void;
}>;

function FeedDetails(properties: FeedDetailsProperties): JSX.Element | null {
  const { data, isVisible, onClose } = properties;
  return (
    isVisible
      ? (
        <Portal>
          <div className={styles.FeedDetails}>
            <div className={styles.FeedDetailsInner}>
              <p className={styles.FeedDetailsData}>
                {Object.values(data).flat().join(', ')}
              </p>
              <button
                className={styles.FeedDetailsClose}
                type="button"
                onClick={() => {
                  onClose();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </Portal>
      )
      : null
  );
}

export {
  FeedDetails,
};
