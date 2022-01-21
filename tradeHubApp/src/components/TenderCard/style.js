import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../constants/Colors";
let { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    borderColor: "rgba(151, 173, 182, 0.2)",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: COLORS.informText,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 10,
    marginHorizontal: 4,
    marginVertical: 20,
    backgroundColor: COLORS.tenderCard,
  },
  tenderHeader: {
    marginTop: 9,
    flexDirection: "row",
  },

  tenderHeaderTitle: {
    fontWeight: "bold",
    fontSize:  width <= 330 ? 11 : 14,
  },

  subWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
  },

  tenderStatusIndicator: {
    backgroundColor: COLORS.informText,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    width: 5,
    height: 39,
    marginRight: 21,
  },

  progressBarContainer: {
    marginTop: 9,
  },

  tenderLeftContainer: {
    marginTop: 12,
    alignItems: "flex-end",
    marginRight: 28,
  },
  date: {
    fontWeight: "500",
    color: COLORS.informText,
    fontSize: width <= 330 ? 10 : 12,
  },
  orderNumber: {
    fontSize: width >= 600 ? 18 : width <= 330 ? 10 : 12,
    marginTop: 3,
    color: "#828282",
  },
  tenderTitle: {
    marginTop: 13,
    marginLeft: 26,
    marginBottom: 19,
  },

  textTitle: {
    fontWeight: "bold",
    fontSize: width >= 600 ? 28 : 18,
  },

  descriptionLabel: {
    color: COLORS.informText,
    marginLeft: 28,
    marginBottom: 12,
    fontWeight: "bold",
  },

  tenderDescriptionContainer: {
    marginLeft: 26,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 40,
  },
  tenderDescription: {
    fontSize: width >= 600 ? 25 : 15,
  },

  filesContainer: {
    flexDirection: "row",
    marginLeft: 27,
  },

  counter: {
    fontWeight: "bold",
    position: "absolute",
    top: height >= 700 ? '33%' : 20,
    left:  width >= 400 ? "30%" : width >= 380 ? "29%" : width >= 350 ? '27%' : "26%",
    fontSize: width >= 350 ? 13 : 12,
    color: "#fff",
  },
  counter2: {
    fontWeight: "bold",
    position: "absolute",
    top: height >= 700 ? '34%' : '33%',
    left:  width >= 380 ? "28%" : width >= 350 ? '26%' : "24%",
    fontSize: width >= 350 ? 12 : 11,
    color: "#fff",
  },

  file: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f3f5",
    borderRadius: 10,
    borderColor: "rgba(171, 186, 191, 0.4)",
    borderWidth: 0.5,
    paddingHorizontal: 15,
    flexDirection: "row",
    paddingVertical: 12,
    marginRight: 7,
  },

  fileText: {
    fontSize: 14,
    color: "#828282",
    paddingLeft: 7,
    fontWeight: "bold",
  },

  buttonContainer: {
    marginBottom: 22,
    flexDirection: "row",
    // marginLeft: 13,
    // marginRight: 13,
    justifyContent: "space-between",
  },
});
