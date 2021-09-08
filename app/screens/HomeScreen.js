import React from "react";
import { Button, StyleSheet, View } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Breathe"
        color="#64bee6"
        onPress={() => navigation.navigate("Breathe")}
      />
      <Button
        title="ColorSelection"
        color="#FD9F9C"
        onPress={() => navigation.navigate("ColorSelection")}
      />
      <Button
        title="Reflectly"
        color="#02CBD6"
        onPress={() => navigation.navigate("Reflectly")}
      />
      <Button
        title="Sticy Shapes"
        color="#7edab9"
        onPress={() => navigation.navigate("Sticky Shapes")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
