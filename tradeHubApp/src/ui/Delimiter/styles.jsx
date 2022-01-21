import {Dimensions, StyleSheet} from 'react-native';
let {height, width} = Dimensions.get('window');
export const styles = StyleSheet.create({
  text: {
    color: 'rgba(142, 142, 142, 0.83)',
    fontWeight: 'bold',
    fontSize: (width >= 600) ?  18 : 13,
    textTransform: 'uppercase',
  },
  line: {
    height: 1,
    backgroundColor: 'rgba(142, 142, 142, 0.55)',
    width: '38%',
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: '5%',
  },
});