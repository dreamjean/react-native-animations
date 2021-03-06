import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const COLOR_WIDTH = width / 3;
const RADIUS = 45;

export default {
  width,
  height,
  COLOR_WIDTH,
  RADIUS,
};
