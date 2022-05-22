import { SCOPES } from './endpoints';

function randomizeString(): string {
  return Math.random().toString(36).slice(7);
}

function randomizeId(): string {
  return `${Math.floor(Math.random() * 10)}`;
}

function randomizeScope(): string {
  return SCOPES[Math.floor(Math.random() * SCOPES.length)] || '';
}

function generate(): unknown {
  return {
    count: 1,
    next: undefined,
    previous: undefined,
    results: [{
      birth_year: 'birth_year',
      created: 'created',
      edited: 'edited',
      eye_color: 'eye_color',
      films: ['first film', 'second film'],
      gender: 'gender',
      hair_color: 'hair_color',
      height: 'height',
      homeworld: 'homeworld',
      mass: 'mass',
      name: randomizeString(),
      skin_color: 'skin_color',
      species: ['species'],
      starships: ['starships'],
      url: `http://localhost:3000/${randomizeScope()}/${randomizeId()}/`,
      vehicles: ['vehicles'],
    }],
  };
}

export {
  generate,
};
