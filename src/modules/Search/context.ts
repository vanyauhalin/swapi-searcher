interface SearchContextInstance {
  scope: string | undefined;
  resetScope(): void;
  setScope(scope: string): void;
}

const searchContext: SearchContextInstance = {
  scope: undefined,
  resetScope() {},
  setScope() {},
};

export {
  searchContext,
};
