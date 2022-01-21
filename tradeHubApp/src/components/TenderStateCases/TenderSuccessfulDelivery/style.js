import { StyleSheet } from "react-native";
import COLORS from "../../../constants/Colors";

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    borderColor: "rgba(151, 173, 182, 0.2)",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: COLORS.informText,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 3,
    marginHorizontal: 4,
    marginVertical: 20,
    backgroundColor: "#ECECEC"
  }
});
