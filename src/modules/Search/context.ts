import { createContext } from 'react';

interface SearchResourceContextInstance {
  resource: string | undefined;
  resetResource(): void;
  setResource(value: string): void;
}

const searchResourceContext: SearchResourceContextInstance = {
  resource: undefined,
  resetResource() {},
  setResource() {},
};

const SearchResourceContext = createContext(searchResourceContext);

export {
  searchResourceContext,
  SearchResourceContext,
};
