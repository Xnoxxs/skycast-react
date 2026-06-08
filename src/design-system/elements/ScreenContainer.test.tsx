import { render, screen } from "@testing-library/react-native"
import { Text } from "react-native"

import ScreenContainer from "./ScreenContainer"

test("renders without crashing", () => {
  render(
    <ScreenContainer>
      <Text>Content</Text>
    </ScreenContainer>,
  )
  expect(screen.getByText("Content")).toBeOnTheScreen()
})
