import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { clamp, mix, polar2Canvas } from "react-native-redash";

const R = Dimensions.get("window").width / 4;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    backgroundColor: "#64bee6",
    width: 2 * R,
    height: 2 * R,
    borderRadius: R,
    opacity: 0.6,
  },
});

const transform = (progress, index) => {
  "worklet";

  const theta = (index * Math.PI) / 3; // 每個圓中心點的角度
  const { x, y } = polar2Canvas({ theta, radius: R }, { x: 0, y: 0 });

  const translateX = mix(progress, 0, x);
  const translateY = mix(progress, 0, y);
  const scale = mix(progress, 0.3, 1);

  return [{ translateX }, { translateY }, { scale }];
};

const Circle = ({ index, progress, goesDown }) => {
  const style1 = useAnimatedStyle(() => {
    const progress1 = goesDown.value
      ? clamp(progress.value + 0.1, 0, 1)
      : progress.value; // 給第一層視圖增加延遲,圖形變小時,真實圖形到90%時,第一層視圖延遲0.1,停留在100%,clamp（）確保運動軌跡保持在0~1之間的變化,不會超過100%

    const opacity = interpolate(
      progress1,
      [0.6, 1],
      [0, 0.5],
      Extrapolate.CLAMP
    ); // 圖形變小時消失

    return {
      transform: transform(progress1, index),
      opacity,
    };
  });

  const style2 = useAnimatedStyle(() => {
    return {
      transform: transform(progress.value, index),
    };
  });

  return (
    <>
      <Animated.View style={[styles.container, style1]}>
        <View style={styles.circle} />
      </Animated.View>
      <Animated.View style={[styles.container, style2]}>
        <View style={styles.circle} />
      </Animated.View>
    </>
  );
};

export default Circle;
