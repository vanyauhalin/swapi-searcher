import type { Rest, Search, SearchResponse } from 'types/swapi';

function generate(rest: Rest): Search {
  const LIMIT = 2;
  const limits = Object.fromEntries(Object.keys(rest)
    .map((scope) => [scope, LIMIT]));
  function resetLimits(): void {
    for (const key of Object.keys(limits)) limits[key] = LIMIT;
  }
  return async (parameters) => {
    resetLimits();
    const results = [] as unknown[];
    await Promise.all(Object.entries(rest).map(async ([scope, methods]) => {
      if (!limits[scope]) return true;
      const data = await methods.search(parameters);
      results.push([scope, data.results.slice(0, limits[scope])]);
      limits[scope] = 0;
      return false;
    }));
    return results as SearchResponse;
  };
}

export {
  generate,
};
