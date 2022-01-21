import {Dimensions, StyleSheet} from 'react-native';
let {height, width} = Dimensions.get('window');
export const styles = StyleSheet.create({
  tabText: {
    fontSize: (width >=600)? 18 : (width <= 340) ? 12 :13,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 7,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  }
});