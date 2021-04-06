import React from "react";
import App from "App";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { AppProviders } from "context";

test("integration", async () => {
  render(<App />, { wrapper: AppProviders });
  await waitForElementToBeRemoved(() => screen.getByTestId("loading"));
});

export {};
