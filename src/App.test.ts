import React from "react";
import { render } from "@testing-library/react";
import infoTable from "./components/infoTable";
import App from "./App";

test("change the hackers news data", () => {
  const { findAllByText } = render(App[infoTable]);
  const linkElement = findAllByText("Next");
  expect(linkElement);
});
