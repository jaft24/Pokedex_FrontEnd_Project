import { Button } from "react-bootstrap";
import { TypeButton } from "./FilterButtons";
import { typeHexColor } from "@/data/colors";
import { eggGroupHexColor } from "@/data/colors";
import styles from "@/styles/SearchBar.module.css";
import { abilityList } from "@/data/abilities";
import { genusList } from "@/data/genus";

function beautifyString(str: string): string {
  const words = str.split("-");
  const capitalizedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1);
    return firstLetter + restOfWord;
  });
  return capitalizedWords.join(" ");
}

const maxHeight: number = 145;
const minWeight: number = 1;
const minHeight: number = 2;
const maxWeight: number = 9500;

function MoreFilters({
  selectedHeight,
  onSelectedHeightChange,
  selectedWeight,
  onSelectedWeightChange,
  selectedType,
  onSelectedTypeChange,
  selectedGenus,
  onSelectedGenusChange,
  selectedEggGroup,
  onSelectedEggGroupChange,
  selectedAbility,
  onSelectedAbilityChange,
  onClickAdvancedSearch,
  onClickClearFilters,
}: {
  selectedHeight: number | undefined;
  onSelectedHeightChange: any;
  selectedWeight: number | undefined;
  onSelectedWeightChange: any;
  selectedType: string | undefined;
  onSelectedTypeChange: any;
  selectedGenus: string | undefined;
  onSelectedGenusChange: any;
  selectedEggGroup: string | undefined;
  onSelectedEggGroupChange: any;
  selectedAbility: string | undefined;
  onSelectedAbilityChange: any;
  onClickAdvancedSearch: any;
  onClickClearFilters: any;
}) {
  const handleTypeButtonClick = (type: string) => {
    onSelectedTypeChange(type);
  };
  const handleEggButtonClick = (egg: string) => {
    onSelectedEggGroupChange(egg);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 261,
        gap: 12,
        margin: 10,
      }}
    >
      <i>
        {" "}
        <strong className={styles.outline}> Advacned Search </strong>{" "}
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
          value={selectedHeight ?? ""}
          className={styles.slider}
          onChange={(event) => {
            const selectedHeightValue = event.target.value;
            onSelectedHeightChange(selectedHeightValue);
          }}
          style={{
            height: 10,
          }}
        />
        <p style={{ marginBottom: "1%" }}>
          {" "}
          {selectedHeight ? selectedHeight * 10 : " - "} Cm
        </p>
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
          value={selectedWeight ?? ""}
          className={styles.slider}
          step="0.1"
          onChange={(event) => {
            const selectedWeightValue = event.target.value;
            onSelectedWeightChange(selectedWeightValue);
          }}
          style={{
            height: 10,
          }}
        />
        <p style={{ marginBottom: "1%" }}>
          {" "}
          {selectedWeight ? (selectedWeight / 10).toFixed(2) : " - "} Kg
        </p>
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
            onChange={(event) => {
              const selectedAbilityValue = event.target.value;
              onSelectedAbilityChange(selectedAbilityValue);
            }}
          >
            <option value={undefined}></option>
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
                isSelected={selectedEggGroup === egg.eggGroup}
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
            onChange={(event) => {
              const selectedGenusValue = event.target.value;
              onSelectedGenusChange(selectedGenusValue);
            }}
          >
            <option value={undefined}></option>
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
          <Button
            className={styles.custom_button}
            onClick={onClickClearFilters}
          >
            {" "}
            Clear Filters{" "}
          </Button>
        </div>

        <div>
          <Button
            className={styles.custom_button}
            onClick={onClickAdvancedSearch}
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
