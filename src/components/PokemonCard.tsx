import Link from "next/link";
import { PokemonListItem } from "@/utils/api";

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const id = pokemon.url.split("/").filter(Boolean).pop();

  return (
    <Link
      href={`/pokemon/${id}`}
      className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
    >
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={pokemon.name}
        className="w-32 h-32 mx-auto"
      />
      <h2 className="text-xl font-semibold text-center capitalize">
        {pokemon.name}
      </h2>
    </Link>
  );
}
