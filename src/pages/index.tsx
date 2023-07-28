import { useRouter } from "next/router";
import useSWR from "swr";
import * as PokemonApi from "@/network/pokemonApi";
import { SetStateAction, useLayoutEffect, useState } from "react";
import SearchComponent from "@/components/SearchComponent";
import MoreFilters from "@/components/MoreFiltersComponents";
import { pokemonNames } from "@/data/pokemon/pokemonNames";
import LoadingComponent from "@/components/LoadingComponent";
import ErrorComponent from "@/components/ErrorComponent";
import PokemonNotFoundComponent from "@/components/PokemonNotFoundComponent";
import { pokemonIds } from "@/data/pokemon/PokemonId";
import MainFooterNav from "@/components/MainFooterNav";
import PokemonBody from "@/components/PokemonBody";
import { Box, Collapse, VStack, useDisclosure } from "@chakra-ui/react";
import MyButton from "@/components/MyButton";
import ProfileHeader from "@/components/AuthenticationComponents/ProfileHeader";
import SignInButton from "@/components/AuthenticationComponents/SignInHeader";
import { useAuth } from "@/hooks/AuthContext";

export default function Home() {
  const [gridVisibility, setGridVisibility] = useState("block");
  const { isOpen, onToggle } = useDisclosure();

  const router = useRouter();
  const page = parseInt(router.query.page?.toString() || "0");

  const { isLoggedIn } = useAuth();

  const [name, setName] = useState("");
  const [id, setId] = useState(0);
  const [selectedSortBy, setSelectedSortBy] = useState("asc");
  const [searchText, setSearchText] = useState<string | number>("");
  const [selectedSearchBy, setSelectedSearchBy] = useState("Name");
  const [matchedPokemon, setMatchedPokemon] = useState<string[] | number[]>([]);

  const [filterValues, setFilterValues] = useState({
    height: 0,
    weight: 0,
    type: "",
    ability: "",
    eggGroup: "",
    genus: "",
  });

  const [selectedFilterValues, setSelectedFilterValues] = useState({
    selectedHeight: 0,
    selectedWeight: 0,
    selectedType: "",
    selectedAbility: "",
    selectedEggGroup: "",
    selectedGenus: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value !== "") {
      setSearchText(value);
      setGridVisibility("none");
      onToggle();

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
    matchedPokemon.some((each) => each === searchText) &&
      setGridVisibility("block");
    if (event.key === "Enter") {
      router.push({ query: { ...router.query, page: 0 } });
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
    setFilterValues({
      height: selectedFilterValues.selectedHeight,
      weight: selectedFilterValues.selectedWeight,
      type: selectedFilterValues.selectedType,
      ability: selectedFilterValues.selectedAbility,
      eggGroup: selectedFilterValues.selectedEggGroup,
      genus: selectedFilterValues.selectedGenus,
    });
  };

  const { data, error, isLoading } = useSWR(
    [
      "getAllPokemonPage",
      page,
      name,
      id,
      filterValues.height,
      filterValues.weight,
      filterValues.type,
      filterValues.ability,
      selectedSortBy,
      filterValues.genus,
      filterValues.eggGroup,
    ],
    async () => {
      return await PokemonApi.getAllPokemon({
        page,
        name,
        id,
        height: filterValues.height,
        weight: filterValues.weight,
        type: filterValues.type,
        ability: filterValues.ability,
        sort: selectedSortBy,
        genus: filterValues.genus,
        eggGroup: filterValues.eggGroup,
      });
    }
  );

  useLayoutEffect(() => {
    document.body.style.background = "";
  });

  if (error) {
    return <ErrorComponent />;
  } else if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <VStack m="auto" align="center" justifyContent="center" w="90%">
        {isLoggedIn ? <ProfileHeader /> : <SignInButton />}
        <SearchComponent
          selectedSortBy={selectedSortBy}
          onSortByChange={(selectedValue: SetStateAction<string>) =>
            setSelectedSortBy(selectedValue)
          }
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
        <Collapse in={isOpen} animateOpacity>
          <MoreFilters
            selectedHeight={selectedFilterValues.selectedHeight}
            onSelectedHeightChange={(selectedValue: number) =>
              setSelectedFilterValues({
                ...selectedFilterValues,
                selectedHeight: selectedValue,
              })
            }
            selectedWeight={selectedFilterValues.selectedWeight}
            onSelectedWeightChange={(selectedValue: number) =>
              setSelectedFilterValues({
                ...selectedFilterValues,
                selectedWeight: selectedValue,
              })
            }
            selectedType={selectedFilterValues.selectedType}
            onSelectedTypeChange={(selectedValue: string) =>
              setSelectedFilterValues({
                ...selectedFilterValues,
                selectedType: selectedValue,
              })
            }
            selectedGenus={selectedFilterValues.selectedGenus}
            onSelectedGenusChange={(selectedValue: string) =>
              setSelectedFilterValues({
                ...selectedFilterValues,
                selectedGenus: selectedValue,
              })
            }
            selectedEggGroup={selectedFilterValues.selectedEggGroup}
            onSelectedEggGroupChange={(selectedValue: string) =>
              setSelectedFilterValues({
                ...selectedFilterValues,
                selectedEggGroup: selectedValue,
              })
            }
            selectedAbility={selectedFilterValues.selectedAbility}
            onSelectedAbilityChange={(selectedValue: string) =>
              setSelectedFilterValues({
                ...selectedFilterValues,
                selectedAbility: selectedValue,
              })
            }
            onClickAdvancedSearch={handleAdvacnedSearch}
          />
        </Collapse>
        <Box mb={5}>
          <MyButton onClick={onToggle}>
            {isOpen ? " ⇪ Hide Advanced Search ⇪" : "↯ Show Advanced Search ↯"}
          </MyButton>
        </Box>
        {data?.numberOfElements != 0 ? (
          <Box
            display={gridVisibility}
            alignItems="center"
            justifyContent="center"
          >
            <PokemonBody data={data} page={page} />
            <MainFooterNav data={data} page={page} />
          </Box>
        ) : (
          <PokemonNotFoundComponent />
        )}
      </VStack>
    </>
  );
}
