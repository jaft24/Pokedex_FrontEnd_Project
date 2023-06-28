import usePokemon from "@/hooks/usePokemon";
import styles from "@/styles/PokemonEntry.module.css";
import { Spinner } from "react-bootstrap";
import Image from "next/image";
import { getPokemonImageUrl } from "@/image/pokemonImage";

export default function PokemonEntry({ name }: { name: string }) {
  const { pokemon, pokemonLoading } = usePokemon(name);

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

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
              <small># 0{pokemon.id + " "} </small>
            </div>
            <div>
              <p className="text-center text-capitalize">
                <i> {" " + pokemon.name}</i>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
