import BackButton from "@/components/BackButton";
import { fetchPokemonDetails, fetchPokemonList } from "@/utils/api";

interface PokemonDetailProps {
  params: { id: string };
}

export default async function PokemonDetail({ params }: PokemonDetailProps) {
  const pokemon = await fetchPokemonDetails(params.id);

  if (!pokemon) {
    return (
      <div className="container mx-auto p-4">
        <BackButton />
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-center capitalize mb-4">
            Pokemon not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <BackButton />
      <div className="bg-white p-6 rounded-lg shadow">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-48 h-48 mx-auto"
        />
        <h1 className="text-3xl font-bold text-center capitalize mb-4">
          {pokemon.name}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold">Abilities</h2>
            <ul className="list-disc pl-5">
              {pokemon.abilities.map((ability) => (
                <li key={ability.ability.name} className="capitalize">
                  {ability.ability.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Types</h2>
            <ul className="list-disc pl-5">
              {pokemon.types.map((type) => (
                <li key={type.type.name} className="capitalize">
                  {type.type.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Stats</h2>
            <ul className="list-disc pl-5">
              {pokemon.stats.map((stat) => (
                <li key={stat.stat.name} className="capitalize">
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Moves (Top 5)</h2>
            <ul className="list-disc pl-5">
              {pokemon.moves.slice(0, 5).map((move) => (
                <li key={move.move.name} className="capitalize">
                  {move.move.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const pokemonList = await fetchPokemonList();
  return pokemonList.results.map((pokemon) => ({
    id: pokemon.url.split("/").filter(Boolean).pop()!,
  }));
}
