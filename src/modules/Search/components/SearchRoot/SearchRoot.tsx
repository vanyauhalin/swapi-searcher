import type { ComponentProps, ReactElement } from 'react';
import { createElement } from 'react';
import { merge } from 'src/utils';
import styles from './SearchRoot.module.css';

function SearchRoot(properties: ComponentProps<'form'>): ReactElement {
  const { className, children } = properties;
  return createElement('form', {
    ...properties,
    className: merge(styles.SearchRoot, className),
  }, children);
}

export {
  SearchRoot,
};
