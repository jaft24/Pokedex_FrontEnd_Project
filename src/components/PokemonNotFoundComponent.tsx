export default function PokemonNotFoundComponent() {
  return (
    <div style={{ transform: "scale(0.85)" }}>
      <img src="/pikachu_no.gif" alt="Pikachu No" />
      <p className="font-monospace text-center text-capitalize">
        {" "}
        Opps, Nothing to see here. <br />
        Please clear All your filters and try again.
      </p>
    </div>
  );
}
