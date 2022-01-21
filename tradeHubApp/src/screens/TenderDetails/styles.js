import {Dimensions, StyleSheet} from 'react-native';
let {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  contentContainer: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counter: {
    fontWeight: "bold",
    position: "absolute",
    top: height >= 700 ? '34%' : 20,
    left: width < 350 ? '22%' : width >= 350 ? '22%' : width >= 400 && "25%",
    fontSize: 12,
    color: "#f8f9fa",
  },

  counter2: {
    fontWeight: "bold",
    position: "absolute",
    top: height >= 700 ? '34%' : '33%',
    left: width < 350 ? '20%' : width >= 350 ? '21%' : width >= 400 && "23%",
    fontSize: 12,
    color: "#f8f9fa",
  },
});
