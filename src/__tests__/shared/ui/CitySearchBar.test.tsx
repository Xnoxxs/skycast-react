// Integration test for the CitySearchBar shared component.
//
// An integration test verifies that multiple parts work together as a unit:
//   - The TextInput accepts user input
//   - The Search button reads the current input value
//   - The onSearch callback is called with the expected city name
//
// Concepts demonstrated:
//   - Controlled component pattern with a useState wrapper
//   - userEvent.type() to simulate keyboard input
//   - userEvent.press() to simulate a button tap
//   - jest.fn() to capture and assert on callback calls

import { render, screen, userEvent } from "@testing-library/react-native"
import { useState } from "react"

import CitySearchBar from "#shared/ui/CitySearchBar"

// Wrapper component that owns the controlled state.
// This mirrors how HomeScreen uses CitySearchBar in the real app.
function Wrapper({ onSearch }: { onSearch: jest.Mock }) {
  const [value, setValue] = useState("")
  return (
    <CitySearchBar value={value} onChangeText={setValue} onSearch={onSearch} />
  )
}

test("calls onSearch with the typed city name when Search is pressed", async () => {
  const mockSearch = jest.fn()

  render(<Wrapper onSearch={mockSearch} />)

  const user = userEvent.setup()

  // Step 1: type a city name into the input
  await user.type(
    screen.getByPlaceholderText("Enter city name..."),
    "Barcelona",
  )

  // Step 2: press the Search button
  await user.press(screen.getByText("Search"))

  // Step 3: verify the callback was called with the typed city
  expect(mockSearch).toHaveBeenCalledWith("Barcelona")
})
