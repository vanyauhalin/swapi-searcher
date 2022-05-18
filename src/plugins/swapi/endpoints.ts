import type { Endpoints } from 'types/swapi';

const SCOPES = [
  'films',
  'people',
  'planets',
  'species',
  'starships',
  'vehicles',
];

const endpoints = Object.fromEntries(SCOPES.map((scope) => [scope, {
  get: `${scope}/{id}`,
  list: scope,
  search: `${scope}/?search={query}`,
}])) as Endpoints;

export {
  SCOPES,
  endpoints,
};
