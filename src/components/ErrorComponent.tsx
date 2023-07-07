import { Button } from "react-bootstrap";
import styles from "@/styles/SearchBar.module.css";

/*

    Right out of the gate before I dive into the review I just wanted to say
    how good the Pokedex looks! The additional features you added are really cool
    and the advanced filtering options that you implementing must have been pretty
    challenging to figure out. Additionally the individual pokemon pages with the
    color thief implementation and the stat progress bars are really cool.

    Some context for everyone else, Ja wasn't fully done with this iteration of the pokedex
    by the time I got around to reviewing it and is aware of many of the issues and
    refactoring that is needed. He just wanted to get eyes on it sooner vs later.

 */

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
      {/* The image tag below is missing an alt tag. This doesn't break anything,
      but alt tags communicate useful information to people using screen readers
      search enginges or web scrapers. */}
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
          {/* I'm seeing a bunch of instnaces of these brackets with spacing in multiple places.
          In my opinion, its much better to do these kinds of spacing things with CSS rather than
          add additional space characters around text. */}
        ← Home{" "}
      </Button>
    </div>
  );
}
