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

// The above code isn't wrong by any means, but I wanted to give an example
// of how much this thing can be consolidated if you would like to.

//const beautifyString = (str: string) =>
//   str.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

// Additionally, I prefer to use arrow functions for this kind of thing
// rather than regular functions,here is a bit of information about them
// https://www.freecodecamp.org/news/the-difference-between-arrow-functions-and-normal-functions/

const maxHeight: number = 145;
const minWeight: number = 1;
const minHeight: number = 2;
const maxWeight: number = 9500;

//  Again, more about using arrow functions, this article is specific to react:
//  https://www.robinwieruch.de/react-function-component/

// Would look something like this
// const MoreFilters = ({ ... }) => { ... }
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

  /*

    There are a couple points I want to linger on here.

    I don't believe that you should be using the any type here, any is basically
    ignoring all type checking and circumventing the entire point of using typescript.
    From a quick glance it looks like all of these would be functions passed down from the
    parent.

    Additionally there is a ton of information being passed down from the parent as props. It's not
    a hard rule, but I like to keep my components as segregated as possible. Passing many
    functions down from one component to another is a sign that the components are too closely
    coupled.

    This one I'm not certain on since I don't use TypeScript in my day-to-day, but I believe
    that this pattern of using a union type with undefined in the second half for every
    single variable is a bit of a code smell. Ideally you would want only want to render this
    component if it actually has all of the expected data. I think this may also reduce some
    potentially bugginess.
   */

}) {
  const handleTypeButtonClick = (type: string) => {
    onSelectedTypeChange(type);
  };
  const handleEggButtonClick = (egg: string) => {
    onSelectedEggGroupChange(egg);
  };

  /*
   In both of the above functions you could specify void since nothing is returned, like this:

      const handleEggButtonClick = (egg: string) : void => {
        onSelectedEggGroupChange(egg);
      };

   However, I don't believe that either of these functions are necessary. All they are doing
   right now is just wrapping the function passed down by the parent. It would be better to
   just use the function passed down by the parent directly in the code below.
   */

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
          {/* More instances of the bracket spacing that should be removed. */}
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
            /*
            A couple things here, I would remove the const here and just pass the value directly
            through instead of creating another variable as its a little mor concise and the function
            is already descriptively named. You could also use a void type here since nothing is returned.
             */
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

            /* Same critique here as the onChange I highlighted above */

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
            {/*
            Since you are mapping over the types here you could create your own
            typeHexColor type and then define it below
            */}
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
              // Same critique here as the onChange I highlighted above
            }}
          >
              {/* Did you mean to leave the below option in with a value of undefined? */}

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
              //Just as I noted above with the type colors, these could be types as well.
              // type button might be able to take one of these types as a prop too
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
                // Same critique here as the onChange I highlighted above
            }}
          >
            <option value={undefined}></option>
              {/* Another unused <option> */}
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
