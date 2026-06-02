// Extends Jest's expect with @testing-library/react-native custom matchers
// (e.g. toBeOnTheScreen, toHaveTextContent) for all test files.
// This file is run before every test suite via setupFilesAfterEnv in package.json.
import * as matchers from "@testing-library/react-native/matchers"

expect.extend(matchers)
