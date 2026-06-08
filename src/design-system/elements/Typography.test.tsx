import { render, screen } from "@testing-library/react-native"

import Typography from "./Typography"

test("renders without crashing", () => {
  render(<Typography>Hello</Typography>)
  expect(screen.getByText("Hello")).toBeOnTheScreen()
})
