import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { StickyShapes } from "../screens/stickyShapes";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Sticky Shapes" component={StickyShapes} />
  </Stack.Navigator>
);

export default AppNavigator;
