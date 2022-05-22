type ValueOf<T> = T[keyof T];

/**
 * Plugin for interacting with SWAPI inspired Octokit.
 * @see https://github.com/octokit
 */
declare namespace Swapi {
  interface Search {
    (parameters: RestMethodsParameters['search']): Promise<SearchResponse>;
    defaults: SearchResponse;
  }
  type SearchResponse = RestMethodResponseWrapper<ValueOf<RestResponse>['search']['results'][0]>;
  type Rest = {
    films: {
      get(parameters: RestMethodsParameters['get']): Promise<RestResponse['films']['get']>;
      list(parameters: RestMethodsParameters['list']): Promise<RestResponse['films']['list']>;
      search(parameters: RestMethodsParameters['search']): Promise<RestResponse['films']['search']>;
    };
    people: {
      get(parameters: RestMethodsParameters['get']): Promise<RestResponse['people']['get']>;
      list(parameters: RestMethodsParameters['list']): Promise<RestResponse['people']['list']>;
      search(parameters: RestMethodsParameters['search']): Promise<RestResponse['people']['search']>;
    };
    planets: {
      get(parameters: RestMethodsParameters['get']): Promise<RestResponse['planets']['get']>;
      list(parameters: RestMethodsParameters['list']): Promise<RestResponse['planets']['list']>;
      search(parameters: RestMethodsParameters['search']): Promise<RestResponse['planets']['search']>;
    };
    species: {
      get(parameters: RestMethodsParameters['get']): Promise<RestResponse['species']['get']>;
      list(parameters: RestMethodsParameters['list']): Promise<RestResponse['species']['list']>;
      search(parameters: RestMethodsParameters['search']): Promise<RestResponse['species']['search']>;
    };
    starships: {
      get(parameters: RestMethodsParameters['get']): Promise<RestResponse['starships']['get']>;
      list(parameters: RestMethodsParameters['list']): Promise<RestResponse['starships']['list']>;
      search(parameters: RestMethodsParameters['search']): Promise<RestResponse['starships']['search']>;
    };
    vehicles: {
      get(parameters: RestMethodsParameters['get']): Promise<RestResponse['vehicles']['get']>;
      list(parameters: RestMethodsParameters['list']): Promise<RestResponse['vehicles']['list']>;
      search(parameters: RestMethodsParameters['search']): Promise<RestResponse['vehicles']['search']>;
    };
  };
  type RestMethodsParameters = {
    get: {
      id: string;
    };
    list: {
      page: number;
    };
    search: {
      query: string;
    };
  };
  type RestResponse = RestMethodsResponse<{
    films: {
      characters: string[];
      director: string;
      episode_id: number;
      opening_crawl: string;
      planets: string[];
      producer: string;
      release_date: string;
      species: string[];
      starships: string[];
      title: string;
      vehicles: string[];
    };
    people: {
      birth_year: string;
      eye_color: string;
      films: string[];
      gender: string;
      hair_color: string;
      height: string;
      homeworld: string;
      mass: string;
      name: string;
      skin_color: string;
      species: string[];
      starships: string[];
      vehicles: string[];
    };
    planets: {
      climate: string;
      diameter: string;
      films: string[];
      gravity: string;
      name: string;
      orbital_period: string;
      population: string;
      residents: string[];
      rotation_period: string;
      surface_water: string;
      terrain: string;
    };
    species: {
      average_height: string;
      average_lifespan: string;
      classification: string;
      designation: string;
      eye_colors: string;
      films: string[];
      hair_colors: string;
      homeworld: string;
      language: string;
      name: string;
      people: string[];
      skin_colors: string;
    };
    starships: {
      MGLT: string;
      cargo_capacity: string;
      consumables?: string;
      cost_in_credits: string;
      crew: string;
      films: string[];
      hyperdrive_rating: string;
      length: string;
      manufacturer: string;
      max_atmosphering_speed: string;
      model: string;
      name: string;
      passengers: string;
      pilots: string[];
      starship_class: string;
    };
    vehicles: {
      cargo_capacity: string;
      consumables?: string;
      cost_in_credits: string;
      crew: string;
      films: string[];
      length: string;
      manufacturer: string;
      max_atmosphering_speed: string;
      model: string;
      name: string;
      passengers: string;
      pilots: string[];
      vehicle_class: string;
    };
  }>;
  type RestMethodsResponse<T extends Record<string, unknown>> = {
    [K in keyof T]: {
      get: T[K] & RestMethodResponse;
      list: RestMethodResponseWrapper<T[K] & RestMethodResponse>;
      search: RestMethodResponseWrapper<T[K] & RestMethodResponse>;
    }
  };
  type RestMethodResponseWrapper<T> = {
    count: number;
    next: string | undefined;
    previous: null | undefined;
    results: T[] | [];
  };
  /**
   * It's somewhat wrong to add `name` and `title` to this type, but don't see
   * any other way out.
   */
  type RestMethodResponse = {
    created: string;
    edited: string;
    id: string;
    name?: string;
    scope: keyof Rest;
    title?: string;
    url: string;
  };
  /**
   * List of endpoints that will be added into `Rest` property.
   */
  type Endpoints = {
    [scopeName: string]: {
      [methodName: string]: string;
    };
  };
  type RequestParameters = {
    [parameter: string]: unknown;
  };
  /**
   * Not entirely true, because instead of `&` should be `|`.
   */
  type RequestResponse = RestMethodResponseWrapper<RestMethodResponse> & RestMethodResponse;
}

export = Swapi;
