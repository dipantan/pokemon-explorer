"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "../utils/api";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";

export default function Home() {
  const [page, setPage] = useState(1);
  const limit = 12;
  const offset = (page - 1) * limit;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemonList", offset, limit],
    queryFn: () => fetchPokemonList(offset, limit),
  });

  const totalPages = data?.count ? Math.ceil(data.count / limit) : 1;

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 justify-center items-center">
        <h1 className="text-3xl font-bold text-center mb-6">
          Pokemon Explorer
        </h1>
        <Spinner />
      </div>
    );
  }

  if (isError)
    return <div className="text-center p-4">Error loading Pokemon data.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Pokemon Explorer</h1>
      <div className="mb-4 flex w-full justify-end">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.results.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200 cursor-pointer"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
