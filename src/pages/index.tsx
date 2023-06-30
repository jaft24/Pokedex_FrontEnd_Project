import PokemonEntry from "@/components/PokemonEntry";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import * as PokemonApi from "@/network/pokemonApi";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import SearchComponent from "@/components/SearchComponent";
import MoreFilters from "@/components/MoreFilters";
import styles from "@/styles/SearchBar.module.css";

export default function Home() {
  const router = useRouter();
  const page = parseInt(router.query.page?.toString() || "1");
  const ability = "chlorophyll";

  const [sortBy, setSortBy] = useState("Z");

  const updateSelectedSortBy = (sortBy: string) => {
    setSortBy(sortBy);
  };

  const { data, isLoading } = useSWR(
    ["getAllPokemonPage", page, ability],
    async () => {
      return await PokemonApi.getPokemonPage({ page, ability });
    }
  );

  useEffect(() => {
    document.body.style.background = "";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  if (isLoading)
    return <Spinner animation="border" className="d-block m-auto" />;

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
            flex: "15%",
          }}
        >
          <MoreFilters />
        </div>

        <div
          style={{
            flex: "70%",
          }}
        >
          <SearchComponent updateSelectedSortBy={updateSelectedSortBy} />

          <div>
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
                    router.push({ query: { ...router.query, page: page - 1 } })
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
                    router.push({ query: { ...router.query, page: page + 1 } })
                  }
                >
                  Next →
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
