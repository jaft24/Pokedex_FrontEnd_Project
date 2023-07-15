import { pokemonNames } from "./pokemonNames";

export const pokemonIds: number[] = Array.from(
  { length: pokemonNames.length },
  (_, i) => i + 1
);
