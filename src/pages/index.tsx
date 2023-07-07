import PokemonEntry from "@/components/PokemonEntry";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import * as PokemonApi from "@/network/pokemonApi";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { SetStateAction, useEffect, useState } from "react";
import SearchComponent from "@/components/SearchComponent";
import MoreFilters from "@/components/MoreFilters";
import styles from "@/styles/SearchBar.module.css";
import { pokemonNames } from "@/data/pokemonNames";
import { AxiosError } from "axios";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";
import PokemonNotFoundComponent from "@/components/PokemonNotFoundComponent";
//There are a couple more unused imports here.

export default function Home() {
  const router = useRouter();
  const page = parseInt(router.query.page?.toString() || "0");

  const pokemonIds: number[] = Array.from(
    { length: pokemonNames.length },
    (_, i) => i + 1
  );

  // Similar critiques below to the ones I've made in other components.
  const [name, setName] = useState<string | undefined>(undefined);
  // Does name really need to be a union type? Could you start with a default value of "" instead?
  const [id, setId] = useState<string | undefined>(undefined);
  const [gridVisibility, setGridVisibility] = useState("block");

  const [searchText, setSearchText] = useState<string | number>("");
  const [selectedSearchBy, setSelectedSearchBy] = useState("Name");
  const [matchedPokemon, setMatchedPokemon] = useState<string[] | number[]>([]);

  const [selectedSortBy, setSelectedSortBy] = useState("1");
  /*

  I would have expected by the variable name that this was a string...
  but something like "asc" or "desc"

  */
  const handleSortByChange = (selectedValue: SetStateAction<string>) => {
    setSelectedSortBy(selectedValue);
  };
  //I think you could just use selectedSortBy rather than creating a new variable
  const sort = selectedSortBy;

  const [height, setHeight] = useState<number | undefined>(undefined);
  const [selectedHeight, setSelectedHeight] = useState(undefined);
  const handleHeightChange = (selectedValue: SetStateAction<undefined>) => {
    setSelectedHeight(selectedValue);
  };
  const [weight, setWeight] = useState<number | undefined>(undefined);
  const [selectedWeight, setSelectedWeight] = useState(undefined);
  const handleWeightChange = (selectedValue: SetStateAction<undefined>) => {
    setSelectedWeight(selectedValue);
  };
  const [type, setType] = useState<string | undefined>(undefined);
  const [selectedType, setSelectedType] = useState(undefined);
  const handleTypeChange = (selectedValue: SetStateAction<undefined>) => {
    setSelectedType(selectedValue);
  };
  const [ability, setAbility] = useState<string | undefined>(undefined);
  const [selectedAbility, setSelectedAbility] = useState(undefined);
  const handleAbilityChange = (selectedValue: SetStateAction<undefined>) => {
    setSelectedAbility(selectedValue);
  };
  const [eggGroup, setEggGroup] = useState<string | undefined>(undefined);
  const [selectedEggGroup, setSelectedEggGroup] = useState(undefined);
  const handleEggGroupChange = (selectedValue: SetStateAction<undefined>) => {
    setSelectedEggGroup(selectedValue);
  };
  const [genus, setGenus] = useState<string | undefined>(undefined);
  const [selectedGenus, setSelectedGenus] = useState(undefined);

  /*

    This is a ton of state to have in just this one component, normally I like to have
    my main page components be as "dumb" as possible, and have the state be managed by
    the sub-components that area dealing with more of the functionality.

   */

  const handleGenusChange = (selectedValue: SetStateAction<undefined>) => {
    setSelectedGenus(selectedValue);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value !== "") {
      setSearchText(value);
      setGridVisibility("none");

      if (selectedSearchBy === "Name") {
        setMatchedPokemon(
          pokemonNames.filter((pokemon) =>
            pokemon.toLowerCase().includes(value.toLowerCase())
          )
        );
      } else if (selectedSearchBy === "Id") {
        setMatchedPokemon(
          pokemonIds.filter((pokemon) => pokemon.toString().includes(value))
        );
      }
    } else {
      setSearchText("");
      setGridVisibility("block");
      setMatchedPokemon([]);
    }
  };
  const handleSearchSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    router.push({ query: { ...router.query, page: 0 } });
    matchedPokemon.some((each) => each === searchText) &&
      setGridVisibility("block");
    if (event.key === "Enter") {
      event.preventDefault();
      if (
        selectedSearchBy == "Name" &&
        matchedPokemon.some((each) => each === searchText)
      ) {
        setId(undefined);
        setName(searchText.toString());
      } else if (
        selectedSearchBy == "Id" &&
        matchedPokemon.some((each) => each === searchText)
      ) {
        setName(undefined);
        setId(searchText.toString());
      }
    }
  };
  const handleListClick = (pokemon: string | number) => {
    setGridVisibility("block");
    router.push({ query: { ...router.query, page: 0 } });
    if (selectedSearchBy == "Name") {
      setId(undefined);
      setName(pokemon.toString());
    } else if (selectedSearchBy == "Id") {
      setName(undefined);
      setId(pokemon.toString());
    }
  };
  const handleAdvacnedSearch = () => {
    router.push({ query: { ...router.query, page: 0 } });
    setGenus(selectedGenus);
    setEggGroup(selectedEggGroup);
    setAbility(selectedAbility);
    setType(selectedType);
    setHeight(selectedHeight);
    setWeight(selectedWeight);
  };
  const handleClearFilters = () => {
    window.location.href = "/";
  };

  const { data, error, isLoading } = useSWR(
    [
      "getAllPokemonPage",
      page,
      name,
      id,
      height,
      weight,
      type,
      ability,
      sort,
      genus,
      eggGroup,
    ],
    async () => {
      return await PokemonApi.getAllPokemon({
        page,
        name,
        id,
        height,
        weight,
        type,
        ability,
        sort,
        genus,
        eggGroup,
      });
    }
  );

  useEffect(() => {
    document.body.style.background = "";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  if (error) {
    return <ErrorComponent />;
  } else if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div
      style={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          margin: "1%",
        }}
      >
        <img
          className="rounded mx-auto d-block mb-1"
          src="/pokedex.png"
          alt="Pokemon Logo"
          width={275}
          height={120}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            flex: "10%",
          }}
        >
          <MoreFilters
            selectedHeight={selectedHeight}
            onSelectedHeightChange={handleHeightChange}
            selectedWeight={selectedWeight}
            onSelectedWeightChange={handleWeightChange}
            selectedType={selectedType}
            onSelectedTypeChange={handleTypeChange}
            selectedGenus={selectedGenus}
            onSelectedGenusChange={handleGenusChange}
            selectedEggGroup={selectedEggGroup}
            onSelectedEggGroupChange={handleEggGroupChange}
            selectedAbility={selectedAbility}
            onSelectedAbilityChange={handleAbilityChange}
            onClickAdvancedSearch={handleAdvacnedSearch}
            onClickClearFilters={handleClearFilters}
          />
        </div>

        <div
          style={{
            flex: "70%",
          }}
        >
          <SearchComponent
            selectedSortBy={selectedSortBy}
            onSortByChange={handleSortByChange}
            searchText={searchText}
            onSearchTextChange={setSearchText}
            selectedSearchBy={selectedSearchBy}
            onSearchByChange={setSelectedSearchBy}
            matchedPokemon={matchedPokemon}
            onMatchedPokemonChange={setMatchedPokemon}
            onInputChange={handleInputChange}
            onSearchSubmit={handleSearchSubmit}
            onListClick={handleListClick}
          />

          {data?.numberOfElements != 0 ? (
            <div
              style={{
                display: { gridVisibility }.gridVisibility,
              }}
            >
              <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-5">
                {data?.content.map((pokemonEntry) => (
                  <Col key={pokemonEntry.name}>
                    <Link href={"/" + pokemonEntry.name + "?page=" + page}>
                      <PokemonEntry name={pokemonEntry.name} />
                    </Link>
                  </Col>
                ))}
              </Row>

              <div className="d-flex justify-content-center gap-2 mt-4">
                {!data?.first && (
                  <Button
                    style={{ width: "25%" }}
                    className={styles.custom_button}
                    onClick={() =>
                      router.push({
                        query: { ...router.query, page: page - 1 },
                      })
                    }
                  >
                    ← Previous
                  </Button>
                )}
                {!data?.last && (
                  <Button
                    style={{ width: "25%" }}
                    className={styles.custom_button}
                    onClick={() =>
                      router.push({
                        query: { ...router.query, page: page + 1 },
                      })
                    }
                  >
                    Next →
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <PokemonNotFoundComponent />
          )}
        </div>
      </div>
    </div>
  );
}
