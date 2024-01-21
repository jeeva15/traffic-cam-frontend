import { screen, render } from "@testing-library/react";

import ImageCard from ".";

const setup = (overrideProps?: any) => {
  render(<ImageCard {...overrideProps}>Search</ImageCard>);
};

describe("ImageCard", () => {
  it("should display card with title", () => {
    const mockProps = { title: "test title" };
    setup(mockProps);

    const card = screen.getByText("test title");

    expect(card).toBeInTheDocument();
  });

  it("should display image card with child", () => {
    const mockProps = { imgURL: "test.jpg", alt: "alt_img" };
    setup(mockProps);
    const image = screen.getByAltText("alt_img");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test.jpg");
  });
});
