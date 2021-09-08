import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { mix } from "react-native-redash";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, {
  Defs,
  LinearGradient,
  Mask,
  Path,
  Rect,
  Stop,
} from "react-native-svg";

import calender from "../calender";
import Row from "./Row";
import StaticTabbar, { SIZE } from "./StaticTabbar";

const { width: winWidth } = calender;
const R = SIZE / 4;
const COLOR = "#02CBD6";
const END_COLOR = "#00B4D4";
const WIDTH = 3.14 * SIZE;
const HEIGHT = 3.5 * SIZE;

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  icon: {
    width: SIZE,
    height: SIZE,
    borderRadius: R,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: (winWidth - WIDTH) / 2,
    width: WIDTH,
    height: HEIGHT,
    alignItems: "center",
  },
  items: {
    height: HEIGHT - SIZE,
    justifyContent: "space-evenly",
  },
});

const arc = (x, y, reverse = false) =>
  `a ${R} ${R} 0 0 ${reverse ? 0 : 1} ${x} ${y}`;

const S = SIZE - 2 * R;
const W_2 = (WIDTH - SIZE) / 2 - 2 * R;

const d = [
  `M 0 ${R}`,
  arc(R, -R),
  `h ${WIDTH - 2 * R}`,
  arc(R, R),
  `v ${HEIGHT - SIZE - 2 * R}`,
  arc(-R, R),
  `h ${-W_2}`,
  arc(-R, R, true),
  `v ${S}`,
  arc(-R, R),
  `h ${-S}`,
  arc(-R, -R),
  `v ${-S}`,
  arc(-R, -R, true),
  `h ${-W_2}`,
  arc(-R, -R),
  "Z",
].join(" ");

const Tabbar = ({ open }) => {
  const insets = useSafeAreaInsets();

  const animatedProps = useAnimatedProps(() => {
    const height = mix(open.value, SIZE, HEIGHT);
    const width = interpolate(
      height,
      [2 * SIZE, HEIGHT],
      [SIZE, WIDTH],
      Extrapolate.CLAMP
    );
    const x = interpolate(width, [SIZE, WIDTH], [(WIDTH - SIZE) / 2, 0]);
    const y = interpolate(height, [SIZE, HEIGHT], [HEIGHT - SIZE, 0]);

    return {
      rx: R,
      ry: R,
      width,
      height,
      x,
      y,
    };
  });

  const icon = useAnimatedStyle(() => ({
    transform: [{ rotate: mix(open.value, -Math.PI / 4, 0) }],
  }));

  const content = useAnimatedStyle(() => ({
    opacity: interpolate(open.value, [0.75, 1], [0, 1], Extrapolate.CLAMP),
    transform: [{ translateY: mix(open.value, HEIGHT + insets.bottom, 0) }],
  }));

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => (open.value = withTiming(open.value === 1 ? 0 : 1))}
      >
        <View>
          <StaticTabbar />
          <View
            style={[styles.overlay, { paddingBottom: insets.bottom }]}
            pointerEvents="none"
          >
            <Svg width={WIDTH} height={HEIGHT}>
              <Defs>
                <LinearGradient
                  id="gradient"
                  x1={WIDTH / 2}
                  y1={0}
                  x2={WIDTH / 2}
                  y2={HEIGHT}
                  gradientUnits="userSpaceOnUse"
                >
                  <Stop offset={0} stopColor={END_COLOR} />
                  <Stop offset={1} stopColor={COLOR} />
                </LinearGradient>
                <Mask id="mask">
                  <AnimatedRect animatedProps={animatedProps} fill="white" />
                </Mask>
              </Defs>
              <Path d={d} fill="url(#gradient)" mask="url(#mask)" />
            </Svg>
          </View>
          <View style={[styles.overlay, { paddingBottom: insets.bottom }]}>
            <View style={styles.icon}>
              <Animated.View style={icon}>
                <Feather name="x" color="white" size={32} />
              </Animated.View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View
        style={[styles.content, { bottom: insets.bottom }, content]}
        pointerEvents="box-none"
      >
        <View style={styles.items}>
          <Row label="Mood check-in" icon="edit" />
          <Row label="Voice note" icon="mic" />
          <Row label="Add Photo" icon="image" />
        </View>
      </Animated.View>
    </>
  );
};

export default Tabbar;
