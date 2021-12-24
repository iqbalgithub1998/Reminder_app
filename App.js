import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home";
import Setting from "./Screens/Setting";
import Search from "./Screens/Search";
import ThemeContext from "./config/context";
import { lightcolor, darkcolor } from "./config/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "react-native";
export default function App() {
  const [theme, setTheme] = useState();
  useEffect(() => {
    getSettingsfromStorage();
  }, []);

  const getSettingsfromStorage = async () => {
    try {
      const data = await AsyncStorage.getItem("doreminderTheme");

      if (data) {
        const jsonData = JSON.parse(data);
        if (jsonData.darkMode == true) {
          setTheme({ ...darkcolor });
        } else {
          setTheme({ ...lightcolor });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Stack = createNativeStackNavigator();
  const StackNavigator = () => (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
