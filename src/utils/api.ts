export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: { front_default: string };
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
  moves: { move: { name: string } }[];
}

export async function fetchPokemonList(
  offset: number = 0,
  limit: number = 20
): Promise<{
  results: PokemonListItem[];
  count: number;
}> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
      {
        next: { revalidate: 86400 },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch pokemon list");
    const data = await response.json();
    return data;
  } catch (error) {
    return { results: [], count: 0 };
  }
}

export async function fetchPokemonDetails(
  id: string
): Promise<PokemonDetails | null> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      next: { revalidate: 86400 },
    });
    if (!response.ok) throw new Error(`Failed to fetch pokemon with id ${id}`);
    return response.json();
  } catch (error) {
    return null;
  }
}

export async function searchPokemon(query: string): Promise<PokemonListItem[]> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`, {
      next: { revalidate: 86400 },
    });
    if (!response.ok)
      throw new Error("Failed to fetch pokemon list for search");
    const data = await response.json();
    return data.results.filter((pokemon: PokemonListItem) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    return [];
  }
}
