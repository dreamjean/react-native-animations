import { Feather } from "@expo/vector-icons";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  label: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "GothamRounded-Medium",
    marginRight: 8,
  },
});

const Row = ({ label, icon }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Alert.alert(label)}>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Feather name={icon} color="white" size={24} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Row;
