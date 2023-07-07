import React, { ChangeEvent, useEffect, useRef, useState } from "react";

/*
 ChangeEvent and useState are both unused imports, my code editor
 highlights this form me and it's a good habit to set up your editor to do the same.
 We shouldn't be adding unused imports to our files.
 */

import { FaSearch } from "react-icons/fa";
import styles from "@/styles/SearchBar.module.css";

function SearchComponent({
  selectedSortBy,
  onSortByChange,
  searchText,
  onSearchTextChange,
  selectedSearchBy,
  onSearchByChange,
  matchedPokemon,
  onMatchedPokemonChange,
  onInputChange,
  onSearchSubmit,
  onListClick,
}: {
  selectedSortBy: string;
  onSortByChange: any;
  searchText: string | number;
  onSearchTextChange: (value: string | number) => void;
  selectedSearchBy: string;
  onSearchByChange: (value: string) => void;
  matchedPokemon: string[] | number[];
  onMatchedPokemonChange: (value: string[] | number[]) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: any;
  onListClick: any;
  //Same feedback that I gave over in MoreFilters.tsx also applies here.
}) {

  const searchRef = useRef<HTMLDivElement>(null);

  const handleListClick = (pokemon: string | number) => {
    onListClick(pokemon);
    onSearchTextChange(pokemon);
    onMatchedPokemonChange([]);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      onMatchedPokemonChange([]);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

    /*

    I'm a little bit confused by the code from lines 39 - 58. I don't think you should need
    to use a ref value here, I think useState should be enough. Maybe there was an issue where
    this components was being unrendered or something clearning out your search?

    If you were having problems retaining your search text, you could place it into the url

    Additionally, do you remember why the handleClickOutside bit was needed?
     */

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
          flex: "50%",
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
            onChange={(event) => onSearchByChange(event.target.value)}
          >
            <option value={"Name"} defaultChecked>
              {" "}
              Name{" "}
            </option>
            <option value={"Id"}> Id </option>
              {/*
              You don't need to wrap a string in curly brackets, instead you
              can just do the following:

                <option value="Id">Id</option>

              */}
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
              onChange={(e) => onInputChange(e)}
              placeholder="Search Pokémon"
              onKeyDown={onSearchSubmit}
            />
          </div>

          <div className={styles.results_list}>
            {matchedPokemon.map((pokemon) => (
                /*
                I see a pokemon type in your models folder, could that be used here?

                Additionally <li> elements should always be nested beneath
                <ul> or <ol> elements rather than directly below a <div>
                 */
              <li
                style={{
                  listStyleType: "none",
                  padding: 8,
                  fontWeight: 100,
                }}
                className={styles.results_each}
                onClick={() => handleListClick(pokemon)}
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
        <select
          className={styles.input_wrapper}
          value={selectedSortBy}
          onChange={(event) => {
            const selectedSortByValue = event.target.value;
            onSortByChange(selectedSortByValue);
            //Similar critique to the other file, you don't really need this extra variable around
          }}
        >
          <option value={"1"} defaultChecked>
            {" "}
            Id (Asc){" "}
          </option>
          <option value={"-1"}> Id (Desc) </option>
          <option value={"A"}> Name (A-Z) </option>
          <option value={"Z"}> Name (Z-A) </option>
        </select>{" "}
      </div>
    </div>
  );
}

export default SearchComponent;
