import type { PropsWithChildren, ReactPortal } from 'react';
import { createPortal } from 'react-dom';

function Portal(properties: PropsWithChildren<unknown>): ReactPortal {
  const { children } = properties;
  return createPortal(children, document.body);
}

export {
  Portal,
};
