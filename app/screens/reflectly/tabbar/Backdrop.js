import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const Backdrop = ({ open }) => {
  const animatedProps = useAnimatedProps(() => ({
    PointerEvents: open.value < 1 ? "none" : "box-none",
  }));
  const style = useAnimatedStyle(() => ({
    backgroundColor: "grey",
    opacity: 0.6 * open.value,
  }));

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, style]}
      animatedProps={animatedProps}
    >
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={() => (open.value = withTiming(0))}
      />
    </Animated.View>
  );
};

export default Backdrop;
