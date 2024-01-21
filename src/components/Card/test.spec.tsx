import { screen, render } from "@testing-library/react";

import Card from ".";

const setup = (overrideProps?: any) => {
  render(<Card {...overrideProps}>Card Test</Card>);
};

describe("Card", () => {
  it("should display card with child", () => {
    const mockProps = {};
    setup(mockProps);
    const card = screen.getByText("Card Test");

    expect(card).toBeInTheDocument();
  });

  it("should display card without title when title is empty", () => {
    const mockProps = {};
    setup(mockProps);

    const card = screen.getByText("Card Test");
    const title = screen.queryAllByText("title");

    expect(card).toBeInTheDocument();
    expect(title.length).toBe(0);
  });

  it("should display card with title", () => {
    const mockProps = { title: "test title" };
    setup(mockProps);

    const card = screen.getByText("test title");

    expect(card).toBeInTheDocument();
  });
});
