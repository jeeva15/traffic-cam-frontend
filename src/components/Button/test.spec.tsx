import { screen, render, fireEvent } from "@testing-library/react";

import Button from "./";

const setup = (overrideProps?: any) => {
  const onClick = () => {};
  render(
    <Button onClick={onClick} {...overrideProps}>
      {" "}
      Search
    </Button>
  );
};

describe("Table", () => {
  it("should render button", () => {
    const mockProps = {};
    setup(mockProps);
    const button = screen.getByText("Search");

    expect(button).toBeInTheDocument();
  });

  it("should call onclick function", () => {
    const testFunction = jest.fn();
    const mockProps = { onClick: testFunction };
    setup(mockProps);
    const button = screen.getByText("Search");

    fireEvent.click(button);

    expect(button).toBeInTheDocument();
    expect(testFunction).toBeCalledTimes(1);
  });
});
