import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from ".";

import * as apiHandler from "../../utils/apiHandler";

jest.mock("../../utils/apiHandler");

const mockRecentSearchData: any = [
  {
    search_date_time: "2024-01-19T08:51:43.000Z",
    location: "Marine Parade",
  },
];

describe("Home", () => {
  beforeEach(() => {
    jest
      .spyOn(apiHandler, "getRecentSearch")
      .mockReturnValueOnce(Promise.resolve(mockRecentSearchData));

    jest
      .spyOn(apiHandler, "getRecentUsersSearch")
      .mockReturnValueOnce(Promise.resolve(mockRecentSearchData));
  });

  test("Should render home page with all elements", () => {
    render(<Home />);
    const dateField = screen.getByPlaceholderText("dd/mm/yyyy");
    const timeField = screen.getByPlaceholderText("hh/mm");
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(dateField).toBeInTheDocument();
    expect(timeField).toBeInTheDocument();
  });

  test("Should render recent searches when api returns data", async () => {
    render(<Home />);
    await waitFor(() => {
      const recentSearches = screen.getByText("Recent Searches");
      expect(recentSearches).toBeInTheDocument();
    });

    expect(apiHandler.getRecentSearch).toBeCalledTimes(1);
    expect(apiHandler.getRecentUsersSearch).toBeCalledTimes(1);
  });

  test("Should not call getTrafficImagesData when date is empty", async () => {
    render(<Home />);
    await waitFor(() => {
      const searcheButton = screen.getByRole("button");
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.click(searcheButton);
    });

    expect(apiHandler.getTrafficImagesData).toBeCalledTimes(0);
  });

  test("Should display search results", async () => {
    render(<Home />);
    jest.spyOn(apiHandler, "getTrafficImagesData").mockReturnValueOnce([
      {
        weatherLocation: "Geylang",
        location: "1002 - Geylang",
        image: "2024/01/87c1ccaa-b59a-4c89-b175-8312a9d94f35.jpg",
      },
    ] as any);

    const dateInput = screen.getByPlaceholderText("dd/mm/yyyy");

    // eslint-disable-next-line testing-library/no-wait-for-side-effects
    fireEvent.change(dateInput, { target: { value: "2024-01-21" } });

    await waitFor(() => {
      const searcheButton = screen.getByText("Search");
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.click(searcheButton);

      const result = screen.getByText("1002 - Geylang");
      expect(result).toBeInTheDocument();
    });

    expect(apiHandler.getTrafficImagesData).toBeCalled();
  });

  test("Should display weather and image cards", async () => {
    render(<Home />);
    jest.spyOn(apiHandler, "getTrafficImagesData").mockReturnValueOnce([
      {
        weatherLocation: "Geylang",
        location: "1002 - Geylang",
        image: "2024/01/87c1ccaa-b59a-4c89-b175-8312a9d94f35.jpg",
      },
    ] as any);

    jest.spyOn(apiHandler, "getTrafficImagesData").mockReturnValueOnce([
      {
        weatherLocation: "Geylang",
        location: "1002 - Geylang",
        image: "2024/01/87c1ccaa-b59a-4c89-b175-8312a9d94f35.jpg",
      },
    ] as any);

    const dateInput = screen.getByPlaceholderText("dd/mm/yyyy");

    // eslint-disable-next-line testing-library/no-wait-for-side-effects
    fireEvent.change(dateInput, { target: { value: "2024-01-21" } });

    // Traffic image data assert
    await waitFor(() => {
      const searchButton = screen.getByText("Search");
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.click(searchButton);

      const result = screen.getByText("1002 - Geylang");
      expect(result).toBeInTheDocument();
    });

    //Weather data assert
    await waitFor(() => {
      const viewButton = screen.getAllByText("View")[0];
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      fireEvent.click(viewButton);
      const weatherCard = screen.getByText("Weather");
      expect(weatherCard).toBeInTheDocument();
    });

    expect(apiHandler.getTrafficImagesData).toBeCalled();
  });
});
