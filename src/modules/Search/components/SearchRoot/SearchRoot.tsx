import type { ComponentProps, ReactElement, SyntheticEvent } from 'react';
import { createElement } from 'react';
import { merge } from 'src/utils';
import styles from './SearchRoot.module.css';

interface SearchRootProperties extends ComponentProps<'form'> {
  onSubmit(this: void): void;
}

function SearchRoot(properties: SearchRootProperties): ReactElement {
  const { children, className, onSubmit } = properties;
  return createElement('form', {
    ...properties,
    className: merge(styles.SearchRoot, className),
    onSubmit(event: SyntheticEvent) {
      event.preventDefault();
      onSubmit();
    },
  }, children);
}

export {
  SearchRoot,
};
