import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PokemonNotFoundComponent from "@/components/PokemonNotFoundComponent";

describe("Pokemon Not Found component", () => {
  it("Should render the error component", () => {
    const { getByText, getByAltText } = render(<PokemonNotFoundComponent />);

    const imageElement = getByAltText("Pikachu Not Found Image");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.getAttribute("src")).toBe("/pikachu_no.gif");

  });
});
