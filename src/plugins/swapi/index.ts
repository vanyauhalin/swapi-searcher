/**
 * This plugin has a lot of assertions, but that's fine.
 */

import { capitalize } from 'src/utils';
import { SCOPES, endpoints } from './endpoints';
import { generate as generateRest } from './rest';
import { generate as generateSearch } from './search';

const swapi = (() => {
  const rest = generateRest(endpoints);
  return {
    scopes: {
      list: SCOPES,
      get humanized() {
        return SCOPES.map((scope) => capitalize(scope));
      },
    },
    rest,
    search: generateSearch(rest),
  };
})();

export {
  swapi,
};
