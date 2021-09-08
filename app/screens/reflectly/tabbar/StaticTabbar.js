import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import calender from "../calender";

const { width } = calender;
export const SIZE = width / 5;

const styles = StyleSheet.create({
  container: {
    width,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    paddingTop: 32,
  },
});

const StaticTabbar = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: 16 + insets.bottom + 9 }]}>
      <Feather name="copy" color="#B9B9C7" size={24} />
      <Feather name="activity" color="#B9B9C7" size={24} />
      <Feather name="x" color="#B9B9C7" size={24} />
      <Feather name="edit-3" color="#B9B9C7" size={24} />
      <Feather name="user" color="#B9B9C7" size={24} />
    </View>
  );
};

export default StaticTabbar;
