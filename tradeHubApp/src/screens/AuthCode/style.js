import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../constants/Colors";
let { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    height: "85%",
    width: "100%",
    paddingHorizontal: "10%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "5%"
  },
  container: {
    width: "100%",
    paddingHorizontal: "10%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between"
  },
  informText: {
    paddingTop: 90
  },
  codeInputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  codeInput: {
    borderBottomColor: COLORS.main,
    borderStyle: "solid",
    borderBottomWidth: 2,
    width: 40,
    textAlign: "center",
    paddingTop: 14,
    fontSize: 36,
    color: "#333",
    fontWeight: "bold",
    marginTop: 15
  },

  errorsStyle: {
    textAlign: "center",
    fontSize: width >= 600 ? 20 : 13,
    color: COLORS.main
  },
  buttonContainer: {
    // marginTop: '62%',
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
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
  text: {
    fontSize: 16,
    color: COLORS.informText,
    textAlign: "center"
  },
});

export default styles;
