// Root stack navigator — the top-level navigator of the app.
// Currently holds only the Tabs screen, but can grow with
// modals or auth screens added here in the future.

import { createNativeStackNavigator } from "@react-navigation/native-stack"

import TabsNavigator from "./TabsNavigator"
import type { RootStackParamList } from "./types"

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootStackNavigator: React.FC = () => {
  return (
    // Hide the header at the root level — each nested navigator manages its own
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabsNavigator} />
    </Stack.Navigator>
  )
}

export default RootStackNavigator
