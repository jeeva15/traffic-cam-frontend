import { screen, render } from "@testing-library/react";

import WeatherCard from "./";

const setup = (overrideProps?: any) => {
  render(<WeatherCard {...overrideProps} />);
};

describe("WeatherCard", () => {
  it("should display card with title", () => {
    const mockProps = {};
    setup(mockProps);

    const card = screen.getByText("Weather");

    expect(card).toBeInTheDocument();
  });

  it("should render forcast", () => {
    const mockProps = { forecast: "cloudy" };
    setup(mockProps);
    const forecast = screen.getByText("cloudy");

    expect(forecast).toBeInTheDocument();
  });
});
