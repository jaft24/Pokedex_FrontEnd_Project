import { PokemonPage } from "@/models/pokemonPage";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import PokemonEntry from "./PokemonEntry";

const PokemonBody = ({
  data,
  page,
}: {
  data: PokemonPage | undefined;
  page: number;
}) => {
  return (
    <Row className="g-4">
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
  );
};

export default PokemonBody;
