/**
 * @format
 */

import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { App } from "components/src/App";
import Board from "components/src/Board";
import * as React from "react";

afterEach(cleanup);

// App
test("Renders the shared app", async () => {
  render(<App />);
});

//Board
test("When user clicks the first board, an X should appear", async () => {
  const { getAllByTestId, debug } = render(<Board nRows={4} nColumns={4} />);
  const cellNode = getAllByTestId("cellContainer")[0];
  fireEvent.click(cellNode);
  debug();
});
