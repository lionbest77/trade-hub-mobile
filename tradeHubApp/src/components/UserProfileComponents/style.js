import {Dimensions, StyleSheet} from 'react-native';
import COLORS from '../../constants/Colors';

let {height, width} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 37
  },

  formContainer: {
    width: "100%",
    paddingHorizontal: 30,
    marginTop: 18,
  },
  formContainerSmall: {
    width: "100%",
    marginTop: 18,
  },
  delimiterContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  switchText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: COLORS.informText,
    alignItems: 'center',
  },
  switchContainer: {
    paddingLeft: 60,
    paddingRight: 30,
    marginTop: 15,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  userControl: {
    marginTop: 41,
    marginBottom: 41,
    alignItems: "flex-end"
  },

  registrationInputLabel: {
    fontSize: (width >= 600) ?  20 : 13,
    fontWeight: 'bold',
    marginBottom: '5%',
    color: COLORS.informText
  },

  registrationInput: {
    backgroundColor: COLORS.inputBackground,
    paddingLeft: "2%",
    fontSize: (width >= 600) ?  20 : 13,
    width: "100%",
    height: (width >= 600) ?  64 : 44,
    marginHorizontal: 0,
    borderRadius: 12,
    borderWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: COLORS.informText,
  },

  errorsStyle: {
    textAlign: "center",
    fontSize: (width >= 600) ?  20 : 13,
    color: COLORS.main,
    marginBottom: 7,
    marginTop: 9
  },
  containerStyle: {
    backgroundColor: COLORS.inputBackground,
    height: 44,
    width: "100%",
    borderRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 24
  },
  placeholderStyle: {
    color: "#000",
    fontSize: 13,
    fontWeight: "bold"
  },
  arrowStyle: {
    position: "absolute",
    right: 24,
    bottom: 18,
    zIndex: 1
  },
  labelStyle: {
    fontSize: (width >= 600) ?  20 : 13,
    color: COLORS.informText,
    marginBottom: 12
  },

  line: {
    marginVertical: 5,
    width: '100%',
    height: 2,
    backgroundColor: COLORS.informText
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
  },
});
