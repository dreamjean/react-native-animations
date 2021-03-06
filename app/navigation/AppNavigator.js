import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { ColorSelection } from "../screens/reflectly";
import { StickyShapes } from "../screens/stickyShapes";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Colors" component={ColorSelection} />
    <Stack.Screen name="StickyShapes" component={StickyShapes} />
  </Stack.Navigator>
);

export default AppNavigator;
