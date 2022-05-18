/**
 * This plugin has a lot of assertions, but that's fine.
 */

import { SCOPES, endpoints } from './endpoints';
import { generate as generateRest } from './rest';
import { generate as generateSearch } from './search';

const swapi = (() => {
  const rest = generateRest(endpoints);
  return {
    SCOPES,
    rest,
    search: generateSearch(rest),
  };
})();

export {
  swapi,
};
