import { StatusBar } from "expo-status-bar"

import AppProviders from "#app/providers/AppProviders"
import RootStackNavigator from "#app/navigation/RootStackNavigator"

const App: React.FC = () => {
  return (
    <AppProviders>
      <RootStackNavigator />
      <StatusBar style="auto" />
    </AppProviders>
  )
}

export default App
