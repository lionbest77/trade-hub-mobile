import { Dimensions, StyleSheet } from "react-native";
let { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '3%'
  },

  text: {
    fontSize: (width <= 350) ?  10 : 14
  }

});
