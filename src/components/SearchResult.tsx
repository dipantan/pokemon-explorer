"use client";

import { PokemonListItem } from "../utils/api";
import { useRouter } from "next/navigation";

interface SearchResultProps {
  pokemon: PokemonListItem;
}

export default function SearchResult({ pokemon }: SearchResultProps) {
  const router = useRouter();
  const id = pokemon.url.split("/").filter(Boolean).pop() || "1";

  const handleClick = () => {
    router.push(`/pokemon/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
    >
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={pokemon.name}
        className="w-10 h-10"
      />
      <span className="capitalize">{pokemon.name}</span>
    </div>
  );
}
