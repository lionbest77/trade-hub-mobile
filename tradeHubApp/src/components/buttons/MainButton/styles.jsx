import {Dimensions, StyleSheet} from 'react-native';
import COLORS from "../../../constants/Colors";

let {height, width} = Dimensions.get('window');
export const styles = StyleSheet.create({
  buttonContainer: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
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
  text: {
    color: "#fff",
    fontSize: (width >=600)? 22 :18,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center"
  },

  iconText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',

    },

  smallerText: {
    fontSize: (width >=600)? 20 : width <= 330 ? 12 : 15,
    fontWeight: "bold",
    paddingHorizontal: 15,
  },

  chatIcon: {
    // marginRight: 10
  },

  counter: {
    position: "absolute",
    fontSize: (width >= 600) ?  12 : 7,
    top: 10,
    left: 10,
    color: "#000",
    fontWeight: "bold"
    // alignItems: "center",
    // justifyContent: "center"
  }
});
