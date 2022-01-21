import {Dimensions, StyleSheet} from 'react-native';
import COLORS from "../../../constants/Colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: 36,
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

  labelContainer: {
    marginTop: 37
  },

  // overlay

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
  }
});
