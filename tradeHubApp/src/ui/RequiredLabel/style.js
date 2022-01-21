
import COLORS from "../../constants/Colors";
import {StyleSheet} from "react-native";

export  const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    // paddingTop: "5%",
    // backgroundColor: "#FFF",
    // flex:1,
  },
  text: {
    fontSize: 16,
    color: COLORS.informText,
    fontWeight: 'bold',
  }
});