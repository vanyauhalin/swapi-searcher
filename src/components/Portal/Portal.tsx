import type { PropsWithChildren, ReactPortal } from 'react';
import { createPortal } from 'react-dom';

function Portal({ children }: PropsWithChildren<unknown>): ReactPortal {
  return createPortal(children, document.body);
}

export {
  Portal,
};
