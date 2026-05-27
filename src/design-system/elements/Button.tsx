// A thin design system wrapper over React Native's built-in Button.
// Keeps the same platform-native appearance while routing through
// the design system layer — swap out the internals later without
// changing every call site.

import { Button as RNButton, type ButtonProps } from "react-native"

const Button: React.FC<ButtonProps> = (props) => {
  return <RNButton {...props} />
}

export default Button
