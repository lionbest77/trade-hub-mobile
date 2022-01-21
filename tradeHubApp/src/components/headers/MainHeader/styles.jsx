import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headerContainer: {
    height: 80,
    paddingVertical: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  leftComponent: {
    width: "35%",
    alignItems: "flex-start"
  },
  rightComponent: {
    width: "35%",
    alignItems: "flex-end"
  }
});
