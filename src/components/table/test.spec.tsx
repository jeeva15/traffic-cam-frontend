import { screen, render, fireEvent } from "@testing-library/react";

import Table from ".";

const setup = (overrideProps?: any) => {
  var column = [
    {
      label: "Location",
      field: "location",
    },
  ];
  const row = [{ location: "Geylang" }];

  render(
    <Table
      columns={column}
      rows={row}
      onRowClick={jest.fn}
      {...overrideProps}
    />
  );
};

describe("Table", () => {
  it("should render table with rows and columns", () => {
    const mockProps = { hideHeader: false };
    setup(mockProps);
    const table = screen.getByRole("table");
    const row = screen.getByText("Geylang");
    const column = screen.getByText("Location");

    expect(table).toBeInTheDocument();
    expect(row).toBeInTheDocument();
    expect(column).toBeInTheDocument();
  });

  it("should render mobile table with rows but without column", () => {
    // Mocking window.innerWidth
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 500, // Set the desired window width
    });
    const mockProps = {};
    setup(mockProps);
    const table = screen.getByRole("table");
    const row = screen.getByText("Geylang");

    expect(table).toBeInTheDocument();
    expect(table).toHaveClass("mobileTable");
    expect(row).toBeInTheDocument();
    expect(screen.queryAllByText("Location")).toHaveLength(0);
  });

  it("should render with button", () => {
    // Mocking window.innerWidth
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 800, // Set the desired window width
    });
    const mockProps = {
      columns: [
        {
          label: "Action",
          field: "action",
          showButton: true,
        },
      ],
    };
    setup(mockProps);
    const table = screen.getByRole("table");
    const column = screen.getByText("Action");
    const button = screen.getByRole("button");

    expect(table).toBeInTheDocument();
    expect(column).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
