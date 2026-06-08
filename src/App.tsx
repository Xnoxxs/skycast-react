import { StatusBar } from "expo-status-bar"

import RootStackNavigator from "#app/navigation/RootStackNavigator"
import AppProviders from "#app/providers/AppProviders"

const App: React.FC = () => {
  return (
    <AppProviders>
      <RootStackNavigator />
      <StatusBar style="auto" />
    </AppProviders>
  )
}

export default App
