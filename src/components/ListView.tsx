import React from "react";
import { Pokemon } from "../types";
import { capitalize } from "../utilities/commonFunctions";

interface ListViewProps {
  pokemonList: Pokemon[];
}

const ListView: React.FC<ListViewProps> = ({ pokemonList }) => (
  <div>
    {pokemonList.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <img
          src="https://media.comicbook.com/2019/08/detective-pikachu-1181657.jpeg?auto=webp&width=690&height=360&crop=690:360,smart" // Replace with a sad Pikachu image URL
          alt="No data found"
          className="w-24 h-24 mb-4"
        />
        <p className="text-lg font-semibold">No pokemon found</p>
      </div>
    ) : (
      pokemonList.map((pokemon, index) => (
        <div
          key={index}
          className="flex items-center bg-white p-4 shadow rounded mb-4 transition duration-300 ease-in-out transform hover:bg-gray-100 hover:shadow-lg"
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
              pokemon.url.split("/").slice(-2, -1)[0]
            }.png`}
            alt={pokemon.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="ml-4">{capitalize(pokemon.name)}</div>
        </div>
      ))
    )}
  </div>
);

export default ListView;
