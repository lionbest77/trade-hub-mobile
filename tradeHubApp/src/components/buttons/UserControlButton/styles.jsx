import {Dimensions, StyleSheet} from 'react-native';
import COLORS from '../../../constants/Colors';
let {height, width} = Dimensions.get('window');
export const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    height: 25,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: (width >= 600) ?  20 : width <= 350 ? 13 : 16,
    fontWeight: 'bold',
    color: COLORS.main,
    marginLeft: 12,
  },
});