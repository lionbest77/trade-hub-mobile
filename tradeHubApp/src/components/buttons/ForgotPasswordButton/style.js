import COLORS from "../../../constants/Colors"
import {Dimensions, StyleSheet} from 'react-native';
let {height, width} = Dimensions.get('window');
export  const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  text: {
    fontSize: (width >=600) ? 18 :14,
    color: COLORS.main,
    fontWeight: 'bold',
  }
});