import {Dimensions, StyleSheet} from 'react-native';
import COLORS from '../../../constants/Colors';
let {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    backgroundColor: COLORS.inputBackground,
    paddingLeft: '1%',
    fontSize: (width >= 600) ?  20 : 13,
    borderRadius: 12,
  },
  inputContainer: {
    paddingLeft: "2%",
    width: '100%',
    height: (width >= 600) ?  64 : 44,
    backgroundColor: COLORS.inputBackground,
    paddingRight: '2%',
    borderRadius: 12,
    borderWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: COLORS.informText,
    marginBottom: 16,


  }, textInputError: {
    color: COLORS.main,
    backgroundColor: COLORS.inputBackground,
    paddingLeft: '2%',
    fontSize: (width >= 600) ?  20 : 13,
    borderRadius: 12,
  },
  inputContainerError: {
    width: '100%',
    height: 44,
    marginHorizontal: 0,
    backgroundColor: COLORS.inputBackground,
    paddingLeft: '2%',
    borderRadius: 12,
    marginBottom: 16,
    borderBottomWidth: 0.5,
    borderColor: COLORS.main,
    borderWidth: 0.5,
  }, errorStyle: {
    textAlign: 'center', fontSize: 14, color: COLORS.main,
    // marginBottom: '4%',
  },

});

export default styles;
