export default function PokemonNotFoundComponent() {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <img style={{ margin: 10 }} src="/pikachu_no.gif" />
      <p className="font-monospace text-center text-capitalize">
        {" "}
        Opps, Nothing to see here. <br />
        Please clear All your filters and try again.
      </p>
    </div>
  );
}
