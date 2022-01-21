import {Dimensions, StyleSheet} from 'react-native';
import COLORS from "../../../constants/Colors";
let {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: '7%',
    },
   inputContainer: {
    textAlignVertical: 'top',
    width: '100%',
    backgroundColor: COLORS.inputBackground,
    paddingLeft: '2%',
     paddingVertical: '3%',
    borderRadius: 12,
    borderWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: COLORS.informText,
    marginBottom: 16,
    fontSize: (width >= 600) ?  20 :  13,
  },
  paste_icon: {
    position: 'absolute',
    bottom: 21,
    right: 13
  }
});

export default styles;
