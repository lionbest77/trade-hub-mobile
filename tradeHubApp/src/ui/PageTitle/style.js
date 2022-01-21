import {StyleSheet} from 'react-native';
import COLORS from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

  },
  line: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 22,
    height: 2,
    backgroundColor: COLORS.main,
    marginRight: "2%",
  },
  text: {
    textTransform: 'uppercase',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',


  },
});

