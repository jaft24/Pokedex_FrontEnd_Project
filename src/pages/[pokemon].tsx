import { useRouter } from "next/router";
import useSWR from "swr";
import * as PokemonApi from "@/network/pokemonApi";
import Head from "next/head";
import Image from "next/image";
import { getPokemonImageUrl } from "@/image/pokemonImage";
import styles from "@/styles/SearchBar.module.css";
import Color from "color-thief-react";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";

import { useState } from "react";
import { TypeButton } from "@/components/FilterButtons";
import { eggGroupHexColor, typeHexColor } from "@/data/colors";
import {
  getPokemonGifBackByName,
  getPokemonGifByName,
} from "@/image/pokemonGif";
import StatProgressChart from "@/components/StatProgressChart";
import { Button } from "react-bootstrap";
import Link from "next/link";
//More unused imports

export default function PokemonDetailsPage() {
  const router = useRouter();
  const pokemonName = router.query.pokemon?.toString() || "";
  const [backgroundColor, setBackgroundColor] = useState("white");

  const previousPage = router.query.page
    ? parseInt(router.query.page.toString())
    : 1;
  const currentPage = parseInt(router.query.page?.toString() || "1");
  const {
    data: pokemon,
    error: pokemonError,
    isLoading: pokemonLoading,
  } = useSWR(pokemonName, PokemonApi.getPokemon);

  const maxValues = {
    maxHp: 255,
    maxSpeed: 160,
    maxAttack: 165,
    maxDefense: 230,
    maxSpecialAttack: 154,
    maxSpecialDefense: 230,
  };

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
  //This might be personal preverence, but when I only use a function a single time
  // like this, I prefer to just do the operation inline
  function handleBackToListClick() {
    const queryParams = new URLSearchParams({ page: previousPage.toString() });
    const url = `/?${queryParams.toString()}`;
    window.location.href = url;
  }

  //I've seen this beautifyString things in a few differnet places now, it could be a shared util
  function beautifyString(str: string): string {
    const words = str.split("-");
    const capitalizedWords = words.map((word) => {
      const firstLetter = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1);
      return firstLetter + restOfWord;
    });
    return capitalizedWords.join(" ");
  }
  if (pokemonError) {
    return <ErrorComponent />;
  } else if (pokemonLoading) {
    return <LoadingComponent />;
  }

  //I'm running out of my available time for review here, this is where I left off

  return (
    <>
      <Head>{pokemon && <title> {pokemon.name} </title>}</Head>

      <div className="d-flex flex-column align-items-center mt-5">
        {pokemon && (
          <>
            <Color
              src={getPokemonImageUrl(pokemon?.id)}
              crossOrigin="anonymous"
              format="hex"
            >
              {({ data }) => {
                if (typeof data === "string") {
                  setBackgroundColor(data);
                  document.body.style.background = data;
                }
                return null;
              }}
            </Color>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                background: "rgb(153,182,214)",
                backgroundImage:
                  "linear-gradient(180deg, rgba(153,182,214,1) 0%, rgba(255,255,255,1) 100%)",
                padding: 50,
                maxWidth: 900,
                maxHeight: 950,
                borderRadius: 20,
              }}
            >
              <div
                style={{ marginTop: "-7%", marginBottom: "2%" }}
                className="font-monospace d-flex justify-content-center gap-3"
              >
                <Button
                  style={{
                    width: "30%",
                    backgroundColor: backgroundColor,
                    opacity: 0.75,
                    color: "black",
                  }}
                  onClick={handleBackToListClick}
                  className={styles.custom_button}
                >
                  {" "}
                  ← Back To List{" "}
                </Button>{" "}
                <Button
                  style={{
                    width: "30%",
                    backgroundColor: backgroundColor,
                    opacity: 0.75,
                    color: "black",
                  }}
                  onClick={() => (window.location.href = "/")}
                  className={styles.custom_button}
                >
                  {" "}
                  Home{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-house"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path
                      fill-rule="evenodd"
                      d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                    />{" "}
                    <path
                      fill-rule="evenodd"
                      d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                    />{" "}
                  </svg>
                </Button>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <div>
                  <div>
                    <small style={{ fontSize: "1", fontWeight: "lighter" }}>
                      # 0{pokemon.id} &nbsp;{" "}
                    </small>
                  </div>
                  <div>
                    <h4 className="font-monospace text-capitalize">
                      {pokemon.name}
                    </h4>
                  </div>
                  <div>
                    <p className="font-monospace text-capitalize">
                      {" " + pokemon.genus}
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
                      style={{
                        marginRight: "auto",
                        transform: "scale(1.15)",
                      }}
                    >
                      <TypeButton
                        typeName={beautifyString(type.type)}
                        typeColor={
                          typeHexColor.find((t) => t.type === type.type)
                            ?.color || ""
                        }
                        isSelected={false}
                        onClick={() => {}}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <hr
                style={{
                  borderBlockColor: backgroundColor,
                  borderBlockWidth: "4px",
                }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <div>
                  <Image
                    src={getPokemonImageUrl(pokemon.id)}
                    alt={"Pokemon: " + pokemon.name}
                    style={{ margin: "-2%" }}
                    width={300}
                    height={300}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "space-between",
                  }}
                >
                  <img
                    src={getPokemonGifByName(pokemon.name)}
                    alt={"Pokemon: " + pokemon.name}
                    style={{ margin: "-2%", marginBottom: "5%" }}
                    width={130}
                    height={130}
                  />
                  <img
                    src={getPokemonGifBackByName(pokemon.name)}
                    alt={"Pokemon: " + pokemon.name}
                    style={{ margin: "-2%", marginTop: "5%" }}
                    width={130}
                    height={130}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <table align="center" className="font-monospace">
                    <tr>
                      <td rowSpan={3}>
                        <div style={{ margin: 5 }}>
                          <svg
                            fill="none"
                            height="75"
                            viewBox="0 0 17 16"
                            width="75"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="path"
                              d="M4.44996 13H13.2166L12.1666 5.66669H5.49996L4.44996 13ZM8.83329 4.66669C9.12218 4.66669 9.36107 4.56946 9.54996 4.37502C9.73885 4.18058 9.83329 3.94446 9.83329 3.66669C9.83329 3.3778 9.73885 3.13891 9.54996 2.95002C9.36107 2.76113 9.12218 2.66669 8.83329 2.66669C8.55552 2.66669 8.3194 2.76113 8.12496 2.95002C7.93052 3.13891 7.83329 3.3778 7.83329 3.66669C7.83329 3.94446 7.93052 4.18058 8.12496 4.37502C8.3194 4.56946 8.55552 4.66669 8.83329 4.66669ZM10.5666 4.66669H12.1666C12.4222 4.66669 12.6444 4.74724 12.8333 4.90835C13.0222 5.06946 13.1333 5.2778 13.1666 5.53335L14.2 12.8667C14.2444 13.1667 14.1694 13.4306 13.975 13.6584C13.7805 13.8861 13.5277 14 13.2166 14H4.44996C4.13885 14 3.88607 13.8861 3.69163 13.6584C3.49718 13.4306 3.42218 13.1667 3.46663 12.8667L4.49996 5.53335C4.53329 5.2778 4.6444 5.06946 4.83329 4.90835C5.02218 4.74724 5.2444 4.66669 5.49996 4.66669H7.09996C7.01107 4.51113 6.9444 4.3528 6.89996 4.19169C6.85552 4.03058 6.83329 3.85558 6.83329 3.66669C6.83329 3.11113 7.02774 2.63891 7.41663 2.25002C7.80552 1.86113 8.27774 1.66669 8.83329 1.66669C9.38885 1.66669 9.86107 1.86113 10.25 2.25002C10.6388 2.63891 10.8333 3.11113 10.8333 3.66669C10.8333 3.85558 10.8111 4.03058 10.7666 4.19169C10.7222 4.3528 10.6555 4.51113 10.5666 4.66669ZM4.44996 13H13.2166H4.44996Z"
                              fill={backgroundColor}
                            />
                          </svg>{" "}
                        </div>
                      </td>
                      <td>
                        <small style={{ fontSize: "1", fontWeight: "lighter" }}>
                          Weight &nbsp;
                        </small>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {pokemon.weight / 10}
                        <small style={{ fontSize: "1", fontWeight: "lighter" }}>
                          {" "}
                          kg{" "}
                        </small>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {((pokemon.weight / 10) * 2.20462).toFixed(2)}
                        <small style={{ fontSize: "1", fontWeight: "lighter" }}>
                          {" "}
                          lbs{" "}
                        </small>
                      </td>
                    </tr>

                    <hr
                      style={{
                        borderBlockColor: backgroundColor,
                        borderBlockWidth: "3px",
                      }}
                    />

                    <tr>
                      <td rowSpan={3}>
                        <div style={{ margin: 5 }}>
                          <svg
                            fill="none"
                            height="75"
                            viewBox="0 0 17 16"
                            width="75"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="path"
                              d="M4.5 2.33331C4.5 2.06665 4.6 1.83331 4.8 1.63331C5 1.43331 5.23333 1.33331 5.5 1.33331L11.5 1.33331C11.7556 1.33331 11.9861 1.43331 12.1917 1.63331C12.3972 1.83331 12.5 2.06665 12.5 2.33331V13.6666C12.5 13.9333 12.3972 14.1666 12.1917 14.3666C11.9861 14.5666 11.7556 14.6666 11.5 14.6666H5.5C5.23333 14.6666 5 14.5666 4.8 14.3666C4.6 14.1666 4.5 13.9333 4.5 13.6666V2.33331ZM5.5 2.33331L5.5 13.6666H11.5V11.5H8.5V10.5H11.5V8.49998H8.5V7.49998H11.5V5.49998H8.5V4.49998H11.5V2.33331L5.5 2.33331ZM8.5 4.49998V5.49998V4.49998ZM8.5 7.49998V8.49998V7.49998ZM8.5 10.5V11.5V10.5Z"
                              fill={backgroundColor}
                            />
                          </svg>{" "}
                        </div>
                      </td>
                      <td>
                        <small style={{ fontSize: "1", fontWeight: "lighter" }}>
                          Height &nbsp;
                        </small>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {pokemon.height * 10}
                        <small style={{ fontSize: "1", fontWeight: "lighter" }}>
                          {" "}
                          cm{" "}
                        </small>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {((pokemon.weight * 10) / 0.393701).toFixed(2)}
                        <small style={{ fontSize: "1", fontWeight: "lighter" }}>
                          {" "}
                          in{" "}
                        </small>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>

              <div className="d-inline-block mt-2 font-monospace">
                <div style={{ display: "flex", gap: 15 }}>
                  <strong>Egg Groups:</strong>{" "}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: 20,
                    }}
                  >
                    {pokemon.eggGroups.map((egg) => (
                      <div
                        key={egg.id}
                        style={{
                          marginRight: "auto",
                          transform: "scale(1.15)",
                        }}
                      >
                        <TypeButton
                          typeName={beautifyString(egg.eggGroup)}
                          typeColor={
                            eggGroupHexColor.find(
                              (e) => e.eggGroup === egg.eggGroup
                            )?.color || ""
                          }
                          isSelected={false}
                          onClick={() => {}}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: "1%", marginBottom: "1%" }}>
                  <strong>Abilities:</strong>{" "}
                  {pokemon.abilities
                    .map((ability) => beautifyString(ability.ability))
                    .join(", ")}
                </div>
                <div style={{ marginBottom: "3%" }}>
                  <strong>Stats:</strong>{" "}
                  <ul
                    style={{
                      marginTop: "2%",
                      marginLeft: "-2%",
                      listStyleType: "none",
                      display: "flex",
                      gap: 30,
                    }}
                  >
                    <li>
                      <StatProgressChart
                        statValue={pokemon.stat.hp}
                        maxstatValue={maxValues.maxHp}
                        label={"Hp"}
                        color={backgroundColor}
                      />{" "}
                    </li>
                    <li>
                      <StatProgressChart
                        statValue={pokemon.stat.speed}
                        maxstatValue={maxValues.maxSpeed}
                        label={"Speed"}
                        color={backgroundColor}
                      />{" "}
                    </li>
                    <li>
                      <StatProgressChart
                        statValue={pokemon.stat.attack}
                        maxstatValue={maxValues.maxAttack}
                        label={"Attack"}
                        color={backgroundColor}
                      />{" "}
                    </li>
                    <li>
                      <StatProgressChart
                        statValue={pokemon.stat.defense}
                        maxstatValue={maxValues.maxDefense}
                        label={"Defense"}
                        color={backgroundColor}
                      />{" "}
                    </li>
                    <li>
                      <StatProgressChart
                        statValue={pokemon.stat.specialAttack}
                        maxstatValue={maxValues.maxSpecialAttack}
                        label={"S.A"}
                        color={backgroundColor}
                      />{" "}
                    </li>
                    <li>
                      <StatProgressChart
                        statValue={pokemon.stat.specialDefense}
                        maxstatValue={maxValues.maxSpecialDefense}
                        label={"S.D"}
                        color={backgroundColor}
                      />{" "}
                    </li>
                  </ul>
                </div>
                <div>
                  <strong>Description:</strong> <i> {pokemon.description} </i>
                </div>
              </div>
              <div className="font-monospace d-flex justify-content-center gap-3">
                {previousPokemon && (
                  <Button
                    onClick={handlePreviousPokemon}
                    style={{
                      width: "50%",
                      backgroundColor: backgroundColor,
                      opacity: 0.75,
                      color: "black",
                    }}
                    className={styles.custom_button}
                  >
                    {" "}
                    ← {"# 0" + previousPokemon.id} {previousPokemon.name}{" "}
                  </Button>
                )}{" "}
                {nextPokemon && (
                  <Button
                    onClick={handleNextPokemon}
                    style={{
                      width: "50%",
                      backgroundColor: backgroundColor,
                      opacity: 0.75,
                      color: "black",
                    }}
                    className={styles.custom_button}
                  >
                    {" "}
                    {"# 0" + nextPokemon.id} {nextPokemon.name} →{" "}
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
