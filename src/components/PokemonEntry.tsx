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

export default function PokemonEntry({ name }: { name: string }) {
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
              </small>
            </div>
            <div>
              <p className="font-monospace text-center text-capitalize">
                {" " + pokemon.name}
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
