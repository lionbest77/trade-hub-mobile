import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../../constants/Colors";
let { width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    // marginBottom: 30,
    marginHorizontal: 36
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',

  },

  mainContentLabel: {
    fontSize: (width <= 350) ?  13 : 16,
    fontWeight: "bold",
    marginBottom: 5
  },

  descLabel: {
    color: COLORS.informText,
    fontSize: (width <= 350) ?  10 : 13,
    fontWeight: "bold"
  },
  title: {
    marginBottom: 19,
    fontSize: (width <= 350) ?  12 : 14,
    textAlign: 'left'
  },

  dateContainer: {
    flexDirection: width >= 600 ? "column" : "row",
  },

  dateSubContainer: {
    flex: 1,
  },
  tenderTitle: {
    marginTop: 13,
    marginBottom: 19
  },

  textTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 26
  },

  descriptionLabel: {
    color: COLORS.informText,
    marginLeft: 28,
    marginBottom: 12,
    fontWeight: "bold"
  },

  tenderDescriptionContainer: {
    marginLeft: 26,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 40
  },
  tenderDescription: {
    fontSize: 15
  },

  filesContainer: {
    marginBottom: 50
  },

  files: {
    marginTop: 15,
    flexDirection: "row"
  },

  file: {
    backgroundColor: "#f0f3f5",
    borderRadius: 10,
    borderColor: "rgba(171, 186, 191, 0.4)",
    borderWidth: 0.5,
    paddingHorizontal: 15,
    flexDirection: "row",
    paddingVertical: 12,
    marginVertical: 8,
    marginRight: 14,
  },

  audioWrapper: {
    marginTop: 15,
    flexDirection: "row",
  },

  audio: {
    flexDirection: "row",
    marginRight: 15
  },

  audioCounter: {
    marginTop: '6%',
    marginRight: '5%'
  },

  buttonContainer: {
    marginHorizontal: 26
  },
  buttonContainer1: {
    marginHorizontal: 26,
  },
  tenderTooltip: {
    fontSize: 14,
    color: COLORS.main,
    marginTop: 21,
    fontWeight: "bold"
  }
});
