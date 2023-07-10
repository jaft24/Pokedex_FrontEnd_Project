import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/pages";

jest.mock("next/router", () => require("next-router-mock"));

describe("Index page", () => {
  it("Should render the loading component properly", () => {
    const { getByAltText } = render(<Home />);

    const loadingImageElement = getByAltText("Pokemon Loading Logo");

    expect(loadingImageElement).toBeInTheDocument();
    expect(loadingImageElement.getAttribute("src")).toBe(
      "/pikachu_walking.gif"
    );
  });

  //   it("Shoud finish loading and render pokemon", async () => {
  //     await act(async () => {
  //       render(<Home />);

  //       const logoImageElement = screen.getByAltText("Pokemon Logo");
  //       expect(logoImageElement).toBeInTheDocument();
  //       expect(logoImageElement.getAttribute("src")).toBe("/pokedex.png");
  //     });

  //     const showAdvancedFeaturesButton = screen.getByText(
  //       "↯ Show Advanced Search ↯"
  //     );
  //     expect(showAdvancedFeaturesButton).toBeInTheDocument();
  //   });
});
