import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";

import calender from "./calender";

const { COLOR_WIDTH, RADIUS } = calender;

const Color = ({ color, index, translateX, onPress }) => {
  const inputRange = [
    -COLOR_WIDTH * (index + 1),
    -COLOR_WIDTH * index,
    -COLOR_WIDTH * (index - 1),
  ];

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({ absoluteX: x, absoluteY: y }) => {
      runOnJS(onPress)({ x, y });
    },
  });

  const style = useAnimatedStyle(() => {
    const angle = interpolate(
      translateX.value,
      inputRange,
      [0, Math.PI / 2, Math.PI],
      Extrapolate.CLAMP
    );
    const translateY = 45 * Math.cos(angle);
    const scale = 0.8 + 0.2 * Math.sin(angle);

    return {
      transform: [{ translateX: translateX.value }, { translateY }, { scale }],
    };
  });

  return (
    <Animated.View style={[styles.container, style]}>
      <TapGestureHandler {...{ onGestureEvent }}>
        <Animated.View>
          <LinearGradient
            colors={[color.start, color.end]}
            style={styles.gradient}
          />
        </Animated.View>
      </TapGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: COLOR_WIDTH,
    alignItems: "center",
  },
  gradient: {
    borderRadius: RADIUS,
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderWidth: 6,
    borderColor: "white",
  },
});

export default Color;
