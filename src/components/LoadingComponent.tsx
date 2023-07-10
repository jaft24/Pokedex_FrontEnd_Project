export default function LoadingComponent() {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -65%)",
      }}
    >
      <img src="/pikachu_walking.gif" alt="Pokemon Loading Logo" />
      <p className="font-monospace text-center text-capitalize">
        {" "}
        Loading . . .
      </p>
    </div>
  );
}
