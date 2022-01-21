import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../../constants/Colors";
let { height, width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  tenderHeader: {
    marginTop: 9,
    flexDirection: "row"
  },

  tenderHeaderTitle: {
    fontWeight: "bold",
    color: COLORS.main
  },
  subWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1
  },

  tenderStatusIndicator: {
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    width: 5,
    height: 39,
    marginRight: 36
  },

  progressBarContainer: {
    marginTop: 9
  },

  tenderLeftContainer: {
    alignItems: "flex-end",
    marginRight: 31
  },

  date: {
    fontWeight: "500",
    color: COLORS.informText,
    fontSize: width >= 600 ? 20 : 12
  },
  orderNumber: {
    fontSize: width >= 600 ? 20 : 11,
    marginTop: 3,
    color: "#828282"
  }
});
