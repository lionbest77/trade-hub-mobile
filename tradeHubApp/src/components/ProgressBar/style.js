import COLORS from "../../constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  barContainer: {
    alignItems: "flex-start",
    flexDirection: "row"
  },
  barIndicator: {
    height: 7,
    width: 7,
    backgroundColor: COLORS.informText,
    marginRight: 7,
    borderRadius: 50
  }
});
