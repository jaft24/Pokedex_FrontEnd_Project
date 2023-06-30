import { useRouter } from "next/router";
import useSWR from "swr";
import * as PokemonApi from "@/network/pokemonApi";
import Head from "next/head";
import Image from "next/image";
import { getPokemonImageUrl } from "@/image/pokemonImage";
import { Button, Spinner } from "react-bootstrap";
import Color from "color-thief-react";
import Link from "next/link";
import { useEffect } from "react";

export default function PokemonDetailsPage() {
  const router = useRouter();

  const pokemonName = router.query.pokemon?.toString() || "";

  const previousPage = router.query.page
    ? parseInt(router.query.page.toString())
    : 1;

  const currentPage = parseInt(router.query.page?.toString() || "1");

  const { data: pokemon, isLoading: pokemonLoading } = useSWR(
    pokemonName,
    PokemonApi.getPokemon
  );

  const { data, isLoading } = useSWR(["getPokemonPage", currentPage], () =>
    PokemonApi.getPokemonPage({ page: currentPage })
  );

  const { data: previousPokemon } = useSWR(
    pokemon && pokemon.id > 1 ? String(pokemon?.id - 1) : null,
    PokemonApi.getPokemonbyId
  );

  const { data: nextPokemon } = useSWR(
    data && pokemon && pokemon?.id < data?.totalElements
      ? String(pokemon?.id + 1)
      : null,
    PokemonApi.getPokemonbyId
  );

  function handlePreviousPokemon() {
    if (previousPokemon) {
      router.push(`/${previousPokemon.name}?page=${currentPage}`);
    }
  }

  function handleNextPokemon() {
    if (nextPokemon) {
      router.push(`/${nextPokemon.name}?page=${currentPage}`);
    }
  }

  return (
    <>
      <Head>{pokemon && <title> {pokemon.name} </title>}</Head>

      <div className="d-flex flex-column align-items-center mt-4">
        <p>
          <Link href={{ pathname: "/", query: { page: previousPage } }}>
            <Button className="link-light"> ← Back To PokéDex List </Button>
          </Link>{" "}
          <Button
            onClick={() => (window.location.href = "/")}
            className="link-light"
          >
            {" "}
            Home 🏠{" "}
          </Button>
        </p>

        {pokemonLoading && <Spinner animation="grow" />}

        {pokemon === null && <p>Pokemon not found</p>}

        {pokemon && (
          <>
            <Color
              src={getPokemonImageUrl(pokemon?.id)}
              crossOrigin="anonymous"
              format="hex"
            >
              {({ data }) => {
                if (typeof data === "string") {
                  document.body.style.background = data;
                }
                return null;
              }}
            </Color>

            <h1 className="text-center text-capitalize">{pokemon.name}</h1>

            <Image
              src={getPokemonImageUrl(pokemon.id)}
              alt={"Pokemon: " + pokemon.name}
              width={400}
              height={400}
            />

            <div>
              {!pokemonLoading && previousPokemon && (
                <Button onClick={handlePreviousPokemon} className="link-light">
                  {" "}
                  ← {"# 0" + previousPokemon.id} {previousPokemon.name}{" "}
                </Button>
              )}{" "}
              {!pokemonLoading && nextPokemon && (
                <Button onClick={handleNextPokemon} className="link-light">
                  {" "}
                  {"# 0" + nextPokemon.id} {nextPokemon.name} →{" "}
                </Button>
              )}
            </div>
            <div className="d-inline-block mt-2">
              <div>
                <strong>Height:</strong> {pokemon.height * 10} cm
              </div>
              <div>
                <strong>Weight:</strong> {pokemon.weight / 10} kg
              </div>
              <div>
                <strong>Types:</strong>{" "}
                {pokemon.types.map((type) => type.type).join(", ")}
              </div>
              <div>
                <strong>Abilities:</strong>{" "}
                {pokemon.abilities.map((ability) => ability.ability).join(", ")}
              </div>
              <div>
                <strong>Egg Groups:</strong>{" "}
                {pokemon.eggGroups
                  .map((eggGroup) => eggGroup.eggGroup)
                  .join(", ")}
              </div>
              <div>
                <strong>Stats:</strong>{" "}
                <ul>
                  <li>
                    {" "}
                    <b> Hp: </b> {pokemon.stat.hp}
                  </li>
                  <li>
                    {" "}
                    <b> Speed: </b> {pokemon.stat.speed}
                  </li>
                  <li>
                    {" "}
                    <b> Attack: </b> {pokemon.stat.attack}
                  </li>
                  <li>
                    {" "}
                    <b> Defense: </b> {pokemon.stat.defense}
                  </li>
                  <li>
                    {" "}
                    <b> Special Attack: </b> {pokemon.stat.specialAttack}
                  </li>
                  <li>
                    {" "}
                    <b> Special Defense: </b> {pokemon.stat.specialDefense}
                  </li>
                </ul>
              </div>
              <div>
                <strong>Genus:</strong> {pokemon.genus}
              </div>
              <div>
                <strong>Description:</strong> <i> {pokemon.description} </i>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
