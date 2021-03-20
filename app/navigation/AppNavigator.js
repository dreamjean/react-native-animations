import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { Breathe } from "../screens/breathe";
import { ColorSelection } from "../screens/reflectly";
import { StickyShapes } from "../screens/stickyShapes";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Breathe" component={Breathe} />
    <Stack.Screen name="Colors" component={ColorSelection} />
    <Stack.Screen
      name="StickyShapes"
      component={StickyShapes}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AppNavigator;
