const baseURL = "https://pokeapi.co/api/v2/pokemon/";

interface PokemonListData {
  count: number;
  results: { name: string; url: string }[];
}

interface Pokemon {}

export const getPokemonData = <T, U>(
  url: string,
  callback: (data: U) => void,
  transform: (data: T) => U
) => {
  fetch(url, { method: "GET" })
    .then((response) => response.json())
    .then((data) => callback(transform(data)))
    .catch((error) => console.log(error));
};

export const getPokemonList = (callback: (data: any[]) => void) =>
  getPokemonData<PokemonListData, any[]>(
    baseURL,
    callback,
    (data: PokemonListData) => data.results.map((x: any) => x.name)
  );

export const getPokemon = (
  pokemonName: string,
  callback: (data: Pokemon) => void
) =>
  getPokemonData<Pokemon, Pokemon>(
    `${baseURL}${pokemonName}`,
    callback,
    (data: Pokemon) => data
  );
