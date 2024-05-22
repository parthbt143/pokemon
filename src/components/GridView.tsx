import React from "react";
import { Pokemon } from "../types";
import { capitalize } from "../utilities/commonFunctions";

interface GridViewProps {
  pokemonList: Pokemon[];
}

const GridView: React.FC<GridViewProps> = ({ pokemonList }) => (
  <>
    {pokemonList.length === 0 ? (
      <div className="">
        <div className="flex flex-col items-center justify-center h-full w-full text-center">
          <img
            src="https://media.comicbook.com/2019/08/detective-pikachu-1181657.jpeg?auto=webp&width=690&height=360&crop=690:360,smart" // Replace with a sad Pikachu image URL
            alt="No Pokemon Found"
            className="w-24 h-24 mb-4"
          />
          <p className="text-lg font-semibold">No Pokemon Found</p>
        </div>
      </div>
    ) : (
      pokemonList.map((pokemon, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-white p-4 shadow rounded transition duration-300 ease-in-out transform hover:bg-gray-100 hover:shadow-lg"
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
              pokemon.url.split("/").slice(-2, -1)[0]
            }.png`}
            alt={pokemon.name}
            className="rounded-full object-cover"
            style={{ width: "100px", height: "100px" }}
          />
          <div className="text-center mt-2">{capitalize(pokemon.name)}</div>
        </div>
      ))
    )}
  </>
);

export default GridView;
