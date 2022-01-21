import COLORS from "../../../constants/Colors";
import {Dimensions, StyleSheet} from 'react-native';
let {height, width} = Dimensions.get('window');
export const styles = StyleSheet.create({
  button: {
    height: (width >= 600) ?  70 : 60,
    paddingHorizontal: 21,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: (width >= 600) ? "center"  : "flex-start",
    borderRadius: 15,
    shadowColor: COLORS.informText,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 10
  },
  text: {
    marginLeft: 27,
    fontSize: (width >= 600) ? 22 : (width <= 340) ? 13: 16,
    color: COLORS.informText,
    fontWeight: 'bold',
  },
  buttonPressed: {
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: .4,
    elevation: 5,
  },
});
