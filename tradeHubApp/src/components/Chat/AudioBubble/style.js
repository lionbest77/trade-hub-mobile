import { StyleSheet } from "react-native";
import COLORS from "../../../constants/Colors";

export const styles = StyleSheet.create({
  user: {
    alignItems: "flex-end"
  },
  left: {
    maxWidth: "80%",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 3,
    marginRight: 13,
    backgroundColor: "#F7F8F9",
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E7E7E7"
  },
  right: {
    maxWidth: "80%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 3,
    marginRight: 13,
    backgroundColor: "#F8E6EA",
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E7E7E7"
  },

  time: {
    color: COLORS.secondary,
    fontSize: 12,
    marginLeft: "10%"
  },
  timeContainer: {
    // alignItems: "flex-end",
    marginTop: "5%",
    flexDirection: "row",
    marginLeft: "55%"
  },
  fileContainer: {
    flexDirection: "row"
  },

  fileName: {
    marginLeft: "5%",
    marginTop: "5%"
  },

  iconContainer: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.finished,
    backgroundColor: COLORS.secondary
  },
  msg: {
    marginVertical: "3%"
  }
});
