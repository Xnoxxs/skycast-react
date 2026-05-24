import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"

import RootStackNavigator from "./navigation/RootStackNavigator"

const App: React.FC = () => {
  return (
    // NavigationContainer manages the navigation tree and holds navigation state
    <NavigationContainer>
      <RootStackNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}

export default App
