import type {
  Endpoints,
  RequestParameters,
  RequestResponse,
  Rest,
  RestMethodResponse,
} from 'types/swapi';

function extractId(url: string): string {
  const id = url.match(/^.+\/(\d*)\/$/);
  return id && id[1] ? id[1] : '';
}

function extractScope(path: string): string {
  const matched = path.match(/^([\W\w]*)\/?.*?\//);
  if (!matched) return '';
  const [, scope] = matched;
  if (!scope) return '';
  return scope;
}

function parse(path: string, context: Record<string, unknown>): string {
  return path.replace(/{([^{}]+)}|([^{}]+)/g, (_, ...arguments_) => {
    const [expression, literal] = arguments_ as (string | undefined)[];
    const value = expression ? context[expression] || '' : literal;
    return typeof value === 'string'
      ? value.replace(/ /g, '%20')
      : value as string;
  });
}

function define(
  path: string,
): (parameters: RequestParameters) => Promise<RequestResponse> {
  const scope = extractScope(path);
  function modify(response: RestMethodResponse): void {
    response.id = extractId(response.url);
    response.scope = scope;
  }
  return async (parameters: RequestParameters): Promise<RequestResponse> => {
    const parsed = parse(path, parameters);
    const response = await fetch(`https://swapi.dev/api/${parsed}`);
    const json = await response.json() as RequestResponse;
    if (!json.results) {
      modify(json);
    } else if (json.results.length > 0) {
      for (const item of json.results) modify(item);
    }
    return json;
  };
}

function generate(endpoints: Endpoints): Rest {
  const rest = {} as Record<string, Record<string, unknown>>;
  for (const [scopeName, scopeEndpoints] of Object.entries(endpoints)) {
    let scope = rest[scopeName];
    if (!scope) scope = {};
    for (const [methodName, path] of Object.entries(scopeEndpoints)) {
      scope[methodName] = define(path);
    }
    rest[scopeName] = scope;
  }
  return rest as Rest;
}

export {
  generate,
};
