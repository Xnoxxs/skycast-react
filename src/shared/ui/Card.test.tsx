// Smoke test for the Card shared UI component.
//
// A smoke test is the most basic check: does the component render at all?
// If Card throws during rendering, this test will fail immediately.

import { render, screen } from "@testing-library/react-native"
import { Text } from "react-native"

import Card from "./Card"

test("renders without crashing and displays its children", () => {
  render(
    <Card>
      <Text>Hello from Card</Text>
    </Card>,
  )

  // If the child text is visible, the Card rendered correctly
  expect(screen.getByText("Hello from Card")).toBeOnTheScreen()
})
