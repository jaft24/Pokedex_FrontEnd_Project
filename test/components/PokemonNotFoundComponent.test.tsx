import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PokemonNotFoundComponent from "@/components/PokemonNotFoundComponent";

describe("Pokemon Not Found component", () => {
  it("Should render the error component", () => {
    const { getByText, getByAltText } = render(<PokemonNotFoundComponent />);

    const imageElement = getByAltText("Pikachu No");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.getAttribute("src")).toBe("/pikachu_no.gif");

    const textElement = getByText(
      "Opps, Nothing to see here. Please clear All your filters and try again."
    );
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass("font-monospace");
    expect(textElement).toHaveClass("text-center");
    expect(textElement).toHaveClass("text-capitalize");
  });
});
