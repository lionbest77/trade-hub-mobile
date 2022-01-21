import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../constants/Colors";
let { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  mainContainer: {
    paddingBottom: "30%",
    height: "100%",
    width: "100%",
    paddingHorizontal: "10%",
    alignItems: "center",
    justifyContent: "space-between"
  },
  // errorsStyle: {
  //   textAlign: "center",
  //   fontSize: width >= 600 ? 20 : 13,
  //   color: COLORS.main
  // },
  informStylesContainer: {
    marginVertical: "6%"
  },
  // text: {
  //   fontSize: 16,
  //   color: COLORS.informText,
  //   fontWeight: "bold"
  // },
  buttonContainer: {
    alignItems: "center"
  },
  errorsStyle: {
    textAlign: "center",
    fontSize: 14,
    color: COLORS.main,
    marginBottom: 7
  },
  registrationInput: {
    paddingLeft: 20,
    fontSize: 13,
    width: "100%",
    height: 44,
    marginHorizontal: 0,
    backgroundColor: COLORS.inputBackground,
    paddingRight: 20,
    borderRadius: 12,
    borderColor: "transparent",
    // marginBottom: '5%',
    fontWeight: "bold",
    lineHeight: 20
  },

  overlayContainer: {
    height: 230,
    width: "90%",
    borderRadius: 10,
    paddingTop: 50,
    paddingBottom: 20,
    justifyContent: "space-between",
    paddingHorizontal: 5
  },

  text: {
    fontSize: 16,
    color: COLORS.informText,
    textAlign: "center"
  },

  buttonsContainer: {
    width: "100%",
    alignItems: "center"
  }
});
