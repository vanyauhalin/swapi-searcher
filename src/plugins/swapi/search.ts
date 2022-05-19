import type { Rest, Search } from 'types/swapi';

function generate(rest: Rest): Search {
  const SCOPE_LIMIT = 2;
  async function inner(parameters: Parameters<Search>[0]): ReturnType<Search> {
    const response = structuredClone(inner.defaults);
    await Promise.all(Object.values(rest).map(async (methods) => {
      const data = await methods.search(parameters);
      response.count += data.count;
      const sliced = data.results.slice(0, SCOPE_LIMIT) as never[];
      response.results.push(...sliced);
    }));
    return response;
  }
  inner.defaults = {
    count: 0,
    next: undefined,
    previous: undefined,
    results: [],
  };
  return inner;
}

export {
  generate,
};
