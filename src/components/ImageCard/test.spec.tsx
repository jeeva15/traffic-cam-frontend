import { screen, render, fireEvent } from "@testing-library/react";

import Button from ".";

const setup = (overrideProps?: any) => {
  const onClick = () => {};
  render(
    <Button onClick={onClick} {...overrideProps}>
      Search
    </Button>
  );
};

describe("Button", () => {
  it("should display label and text input with value", () => {
    const mockProps = {};
    setup(mockProps);
    const button = screen.getByText("Search");

    expect(button).toBeInTheDocument();
  });

  it("should call onclick", () => {
    const testFunction = jest.fn();
    const mockProps = { onClick: testFunction };
    setup(mockProps);

    const button = screen.getByText("Search");
    fireEvent.click(button);

    expect(button).toBeInTheDocument();
    expect(testFunction).toBeCalled();
  });
});
