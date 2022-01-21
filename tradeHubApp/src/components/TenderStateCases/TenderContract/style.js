import {Dimensions, StyleSheet} from 'react-native';
import COLORS from "../../../constants/Colors";

let { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    borderBottomColor: "rgba(151, 173, 182, 0.2)",
    borderBottomWidth: 1,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    shadowColor: COLORS.informText,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    width: "100%",
    paddingTop: 9,
    backgroundColor: "#fff"
  },
  buttonsContainer: {
    marginTop: 52,
    paddingHorizontal: "5%"
  },
  buttonWrapper: {
    marginVertical: "5%",
    borderColor: "rgba(151, 173, 182, 0.2)",
    borderWidth: 1,
    borderRadius: 15
  },
  extraWrapper: {
    flexDirection: "row"
  },
  downloadButton: {
    borderColor: "rgba(151, 173, 182, 0.2)",
    borderWidth: 1,
    borderRadius: 15,
    width: "70%",
    marginVertical: "5%"
  },
  shareButton: {
    borderColor: "rgba(151, 173, 182, 0.2)",
    borderWidth: 1,
    borderRadius: 15,
    width: "25%",
    marginLeft: "5%",
    marginVertical: "5%"
  },
  text: {
    color: "#333",
    fontSize: (width <= 350) ? 13 :16,
    fontWeight: "bold"
  },
  progressIndicator: {
    color: COLORS.informText,
    marginTop: 2
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
  buttonsContainer1: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text1: {
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 32,
    fontSize: 16,
    color: "#333",
    lineHeight: 22
  }
});
