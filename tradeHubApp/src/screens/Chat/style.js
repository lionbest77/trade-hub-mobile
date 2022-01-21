import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../constants/Colors";
let { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  composerMain: {
    position: "absolute",
    // flexDirection: "row-reverse",
  },
  overlayContainer: {
    height: 230,
    width: '90%',
    borderRadius: 10,
    paddingTop: 40,
    paddingBottom: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 0,

  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonsContainer2: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text2: {
    fontSize: 16,
    color: COLORS.informText,
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
});
