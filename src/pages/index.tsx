import PokemonEntry from "@/components/PokemonEntry";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import * as PokemonApi from "@/network/pokemonApi";
import { Button, Col, Row } from "react-bootstrap";
import { SetStateAction, useEffect, useState } from "react";
import SearchComponent from "@/components/SearchComponent";
import MoreFilters from "@/components/MoreFiltersComponents";
import styles from "@/styles/SearchBar.module.css";
import { pokemonNames } from "@/data/pokemon/pokemonNames";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";
import PokemonNotFoundComponent from "@/components/PokemonNotFoundComponent";
import { pokemonIds } from "@/data/pokemon/PokemonId";

export default function Home() {
  const router = useRouter();
  const page = parseInt(router.query.page?.toString() || "0");

  const [name, setName] = useState<string>("");
  const [id, setId] = useState<number>(0);

  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [type, setType] = useState<string>("");
  const [ability, setAbility] = useState<string>("");
  const [eggGroup, setEggGroup] = useState<string>("");
  const [genus, setGenus] = useState<string>("");

  const [selectedHeight, setSelectedHeight] = useState(0);
  const handleHeightChange = (selectedValue: number) => {
    setSelectedHeight(selectedValue);
  };
  const [selectedWeight, setSelectedWeight] = useState(0);
  const handleWeightChange = (selectedValue: number) => {
    setSelectedWeight(selectedValue);
  };
  const [selectedType, setSelectedType] = useState("");
  const handleTypeChange = (selectedValue: string) => {
    setSelectedType(selectedValue);
  };
  const [selectedAbility, setSelectedAbility] = useState("");
  const handleAbilityChange = (selectedValue: string) => {
    setSelectedAbility(selectedValue);
  };
  const [selectedEggGroup, setSelectedEggGroup] = useState("");
  const handleEggGroupChange = (selectedValue: string) => {
    setSelectedEggGroup(selectedValue);
  };
  const [selectedGenus, setSelectedGenus] = useState("");
  const handleGenusChange = (selectedValue: string) => {
    setSelectedGenus(selectedValue);
  };

  const [gridVisibility, setGridVisibility] = useState("block");
  const [showAdvacnedFeaturesButton, setShowAdvacnedFeaturesButton] =
    useState(true);
  const [showAdvacnedFeatures, setShowAdvacnedFeatures] = useState(false);
  const [hideAdvacnedFeaturesButton, setHidehowAdvacnedFeatures] =
    useState(false);
  const [searchText, setSearchText] = useState<string | number>("");
  const [selectedSearchBy, setSelectedSearchBy] = useState("Name");
  const [matchedPokemon, setMatchedPokemon] = useState<string[] | number[]>([]);
  const [selectedSortBy, setSelectedSortBy] = useState("asc");
  const handleSortByChange = (selectedValue: SetStateAction<string>) => {
    setSelectedSortBy(selectedValue);
  };
  const sort = selectedSortBy;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value !== "") {
      setSearchText(value);
      setGridVisibility("none");
      setShowAdvacnedFeatures(false);
      setShowAdvacnedFeaturesButton(true);
      setHidehowAdvacnedFeatures(false);

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

  // These need to go back to the MoreFilters Component?
  const handleShowAdvacnedSearch = () => {
    setShowAdvacnedFeatures(true);
    setShowAdvacnedFeaturesButton(false);
    setHidehowAdvacnedFeatures(true);
  };
  const handleHideAdvacnedSearch = () => {
    setShowAdvacnedFeatures(false);
    setShowAdvacnedFeaturesButton(true);
    setHidehowAdvacnedFeatures(false);
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
        setId(0);
        setName(searchText.toString());
      } else if (
        selectedSearchBy == "Id" &&
        matchedPokemon.some((each) => each === searchText)
      ) {
        setName("");
        setId(parseFloat(searchText.toString()));
      }
    }
  };
  const handleListClick = (pokemon: string | number) => {
    setGridVisibility("block");
    router.push({ query: { ...router.query, page: 0 } });
    if (selectedSearchBy == "Name") {
      setId(0);
      setName(pokemon.toString());
    } else if (selectedSearchBy == "Id") {
      setName("");
      setId(parseFloat(pokemon.toString()));
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
          padding: "1%",
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
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 1300,
            alignItems: "center",
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            {showAdvacnedFeaturesButton && (
              <div
                style={{
                  display: "flex",
                }}
              >
                <Button
                  style={{}}
                  className={styles.custom_button}
                  onClick={handleShowAdvacnedSearch}
                >
                  {" "}
                  ↯ Show Advanced Search ↯{" "}
                </Button>
              </div>
            )}

            {showAdvacnedFeatures && (
              <div className={showAdvacnedFeatures ? styles.slide_down : ""}>
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
            )}
            {hideAdvacnedFeaturesButton && (
              <div>
                <Button
                  style={{ marginTop: -5 }}
                  className={styles.custom_button}
                  onClick={handleHideAdvacnedSearch}
                >
                  {" "}
                  ⇪ Hide Advanced Search ⇪{" "}
                </Button>
              </div>
            )}
          </div>

          {data?.numberOfElements != 0 ? (
            <div
              style={{
                display: { gridVisibility }.gridVisibility,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Row className="g-5">
                {data?.content.map((pokemonEntry) => (
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                    key={pokemonEntry.name}
                  >
                    <Link href={"/" + pokemonEntry.id + "?page=" + page}>
                      <PokemonEntry id={pokemonEntry.id} />
                    </Link>
                  </Col>
                ))}
              </Row>

              <div
                style={{ marginTop: -5, marginBottom: 70 }}
                className="d-flex justify-content-center gap-5"
              >
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
