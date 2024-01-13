import useSWR from "swr";
import * as api from "@/network/capturedApi";
import { useAuth } from "@/hooks/AuthContext";
import { useRouter } from "next/router";
import PokemonBody from "@/components/PokemonBody";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import PokemonEntry from "@/components/PokemonEntry";
import { useEffect } from "react";
import { Button, Box } from "@chakra-ui/react";


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
    <Box>
      <h1>🚧  The Captured Page is Currently Under Construction. 🚧</h1>
      <h2>Come Back Soon for v2 Release, please go back to Home Page</h2>
      <Button
            onClick={() => { router.push(`/`) }}
            width="30%"
            opacity={0.75}
            color="black"
            height="2.5rem"
            borderRadius="10px"
            padding="0 15px"
            boxShadow="0px 0px 8px #ddd"
            alignItems="center"
            marginTop="5%"
            fontSize="16px"
            _hover={{
              opacity: 1,
            }}
          > Home 🏠
       </Button>

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
    </Box>
  );
}
