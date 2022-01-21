import COLORS from "../../constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    height: '85%',
    width: '100%',
    paddingHorizontal: '10%',
    alignItems: "center",
    justifyContent: 'space-between'
  },
  container: {
    paddingTop: 90,
    width: "100%",
    alignItems: "center",
    justifyContent: 'space-between'
  },
  informTextContainer: {
    marginTop: '25%'
  },
  buttonContainer: {
    width: '100%',
    marginBottom: '5%',
    // marginTop: "100%"
  },
  errorsStyle: {
    textAlign: "center",
    fontSize: 14,
    color: COLORS.main,
    marginBottom: 7
  }
});
