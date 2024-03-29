import React from "react";
import { StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import Backdrop from "./tabbar/Backdrop";
import Tabbar from "./tabbar/Tabbar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: 32,
    alignItems: "center",
    backgroundColor: "#F5F7FE",
  },
});

const Reflectly = () => {
  const open = useSharedValue(0);

  return (
    <View style={styles.container}>
      <Backdrop open={open} />
      <Tabbar open={open} />
    </View>
  );
};

export default Reflectly;
