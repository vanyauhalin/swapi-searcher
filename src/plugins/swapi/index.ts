/**
 * This plugin has a lot of assertions, but that's fine.
 */

import { SCOPES, endpoints } from './endpoints';
import { generate as generateRest } from './rest';
import { generate as generateSearch } from './search';

const swapi = (() => {
  const rest = generateRest(endpoints);
  return {
    scopes: {
      list: SCOPES,
      get humanized() {
        return SCOPES.map((scope) => (
          `${scope.charAt(0).toUpperCase()}${scope.slice(1)}`
        ));
      },
    },
    rest,
    search: generateSearch(rest),
  };
})();

export {
  swapi,
};
