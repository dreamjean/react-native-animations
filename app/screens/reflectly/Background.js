import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import calender from "./calender";

const { height, RADIUS, width } = calender;

const Background = ({ colorSelection }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
  }, [colorSelection]);

  const MAX_RADIUS =
    (Math.SQRT2 *
      Math.max(
        width + colorSelection.position.x,
        height + colorSelection.position.y
      )) /
    2;

  const style = useAnimatedStyle(() => {
    return {
      top: colorSelection.position.y - RADIUS,
      left: colorSelection.position.x - RADIUS,
      borderRadius: RADIUS,
      width: RADIUS * 2,
      height: RADIUS * 2,
      backgroundColor: colorSelection.current.start,
      transform: [{ scale: progress.value * (MAX_RADIUS / RADIUS) }],
    };
  });

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colorSelection.previous.start,
      }}
    >
      <Animated.View style={style} />
    </View>
  );
};

export default Background;
