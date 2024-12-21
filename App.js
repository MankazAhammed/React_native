import React, {useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import ProgressScreen from "./screens/ProgressScreen";
import WorkoutScreen from "./screens/WorkoutScreen";
import ContactsScreen from "./screens/ContactsScreen";
import FileManagerScreen from "./screens/FileManagerScreen";
import FitnessEventScreen from "./screens/FitnessEventScreen";
import SplashScreen from "./screens/SplashScreen"; // Import Splash Screen
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  if (isSplashVisible) {
    return <SplashScreen onFinish={() => setIsSplashVisible(false)} />;
  }
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerStyle: { backgroundColor: "#4CAF50" },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="ProgressScreen"
            component={ProgressScreen}
            options={{
              headerStyle: { backgroundColor: "#4CAF50" },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="WorkoutScreen"
            component={WorkoutScreen}
            options={{
              headerStyle: { backgroundColor: "#4CAF50" },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="ContactsScreen"
            component={ContactsScreen}
            options={{
              headerStyle: { backgroundColor: "#2196F3" },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="FitnessEventScreen"
            component={FitnessEventScreen}
          />
          <Stack.Screen
            name="FileManagerScreen"
            component={FileManagerScreen}
            options={{ title: "FileManagerScreen" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
