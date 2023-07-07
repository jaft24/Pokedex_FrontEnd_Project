export default function LoadingComponent() {
    //Really minor thing here, but if all you are returning is JSX,
    // you can omit the return statement and the curly bracket.
   return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-55%, -65%)",
      }}
    >
      <img src="/pikachu_walking.gif" />
      {/* Another example of an image that could use an alt tag */}
      <p className="font-monospace text-center text-capitalize">
        {" "}
        Loading . . .
      </p>
    </div>
  );
}
