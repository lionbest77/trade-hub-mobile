import { Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");

export default {
  screen: {
    width,
    height
  },
  isSmallDevice: width <= 365 || height <= 800,
  statusBarHeight: getStatusBarHeight()
};
