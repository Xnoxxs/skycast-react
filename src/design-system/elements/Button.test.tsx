// Unit tests for the Button design-system element.
//
// Concepts demonstrated:
//   - Smoke test  : the component renders without throwing
//   - Unit test   : the rendered title text is visible on screen
//   - jest.fn()   : a mock function records every call made to it
//   - userEvent   : simulates real user interactions (press, type, …)

import { render, screen, userEvent } from "@testing-library/react-native"

import Button from "./Button"

// ─── Smoke test ───────────────────────────────────────────────────────────────
// The simplest possible test: if render() throws, the test fails.
// This tells us the component mounts without crashing.
test("renders without crashing", () => {
  render(<Button title="Search" onPress={jest.fn()} />)
  expect(screen.getByText("Search")).toBeOnTheScreen()
})

// ─── Unit test: title renders ─────────────────────────────────────────────────
// Verifies that the title prop appears as visible text in the rendered output.
test("displays the title text", () => {
  render(<Button title="Search" onPress={jest.fn()} />)

  // getByText throws if the text is not found — so this assertion is implicit
  expect(screen.getByText("Search")).toBeOnTheScreen()
})

// ─── Unit test: onPress fires ─────────────────────────────────────────────────
// jest.fn() creates a mock function that records how many times it was called
// and with which arguments — without needing a real implementation.
// userEvent.press() simulates a real tap, going through the full event pipeline.
test("calls onPress when pressed", async () => {
  const onPressMock = jest.fn() // ← jest.fn() creates the mock

  render(<Button title="Search" onPress={onPressMock} />)

  const user = userEvent.setup()
  await user.press(screen.getByText("Search")) // ← userEvent.press()

  expect(onPressMock).toHaveBeenCalledTimes(1)
})
