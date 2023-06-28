// #Instead of using constant numbers render this to read the max, min, Height and Weight from full list

// const findMaxHeight = async (
//   pokemonList: Pokemon[],
//   purpose: string
// ): Promise<number> => {
//   let maxHeight = 0;
//   let maxWeight = 0;
//   let minHeight = 0;
//   let minWeight = 0;

//   if (purpose == "getMaxHeight") {
//     for (const pokemon of pokemonList) {
//       if (pokemon.height > maxHeight) {
//         maxHeight = pokemon.height;
//       }
//     }
//     return maxHeight * 10; // convert to Cm
//   } else if (purpose == "getMaxWeight") {
//     for (const pokemon of pokemonList) {
//       if (pokemon.weight > maxWeight) {
//         maxWeight = pokemon.weight;
//       }
//     }
//     return maxWeight / 10; // convert to Kg
//   }

//   return 1;
// };

// const maxHeight: number = await findMaxHeight(
//   await getAllPokemonList(),
//   "getMaxHeight"
// );
// const maxWeight: number = await findMaxHeight(
//   await getAllPokemonList(),
//   "getMaxWeight"
// );