import { StyleSheet } from "react-native";
import COLORS from "../../../constants/Colors";
export const styles = StyleSheet.create({
  buttonContainer: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    // padding: 5,
    shadowColor: COLORS.informText,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 10
  },
  buttonPressed: {
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 5
  },
  iconText: {
    width: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
  },

  smallerText: {
    // color: 'black',
    width: '70%',
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 2,
  },

});
