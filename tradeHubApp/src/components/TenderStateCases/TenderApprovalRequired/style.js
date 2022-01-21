import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../../constants/Colors";
let { height, width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
   },

  contentContainer: {
    marginHorizontal: 36,
    paddingBottom: '2%',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',

  },

  mainContentLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },

  descLabel: {
    color: COLORS.informText,
    marginBottom: 7,
    fontSize: 13,
    fontWeight: "bold"
  },

  title: {
    marginBottom: 19,
    fontSize: 14
  },

  dateContainer: {
    flexDirection: width >= 600 ? "column" : "row"
  },

  dateSubContainer: {
    justifyContent: "space-between",
    flex: 1
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

  files: {
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
    width: width >= 600 ? "40%" : "80%"
  },

  audioWrapper: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 30
  },

  audio: {
    flexDirection: "row",
    marginRight: 15
  },

  audioCounter: {
    marginTop: 10,
    marginRight: 5
  },

  buttonContainer: {
    marginHorizontal: "10%",
    marginVertical: "4%",
  },

  tenderTooltip: {
    fontSize: 14,
    color: COLORS.main,
    marginTop: 21,
    fontWeight: "bold",
    paddingBottom: 120
  }
});
