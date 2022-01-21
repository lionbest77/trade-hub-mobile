import {Dimensions, StyleSheet} from 'react-native';
let { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: '0.5%',

  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 75,
    right: 30,
  },
  emptyTendersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tendersContainer: {
    height: 160,
    width: 250,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: (width <= 350) ? '2%' : 0,
  },
});
