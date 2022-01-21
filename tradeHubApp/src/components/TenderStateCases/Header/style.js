import {Dimensions, StyleSheet} from 'react-native';
import COLORS from "../../../constants/Colors";
let {height, width} = Dimensions.get('window');
export const styles = StyleSheet.create({
  tenderHeader: {
    marginTop: 9,
    flexDirection: "row"
  },

  tenderHeaderTitle: {
    fontWeight: "bold",
    color: COLORS.main
  },
  subWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1
  },

  tenderStatusIndicator: {
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    width: 5,
    height: 39,
    marginRight: 36
  },

  progressBarContainer: {
    marginTop: 9
  },

  arrowContainer: {
    marginTop: 12,
    alignItems: "flex-end",
    marginRight: 31
  },

  tenderLeftContainer: {
    alignItems: "flex-end",
    marginRight: 31
  },

  date: {
    fontWeight: "500",
    color: COLORS.informText,
    fontSize: 12
  },
  orderNumber: {
    fontSize: 12,
    marginTop: 3,
    color: "#828282"
  },

  shortInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  descriptionLabel: {
    color: COLORS.informText,
    marginLeft: 36,
    marginBottom: 12,
    fontWeight: "bold"
  },

  tenderDescriptionContainer: {
    marginLeft: 36,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 40
  },
  tenderDescription: {
    fontSize: 15
  },

  filesContainer: {
    flexDirection: "row",
    marginLeft: 36
  },

  file: {
    backgroundColor: "#f0f3f5",
    borderRadius: 10,
    borderColor: "rgba(171, 186, 191, 0.4)",
    borderWidth: 0.5,
    paddingHorizontal: 15,
    flexDirection: "row",
    paddingVertical: 12,
    marginRight: 7
  },

  fileText: {
    fontSize: 13,
    color: "#828282",
    paddingLeft: 7,
    fontWeight: "bold"
  },

  borderContainer: {
    borderColor: "rgba(151, 173, 182, 0.2)",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: COLORS.informText,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 10,
    marginHorizontal: 4,
    marginVertical: 15,
    backgroundColor: "#fff"
  },

  tenderTitle: {
    marginTop: 13,
    marginBottom: 19,
    marginLeft: 36,

  },

  textTitle: {
    fontWeight: "bold",
    fontSize: (width >= 600) ?  25: 18,
  }
});
