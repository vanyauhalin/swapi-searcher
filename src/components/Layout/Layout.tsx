import type { ComponentProps, ReactElement } from 'react';
import { createElement } from 'react';
import { merge } from 'src/utils';
import styles from './Layout.module.css';

function LayoutFooter(properties: ComponentProps<'footer'>): ReactElement {
  const { className, children } = properties;
  return createElement('footer', {
    ...properties,
    className: merge(styles.LayoutFooter, className),
  }, children);
}

function LayoutMain(properties: ComponentProps<'main'>): ReactElement {
  const { children, className } = properties;
  return createElement('main', {
    ...properties,
    className: merge(styles.LayoutMain, className),
  }, children);
}

function LayoutHeader(properties: ComponentProps<'header'>): ReactElement {
  const { children, className } = properties;
  return createElement('header', {
    ...properties,
    className: merge(styles.LayoutHeader, className),
  }, children);
}

function Layout(properties: ComponentProps<'div'>): ReactElement {
  const { children, className } = properties;
  return createElement('div', {
    ...properties,
    className: merge(styles.Layout, className),
  }, children);
}

export {
  Layout,
  LayoutFooter,
  LayoutHeader,
  LayoutMain,
};
