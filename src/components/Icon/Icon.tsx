import type { ComponentProps, ReactSVGElement } from 'react';
import { createElement } from 'react';

function SearchIcon(properties: ComponentProps<'svg'>): ReactSVGElement {
  return createElement('svg', {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    viewBox: '0 0 24 24',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
    ...properties,
  }, createElement('path', {
    d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }));
}

function XIcon(properties: ComponentProps<'svg'>): ReactSVGElement {
  return createElement('svg', {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    viewBox: '0 0 24 24',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
    ...properties,
  }, createElement('path', {
    d: 'M6 18L18 6M6 6l12 12',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }));
}

export {
  SearchIcon,
  XIcon,
};
