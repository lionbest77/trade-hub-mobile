import {Dimensions, StyleSheet} from 'react-native';
import COLORS from '../../../constants/Colors'
let {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: (width >= 600) ?  "10%" : '25%',
    position: 'relative',
    backgroundColor: '#fff',
    height: 60,
    width: '100%',
    borderRadius: 15,
    shadowColor: COLORS.informText,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 3,
    shadowOpacity: .9,
    elevation: 20,
  },
circleContainer: {
  position: 'absolute',
  left: -10,
  borderRadius: 50,
  height: 71,
  width: 71,
  backgroundColor:COLORS.main,
  alignItems: 'center',
  justifyContent: 'center',
 },
  subCircleContainer: {
    borderRadius: 50,
    height: 50,
    width: 50,
    backgroundColor: COLORS.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 3,
    shadowOpacity: .9,
    elevation: 20,
    },
text: {
    fontWeight: "bold",
    fontSize: 16,
},
  buttonPressedCircle: {
    backgroundColor: "rgba(229, 26, 75, 0.5)",
  }

});

export default styles;
