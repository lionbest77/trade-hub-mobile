import {Dimensions, StyleSheet} from 'react-native';
import COLORS from '../../../constants/Colors';

let {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    // borderBottomWidth: 0.2,
    // borderBottomColor: COLORS.main,
    // height: 25,
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: (width >= 600) ?  20 : width <= 350 ? 13 : 16,
    fontWeight: 'bold',
    color: COLORS.main,
    marginLeft: 12,
  },
});