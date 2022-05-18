const BASE_URL = 'https://swapi.dev/api/';

type Resources =
  | 'films'
  | 'people'
  | 'planets'
  | 'species'
  | 'starships'
  | 'vehicles';

const resources = [
  'films',
  'people',
  'planets',
  'species',
  'starships',
  'vehicles',
];

interface ResourcesMethodResult {
  results: {
    name?: string;
    title?: string;
    url: string;
  }[];
}

type ResourcesMethod<ResultItem> = {
  get(id: string): Promise<ResultItem>;
  list(): Promise<ResultItem>;
  search(query: string): Promise<ResultItem>;
};

const rest = {
  resources: Object.fromEntries(resources.map((resource) => ([resource, {
    async get(id) {
      const result = await fetch(`${BASE_URL}/${resource}/${id}`);
      return result.json();
    },
    async list() {
      const result = await fetch(`${BASE_URL}/${resource}/`);
      return result.json();
    },
    async search(query) {
      const result = await fetch(`${BASE_URL}/${resource}/?search=${query}`);
      return result.json();
    },
  }]))) as {
    [key in Resources]: ResourcesMethod<ResourcesMethodResult>;
  },
  async search(query: string): Promise<{
    id: string;
    label: string;
    resource: Resources;
  }[]> {
    const limits = Object.fromEntries(resources
      .map((resource) => [resource, 2])) as Record<Resources, number>;
    const result = [] as Awaited<ReturnType<typeof rest.search>>;

    await Promise.all(Object.entries(rest.resources)
      .map(async ([key, value]) => {
        const data = await value.search(query);
        if (data.results.length > 0) {
          data.results.some((item) => {
            if (!limits[key as Resources]) return true;
            const id = item.url.match(/^.+\/(\d*)\/$/);
            result.push({
              label: item.name || item.title || '',
              resource: key as Resources,
              id: id && id[1] ? id[1] : '',
            });
            limits[key as Resources] -= 1;
            return false;
          });
        }
      }));

    return result;
  },
};

export {
  rest,
};
