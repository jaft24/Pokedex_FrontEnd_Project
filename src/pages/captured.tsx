import useSWR from "swr";
import * as api from "@/network/capturedApi";
import { useAuth } from "@/hooks/AuthContext";
import { useRouter } from "next/router";
import PokemonBody from "@/components/PokemonBody";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import PokemonEntry from "@/components/PokemonEntry";
import { useEffect } from "react";

export default function Captured() {
  const router = useRouter();
  const { isLoggedIn, token } = useAuth();
  const page = parseInt(router.query.page?.toString() || "0");

  const { data, error, isLoading } = useSWR(
    ["getCapturedPokemonList", token],
    async () => {
      return await api.getCapturedPokemonList(token);
    }
  );

  useEffect(() => {
    !isLoggedIn && router.push("/signin");
  });

  return (
    <div>
      <h1>Hello World</h1>
      {isLoading && <p> Data is Loading </p>}
      {error && <p> No Pokemon Captured </p>}

      <Row className="g-4">
        {data?.map((pokemonEntry) => (
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
    </div>
  );
}
