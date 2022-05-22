import type { PropsWithChildren } from 'react';

type FeedRootProperties = PropsWithChildren<unknown>;

function FeedRoot(properties: FeedRootProperties): JSX.Element {
  const { children } = properties;
  return <div>{children}</div>;
}

export {
  FeedRoot,
};
