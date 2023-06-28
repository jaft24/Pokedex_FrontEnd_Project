export interface Pokemon {
    id: number;
    name: string;
    types: PokemonType[];
    height: number;
    weight: number;
    abilities: PokemonAbility[];
    eggGroups: PokemonEggGroup[];
    stat: PokemonStats;
    genus: string;
    description: string;
  }
  
  interface PokemonType {
    id: number;
    type: string;
  }
  
  interface PokemonAbility {
    id: number;
    ability: string;
  }
  
  interface PokemonEggGroup {
    id: number;
    eggGroup: string;
  }
  
  interface PokemonStats {
    id: number;
    hp: number;
    speed: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
  }