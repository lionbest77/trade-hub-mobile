import {StyleSheet} from "react-native";
import COLORS from '../../../constants/Colors';
export const styles = StyleSheet.create({
  buttonContainer: {
    height: 60,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 15,
    shadowColor: COLORS.informText,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    shadowOpacity: 0.4,
    elevation: 10
  },
  buttonPressed: {
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: .4,
    elevation: 5,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    width:'100%',
    textAlign:'center',
  }
});
