import COLORS from "../../constants/Colors";
import { Dimensions, StyleSheet } from "react-native";
let { height, width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "10%"
  },

  formContainer: {
    marginTop: "5%",
    width: "100%"
  },

  delimiterContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 16,
    color: COLORS.informText,
    textAlign: "center"
  },
  userControl: {
    marginTop: 41,
    marginBottom: 41,
    alignItems: "flex-end"
  },

  registrationInputLabel: {
    fontSize: width >= 600 ? 20 : 13,
    marginBottom: "5%",
    color: COLORS.informText
  },

  registrationInput: {
    fontSize: width >= 600 ? 20 : 13,
    paddingLeft: "2%",
    width: "100%",
    height: width >= 600 ? 64 : 44,
    backgroundColor: COLORS.inputBackground,
    paddingRight: 20,
    borderRadius: 12,
    borderWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: COLORS.informText,
    marginBottom: width >= 600 ? 45 : 16
  },

  errorsStyle: {
    textAlign: "center",
    fontSize: width >= 600 ? 20 : 13,
    color: COLORS.main,
    marginBottom: 16
  },
  containerStyle: {
    backgroundColor: COLORS.inputBackground,
    height: width >= 600 ? 64 : 44,
    width: "100%",
    borderRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 24,
    borderWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: COLORS.informText
  },
  placeholderStyle: {
    color: "#000",
    fontSize: 13,
    fontWeight: "bold"
  },
  arrowStyle: {
    position: "absolute",
    right: 24,
    bottom: width >= 600 ? 28 : 18,
    zIndex: 1
  },
  labelStyle: {
    fontSize: width >= 600 ? 20 : 13,
    color: COLORS.informText,
    marginBottom: 12
  },
  overlayContainer: {
    height: 230,
    width: "90%",
    borderRadius: 10,
    paddingTop: 50,
    paddingBottom: 20,
    justifyContent: "space-between",
    paddingHorizontal: 0
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center"
  },
  pikerInput: {
    width: '100%'
  }
});
