import React from "react";
import { StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import calender from "./calender";
import Square from "./Square";

const { MAX_HEIGHT, MAX_BOX_HEIGHT, SIZE, width } = calender;

const StickyShapes = () => {
  const isOnTop = useSharedValue(true);
  const sticked = useSharedValue(true);
  const sticking = useDerivedValue(() => withSpring(sticked.value ? 1 : 0));

  const translateY = useSharedValue(0);
  const progress = useDerivedValue(
    () =>
      sticking.value *
      interpolate(
        translateY.value,
        [0, MAX_BOX_HEIGHT],
        [0, 1],
        Extrapolate.CLAMP
      )
  );

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({ translationY }) => {
      translateY.value = translationY;
      if (translateY.value > MAX_BOX_HEIGHT) sticked.value = false;
    },
    onEnd: ({ velocityY }) => {
      const dest = snapPoint(translateY.value, velocityY, [0, MAX_HEIGHT]);
      translateY.value = withSpring(dest, { velocityY }, () => {
        sticked.value = true;
        if (dest !== 0) {
          isOnTop.value = !isOnTop.value;
          translateY.value = 0;
        }
      });
    },
  });

  const square = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: (1 - sticking.value) * translateY.value }],
    };
  });

  const container = useAnimatedStyle(() => ({
    transform: [{ rotate: isOnTop.value ? "0deg" : "180deg" }],
  }));

  return (
    <Animated.View style={[styles.container, container]}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[StyleSheet.absoluteFill, square]}>
          <Square {...{ progress }} />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: (width - SIZE) / 2,
    top: 0,
    bottom: 0,
    width: SIZE,
  },
});

export default StickyShapes;
