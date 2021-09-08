import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { Breathe } from "../screens/breathe";
import HomeScreen from "../screens/HomeScreen";
import { ColorSelection, Reflectly } from "../screens/reflectly";
import { StickyShapes } from "../screens/stickyShapes";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Breathe" component={Breathe} />
    <Stack.Screen
      name="ColorSelection"
      component={ColorSelection}
      options={{
        title: "🤖 Color Selection",
      }}
    />
    <Stack.Screen
      name="Reflectly"
      component={Reflectly}
      options={{
        title: "🤖 Reflectly Tabbar",
      }}
    />
    <Stack.Screen
      name="Sticky Shapes"
      component={StickyShapes}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AppNavigator;
