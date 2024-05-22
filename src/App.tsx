import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SkeletonLoader from "./components/SkeletonLoader";
import ListView from "./components/ListView";
import GridView from "./components/GridView";
import PokemonTypes from "./components/PokemonTypes";
import { Pokemon, PokemonType } from "./types";
import { capitalize } from "./utilities/commonFunctions";

const App: React.FC = () => {
  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([]);
  const [selectedType, setSelectedType] = useState<string>("All");
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [viewType, setViewType] = useState<string>("grid");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [next, setNext] = useState<boolean>(false);
  const [prev, setPrev] = useState<boolean>(false);

  const limit = 21;

  useEffect(() => {
    const fetchPokemonTypes = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/type");
        const { results } = response.data;
        setPokemonTypes([{ name: "All", url: "" }, ...results]);
      } catch (error) {
        console.error("Error fetching Pokemon types:", error);
      }
    };

    fetchPokemonTypes();
  }, []);

  const fetchData = useCallback(
    async (type: string, signal: AbortSignal) => {
      try {
        setIsLoading(true);
        let pokemonListResponse = [];
        const params = { offset: currentPage * limit, limit };
        if (type === "All") {
          const response = await axios.get(
            "https://pokeapi.co/api/v2/pokemon",
            { params, signal }
          );
          pokemonListResponse = response.data.results;
          setPrev(!!response.data.previous);
          setNext(!!response.data.next);
        } else {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/type/${type}`,
            { params, signal }
          );
          pokemonListResponse = response.data.pokemon.map(
            (obj: { pokemon: Pokemon }) => obj.pokemon
          );
          setPrev(currentPage != 0);
          setNext(currentPage * limit + limit < pokemonListResponse.length);
          pokemonListResponse = pokemonListResponse.splice(
            currentPage * limit,
            limit
          );
        }
        setPokemonList(pokemonListResponse);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching Pokemon list:", error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchData(selectedType, controller.signal);
    return () => {
      controller.abort();
    };
  }, [selectedType, fetchData, currentPage]);

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
    setCurrentPage(0);
  };

  return (
    <div className="min-h-screen flex">
      <PokemonTypes
        pokemonTypes={pokemonTypes}
        selectedType={selectedType}
        handleTypeClick={handleTypeClick}
      />
      <div className="w-3/4 p-4 overflow-y-auto" style={{ height: "100vh" }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {capitalize(selectedType)} Pokemons
          </h2>
          <div>
            <button
              className={`mr-2 px-4 py-2 rounded ${
                viewType === "grid"
                  ? "bg-blue-500 text-white shadow"
                  : "bg-gray-200"
              }`}
              onClick={() => setViewType("grid")}
            >
              Grid View
            </button>
            <button
              className={`px-4 py-2 rounded ${
                viewType === "list"
                  ? "bg-blue-500 text-white shadow"
                  : "bg-gray-200"
              }`}
              onClick={() => setViewType("list")}
            >
              List View
            </button>
          </div>
        </div>
        <div
          className={`grid gap-4 ${
            viewType === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : ""
          }`}
        >
          {isLoading ? (
            <SkeletonLoader viewType={viewType} />
          ) : viewType === "grid" ? (
            <GridView pokemonList={pokemonList} />
          ) : (
            <ListView pokemonList={pokemonList} />
          )}
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={prev == false}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={next == false}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
