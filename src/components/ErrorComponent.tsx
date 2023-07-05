import { Button } from "react-bootstrap";
import styles from "@/styles/SearchBar.module.css";

export default function ErrorComponent() {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-55%, -65%)",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img src="/pikachu_404Error.gif" height={400} />
      <p className="font-monospace text-center text-capitalize">
        {" "}
        404 Not Found!
        <br />
        The Page You Requested Is Not Found.
        <br />
        Go back to the Home Page.
      </p>
      <Button
        style={{ width: "50%" }}
        onClick={() => (window.location.href = "/")}
        className={styles.custom_button}
      >
        {" "}
        ← Home{" "}
      </Button>
    </div>
  );
}
