import { screen, render, fireEvent } from "@testing-library/react";

import Input from "./";

const setup = (overrideProps?: any) => {
  render(<Input {...overrideProps} />);
};

describe("Input", () => {
  it("should display text input with value", () => {
    const mockProps = { name: "test", id: "test", type: "text", value: "test" };
    setup(mockProps);
    const dateInput = screen.getByRole("textbox");
    expect(dateInput).toBeInTheDocument();
    expect(dateInput).toHaveValue("test");
  });

  it("should display placeholder", () => {
    const mockProps = {
      name: "test",
      id: "test",
      type: "text",
      value: "test",
      placeHolder: "test-placehodler",
    };
    setup(mockProps);
    const dateInput = screen.getByPlaceholderText("test-placehodler");
    expect(dateInput).toBeInTheDocument();
  });

  it("should call onChange when input changed", () => {
    const testFunction = jest.fn();

    const mockProps = {
      name: "test",
      id: "test",
      type: "text",
      onChange: testFunction,
    };
    setup(mockProps);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "new value" } });

    expect(input).toBeInTheDocument();
    expect(testFunction).toBeCalled();
  });
});
