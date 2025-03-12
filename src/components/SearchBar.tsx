"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchPokemon } from "../utils/api";
import Modal from "./Modal";
import SearchResult from "./SearchResult";
import Spinner from "./Spinner";

export default function SearchBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: searchResults,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pokemonSearch", searchQuery],
    queryFn: () => searchPokemon(searchQuery),
    enabled: !!searchQuery,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSearchQuery("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative">
      <button
        onClick={handleOpenModal}
        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex cursor-pointer gap-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        Search
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="w-full flex justify-end">
          <button onClick={handleCloseModal} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search Pokemon... (Press Enter)"
            className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <div className="h-64 overflow-y-auto">
            {isLoading && (
              <div className="text-center p-2">
                <Spinner />
              </div>
            )}
            {isError && (
              <div className="text-center p-2 text-red-500 flex justify-center items-center">
                Error loading results.
              </div>
            )}
            {searchResults && searchResults.length > 0
              ? searchResults.map((pokemon) => (
                  <SearchResult key={pokemon.name} pokemon={pokemon} />
                ))
              : !isLoading && (
                  <p className="text-center p-2">No results found.</p>
                )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
