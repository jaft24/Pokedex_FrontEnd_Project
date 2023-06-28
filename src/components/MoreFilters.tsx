import { Button } from "react-bootstrap";
import { TypeButton } from "./FilterButtons";
import { typeHexColor } from "@/data/colors";
import { eggGroupHexColor } from "@/data/colors";
import styles from "@/styles/SearchBar.module.css";
import { useState } from "react";
import { abilityList } from "@/data/abilities";
import { genusList } from "@/data/genus";
import { Pokemon } from "@/models/pokemon";
import { combinedPokemonFilter } from "@/network/pokemonApi";

function beautifyString(str: string): string {
  const words = str.split("-");
  const capitalizedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1);
    return firstLetter + restOfWord;
  });
  return capitalizedWords.join(" ");
}

const maxHeight: number = 1450;
const minWeight: number = 0.1;
const minHeight: number = 20;
const maxWeight: number = 950;

const resetState = {
  heightSliderValue: null,
  weightSliderValue: null,
  selectedType: null,
  selectedEgg: null,
  selectedAbility: "",
  selectedGenus: "",
};

function MoreFilters() {
  const [heightSliderValue, setHeightSliderValue] = useState<number | null>(70);
  const [weightSliderValue, setWeightSliderValue] = useState<number | null>(
    6.9
  );
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedEgg, setSelectedEgg] = useState<string | null>(null);
  const [selectedAbility, setSelectedAbility] = useState("");
  const [selectedGenus, setSelectedGenus] = useState("");

  const [matchedPokemon, setMatchedPokemon] = useState<Pokemon[]>([]);

  const handleTypeButtonClick = (type: string) => {
    setSelectedType(type);
  };

  const handleEggButtonClick = (egg: string) => {
    setSelectedEgg(egg);
  };

  const handleAdvacnedSearch = async () => {
    console.log(heightSliderValue);
    console.log(weightSliderValue);
    console.log(selectedType);
    console.log(selectedEgg);
    console.log(selectedAbility);
    console.log(selectedGenus);
  };

  const handleClearFilter = () => {
    setHeightSliderValue(resetState.heightSliderValue);
    setWeightSliderValue(resetState.weightSliderValue);
    setSelectedType(resetState.selectedType);
    setSelectedEgg(resetState.selectedEgg);
    setSelectedAbility(resetState.selectedAbility);
    setSelectedGenus(resetState.selectedGenus);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 260,
        gap: 12,
        margin: 10,
      }}
    >
      <i>
        {" "}
        <strong> Advacned Search </strong>{" "}
      </i>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Height:{" "}
        <input
          type="range"
          min={minHeight}
          max={maxHeight}
          value={heightSliderValue ?? ""}
          className={styles.slider}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setHeightSliderValue(parseInt(e.target.value));
          }}
          style={{
            height: 10,
          }}
        />
        <p style={{ marginBottom: "1%" }}> {heightSliderValue ?? " -- "} Cm</p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Weight:{" "}
        <input
          type="range"
          min={minWeight}
          max={maxWeight}
          value={weightSliderValue ?? ""}
          className={styles.slider}
          step="0.1"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setWeightSliderValue(parseFloat(e.target.value));
          }}
          style={{
            height: 10,
          }}
        />
        <p style={{ marginBottom: "1%" }}> {weightSliderValue ?? " -- "} Kg</p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Type:</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(5, 1fr)",
            gap: 10,
          }}
        >
          {typeHexColor.map((type) => (
            <div
              key={type.id}
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <TypeButton
                typeName={beautifyString(type.type)}
                typeColor={type.color}
                isSelected={selectedType === type.type}
                onClick={() => handleTypeButtonClick(type.type)}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginRight: "auto",
        }}
      >
        <div>Ability:</div>
        <div style={{ marginLeft: "5%" }}>
          <select
            className={styles.input_wrapper}
            style={{
              width: "100%",
            }}
            value={selectedAbility}
            onChange={(event) => setSelectedAbility(event.target.value)}
          >
            <option value={""}></option>
            {abilityList.map((ability) => (
              <option value={ability.ability} key={ability.id}>
                {beautifyString(ability.ability)}
              </option>
            ))}
          </select>{" "}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Egg:</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(5, 1fr)",
            gap: 10,
          }}
        >
          {eggGroupHexColor.map((egg) => (
            <div
              key={egg.id}
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <TypeButton
                typeName={beautifyString(egg.eggGroup)}
                typeColor={egg.color}
                isSelected={selectedEgg === egg.eggGroup}
                onClick={() => handleEggButtonClick(egg.eggGroup)}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginRight: "auto",
        }}
      >
        <div> Genus: </div>
        <div style={{ marginLeft: "5%" }}>
          <select
            className={styles.input_wrapper}
            style={{
              width: "100%",
            }}
            value={selectedGenus}
            onChange={(event) => setSelectedGenus(event.target.value)}
          >
            <option value={""}></option>
            {genusList.map((genus) => (
              <option value={genus.genus} key={genus.id}>
                {beautifyString(genus.genus)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Button className={styles.custom_button} onClick={handleClearFilter}>
            {" "}
            Clear Filters{" "}
          </Button>
        </div>

        <div>
          <Button
            className={styles.custom_button}
            onClick={handleAdvacnedSearch}
          >
            {" "}
            🔍 Search{" "}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MoreFilters;
