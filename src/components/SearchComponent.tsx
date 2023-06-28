import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  getAllPokemonNames,
  getAllPokemonList,
  getPokemonPage,
} from "@/network/pokemonApi";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import styles from "@/styles/SearchBar.module.css";
import useSWR from "swr";

function SearchComponent() {
  const [searchText, setSearchText] = useState<string | number>("");
  const [selectedSearchBy, setSelectedSearchBy] = useState("Name");
  const [matchedPokemon, setMatchedPokemon] = useState<string[] | number[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const page = parseInt(router.query.page?.toString() || "1");
  const { data, isLoading } = useSWR(["getPokemonPage", page], () =>
    getPokemonPage(page)
  );
  const pokemonIds: number[] = Array.from(
    { length: data?.totalElements ?? 0 },
    (_, i) => i + 1
  );

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchText(value);

    if (selectedSearchBy == "Name") {
      value !== null &&
        setMatchedPokemon(
          (await getAllPokemonNames()).filter((pokemon) =>
            pokemon.toLowerCase().includes(value.toLowerCase())
          )
        );
    } else if (selectedSearchBy == "Id") {
      value !== null &&
        setMatchedPokemon(
          pokemonIds.filter((pokemon) => pokemon.toString().includes(value))
        );
    }
  };

  const handleClick = (pokemon: string | number) => {
    setSearchText(pokemon);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setMatchedPokemon([]);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "1%",
        width: "100%",
      }}
    >
      <div
        ref={searchRef}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flex: "60%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "row",
            flex: "20%",
          }}
        >
          Search By:{" "}
          <select
            className={styles.input_wrapper}
            value={selectedSearchBy}
            onChange={(event) => setSelectedSearchBy(event.target.value)}
          >
            <option value={"Name"} defaultChecked>
              {" "}
              Name{" "}
            </option>
            <option value={"Id"}> Id </option>
          </select>{" "}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "60%",
          }}
        >
          <div
            className={styles.input_wrapper}
            style={{
              width: "100%",
            }}
          >
            <FaSearch id="search-icon" />
            <input
              className={styles.input}
              type="text"
              value={searchText}
              onChange={handleInputChange}
              placeholder="Search Pokémon"
            />
          </div>

          <div className={styles.results_list}>
            {matchedPokemon.map((pokemon) => (
              <li
                style={{
                  listStyleType: "none",
                  padding: 8,
                  fontWeight: 100,
                }}
                className={styles.results_each}
                onClick={() => handleClick(pokemon)}
                key={pokemon}
              >
                {pokemon}
              </li>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "row",
          flex: "0%",
        }}
      >
        Sort By:{" "}
        <select className={styles.input_wrapper}>
          <option defaultChecked> Id (Asc) </option>
          <option> Id (Desc) </option>
          <option> Name (A-Z) </option>
          <option> Name (Z-A) </option>
        </select>{" "}
      </div>
    </div>
  );
}

export default SearchComponent;
