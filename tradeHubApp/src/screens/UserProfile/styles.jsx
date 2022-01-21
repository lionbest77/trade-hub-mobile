import {Dimensions, StyleSheet} from 'react-native';
import COLORS from '../../constants/Colors';
let {height, width} = Dimensions.get('window');
export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: '#fff'
  },
  container: {
    height: '100%',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 37,
  },

  formContainer: {
    width: '100%',
    paddingHorizontal: 30,
  },
  formContainerSmall: {
    width: '100%',
  },
  delimiterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchText: {
    fontSize: (width >= 600) ?  25 : width <= 350 ? 13 : 15,
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: COLORS.informText,
    textAlign: 'center',
  },
  switchContainer: {
    paddingLeft: 60,
    paddingRight: 30,
    marginTop: 15,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userControl: {
    marginTop: 41,
    marginBottom: 41,
    alignItems: 'flex-end',
  },

  registrationInputLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 15,
    color: COLORS.informText,
  },

  registrationInput: {
    backgroundColor: COLORS.inputBackground,
    paddingLeft: '2%',
    fontSize: 13,
    width: '100%',
    height: 44,
    marginHorizontal: 0,
    paddingRight: 20,
    borderRadius: 12,
    borderColor: 'transparent',
  },

  errorsStyle: {
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.main,
    marginBottom: 7,
    marginTop: 9,
  },
  containerStyle: {
    backgroundColor: COLORS.inputBackground,
    height: 44,
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  placeholderStyle: {
    color: '#000',
    fontSize: 13,
    fontWeight: 'bold',
  },
  arrowStyle: {
    position: 'absolute',
    right: 24,
    bottom: 18,
    zIndex: 1,
  },
  labelStyle: {
    fontSize: 13,
    color: COLORS.informText,
    marginBottom: 12,
  },

  line: {
    width: '100%',
    height: 2,
    backgroundColor: COLORS.informText,
  },
  overlayContainer: {
    height: 230,
    width: '90%',
    borderRadius: 10,
    paddingTop: 50,
    paddingBottom: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonsContainer2: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
