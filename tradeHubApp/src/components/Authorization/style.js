import COLORS from "../../constants/Colors";
import {Dimensions, StyleSheet} from 'react-native';
let {height, width} = Dimensions.get('window');
export const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: '10%',
    backgroundColor: "#fff",
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    marginTop: 1,
    width: "80%",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  text: {
    fontSize: 16,
    color: COLORS.informText,
    fontWeight: "bold"
  },
  buttonContainer: {
    // marginBottom: '3%',
    alignItems: "center",
    justifyContent: "center"
  },
  inputContainer: {
    marginVertical: '5%',
    width: "100%",
  },
  policyText: {
    fontSize: (width >=600)? 18 :13,
    color: COLORS.main,
    fontWeight: "bold",
  },
   policyContainer: {
     width: '100%',
     flexDirection: 'row',
     alignItems:'center',
     justifyContent: 'flex-start',
     marginBottom: (width >=600)? "11%" : '7%',
     marginTop: (width >=600)? "35%" : "10%"
   },
   bottomContainer: {
     width: '100%',
     alignItems:'center',
     justifyContent: "center"
   }
});