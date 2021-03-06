import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const SIZE = 100;
const V_FACTOR = 2.5;
const H_FACTOR = 0.35;
const MAX_BOX_HEIGHT = SIZE * V_FACTOR;
const MAX_HEIGHT = height - SIZE;

export default {
  width,
  height,
  H_FACTOR,
  MAX_BOX_HEIGHT,
  MAX_HEIGHT,
  SIZE,
  V_FACTOR,
};
