import { StyleSheet } from "react-native";
import COLORS from "../../../constants/Colors";

export const styles = StyleSheet.create({
  buttonContainer: {
    height: 60,
    paddingHorizontal: '12%',
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 15,
    shadowColor: COLORS.informText,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 10
  },

  border: {
    borderColor: "rgba(151, 173, 182, 0.2)",
    borderWidth: 1
  },
  buttonPressed: {
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 5
  }
});
