import { NavigationContainer } from "@react-navigation/native"

// AppProviders wraps the app with all global context providers.
// Add more providers here as the app grows (e.g. theme, auth, i18n).
const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    // NavigationContainer manages the navigation tree and holds navigation state
    <NavigationContainer>{children}</NavigationContainer>
  )
}

export default AppProviders
