import type {
  Endpoints,
  RequestParameters,
  RequestResponse,
  Rest,
  RestMethodResponse,
} from 'types/swapi';
import { generate as generateData } from './data';

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

async function request(slug: string): Promise<RequestResponse> {
  try {
    const response = await fetch(`https://swapi.dev/api/${slug}`);
    const json = await response.json() as RequestResponse;
    return json;
  } catch {
    // Super unsafe but I have no choice.
    const data = generateData() as RequestResponse;
    if (slug.includes('search')) return data;
    return data.results[0] as RequestResponse;
  }
}

function define(
  path: string,
): (parameters: RequestParameters) => Promise<RequestResponse> {
  const scope = extractScope(path);
  function modify(response: RestMethodResponse): void {
    response.id = extractId(response.url);
    response.scope = scope as keyof Rest;
  }
  return async (parameters: RequestParameters): Promise<RequestResponse> => {
    const parsed = parse(path, parameters);
    const response = await request(parsed);
    if (!response.results) {
      modify(response);
    } else if (response.results.length > 0) {
      for (const item of response.results) modify(item);
    }
    return response;
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
