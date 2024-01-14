import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '.';

test('Should render home page with all elements', () => {
  render(<Home />);
  const label = screen.getByLabelText("Date & Time:");
  //const dateField = screen.getByRole("textbox", { name: 'date' });
  //const timeField = screen.getByRole("textbox", { name: 'time' });
  const button = screen.getByRole("button");

  expect(label).toBeInTheDocument();
  expect(button).toBeInTheDocument();
  // expect(dateField).toBeInTheDocument();
  // expect(timeField).toBeInTheDocument();
});
