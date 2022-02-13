import {Dimensions, StyleSheet} from 'react-native';
import COLORS from "../../constants/Colors";
let { width, height } = Dimensions.get("window");

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
    backgroundColor: "#fff",
    paddingBottom: 15,
    width: width - 20,
  },
  topWrapper: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignContent: 'center',
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 19,
    paddingRight: 10,
    marginBottom: 5,
    width: '100%',
  },
  secTopWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 5,
    width: '100%',
  },
  titleWrapper:{
    width: '70%',
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 32,
    marginBottom: 5,
  },

  date: { color: COLORS.informText },

  desc: {
    color: COLORS.informText,
    marginBottom: 5,
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 32
  },
  val: { fontSize: 15, marginLeft: 32, marginBottom: 5 },
  approve: {
    marginRight: '5%',
    marginTop: '2%',
    width: 140,
  },
  approveText: {
    fontSize: width <=330 ? 11 : 14,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  productStatusText: {
    fontSize: width <= 330 ? 11 : 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  topTextImageWrapper: {
    // marginBottom: 22,
    flexDirection: "row",
    // marginLeft: 13,
    // marginRight: 13,
    justifyContent: "space-between",
  },
  deliverySuccessWrapper: {
    flexDirection: "row",
    marginBottom: 22,
    justifyContent: "space-between",
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
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 32,
    fontSize: 16,
    color: "#333",
    lineHeight: 22
  },
});
