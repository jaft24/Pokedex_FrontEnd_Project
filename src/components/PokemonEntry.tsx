import usePokemon from "@/hooks/usePokemon";
import styles from "@/styles/PokemonEntry.module.css";
import { Spinner } from "react-bootstrap";
import Image from "next/image";
import { getPokemonImageUrl } from "@/image/pokemonImage";
import { typeHexColor } from "@/data/colors";
import { TypeButton } from "./FilterButtons";

function beautifyString(str: string): string {
  const words = str.split("-");
  const capitalizedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1);
    return firstLetter + restOfWord;
  });
  return capitalizedWords.join(" ");
}

//This function is exactly duplicated from the MoreFilters.tsx file that we just were looking at.
// I would recommend moving this to a shared file and importing it into both files.

export default function PokemonEntry({ name }: { name: string }) {
  //If you have access to the pokemon object, you can use it to get the id rather than the name.
  // it is always preferred to reference the id rather than other information about an object,
  // especially if this is the primary key that is used in the database (uuids would be another example).
  const { pokemon, pokemonLoading } = usePokemon(name);

  return (
    <div className={styles.entry}>
      {pokemonLoading && <Spinner animation="grow" />}
      {pokemon && (
        <div className={styles.card}>
          <Image
            src={getPokemonImageUrl(pokemon.id)}
            alt={"Pokemon: " + pokemon.name}
            width={190}
            height={190}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <small style={{ fontSize: "1", fontWeight: "lighter" }}>
                # 0{pokemon.id} &nbsp;{" "}
                {/*
                Here you are using a mixture of spaces and non-breaking spaces to get the spacing working
                I think its better to just handle this via CSS or choose one or the other.
                 */}
              </small>
            </div>
            <div>
              <p className="font-monospace text-center text-capitalize">
                {" " + pokemon.name}
                {/* Another examples of spacing that could be css rather than extra spaces*/}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 15,
              paddingBottom: "5%",
              marginTop: "-2%",
            }}
          >
            {pokemon.types.map((type) => (
                /*
                 Nice use of map.

                 I am noticing now that I've seen a few of these that every instance of
                 <TypeButton> is wrapped with the exact same div. Perhaps this all could
                 live inside of the same shared component?
                 */
              <div
                key={type.id}
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <TypeButton
                  typeName={beautifyString(type.type)}
                  typeColor={
                    typeHexColor.find((t) => t.type === type.type)?.color || ""
                  }
                  isSelected={false}
                  onClick={() => {}}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
