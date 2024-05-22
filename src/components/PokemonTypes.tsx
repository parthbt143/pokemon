import React from "react";
import { PokemonType as PokemonTypeInterface } from "../types";
import { capitalize } from "../utilities/commonFunctions";

interface Props {
  pokemonTypes: PokemonTypeInterface[];
  selectedType: string;
  handleTypeClick: (type: string) => void;
}

const PokemonType: React.FC<Props> = ({
  pokemonTypes,
  selectedType,
  handleTypeClick,
}) => {
  return (
    <div
      className="w-1/4 bg-gray-200 p-4 overflow-y-auto"
      style={{ height: "100vh" }}
    >
      <h2 className="text-xl font-bold mb-4">Pokemon Types</h2>
      <ul>
        {pokemonTypes.map((type, index) => (
          <li
            key={index}
            className={`mb-2 p-2 cursor-pointer transition duration-300 ease-in-out ${
              selectedType === type.name
                ? "bg-blue-500 text-white rounded shadow"
                : "bg-white rounded"
            } hover:bg-blue-500 hover:text-white hover:shadow`}
            onClick={() => handleTypeClick(type.name)}
          >
            {capitalize(type.name)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonType;
