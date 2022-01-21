import {Dimensions, Platform, StyleSheet} from 'react-native';
import COLORS from '../../constants/Colors';

let {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: width <= 350 ? '20%' : '10%',
    paddingTop: '10%',
    // backgroundColor: 'green'
  },

  mainContainer: {
    // backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  title: {
    width: '82%',
    marginBottom: 40,
  },

  subContainer: {
    paddingBottom: 60,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  subContainerStart: {
    paddingBottom: 40,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  startButtonsContainer: {
    flexDirection: 'row', justifyContent: 'space-between', width: '100%',
  },
  recordButtonsContainer: {
    flexDirection: 'row', justifyContent: 'flex-start', width: '100%',
  },
  text: {
    paddingLeft: '3%',
    marginBottom: '5%',
    marginTop: '10%',
    width: '100%',
    fontSize: 13,
    color: COLORS.informText,
    textAlign: 'left',
  },

  inputsContainer: {
    width: '82%', alignItems: 'center', justifyContent: 'flex-start',
  },
  inputsAddressContainer: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',

  },
  checkContainer: {
    // backgroundColor: 'red',
    position: 'absolute',
    right: 0,
    bottom: 0,

  },
  overlayContainer: {
    height: 230,
    width: '95%',
    borderRadius: 10,
    paddingTop: 50,
    paddingBottom: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textOverlay: {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 32,
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  pikerInput: {
    width: '100%',
  },
  containerStyle: {
    backgroundColor: COLORS.inputBackground,
    height: width >= 600 ? 64 : 44,
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 24,
    borderWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: COLORS.informText,
    marginBottom: 20,
  },
  placeholderStyle: {
    color: '#000',
    fontSize: 13,
  },
  textInputStyle: {
    color: '#a23bc1',

  },
  overlayInputsContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  tenderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems:'center'
  },
  tenderItemName: {
    fontSize: 13,
  },
  removeItemButton: {
    padding: 3,
    borderRadius: 5,
    borderColor: 'red',
    borderWidth: 1,
  },

  tabsContainer: {
    height: 50,
    borderWidth: 0,
  },
  buttonsGroupContainer: {
    backgroundColor: '#fff',
    borderWidth: 0,
  },
  productSearchInputLabel: {
    fontSize: width >= 600 ? 20 : 13,
    marginBottom: "5%",
    color: COLORS.informText
  },
  productSearchInput: {
    fontSize: width >= 600 ? 20 : 13,
    paddingLeft: "2%",
    width: "100%",
    height: width >= 600 ? 64 : 44,
    backgroundColor: COLORS.inputBackground,
    paddingRight: 20,
    borderRadius: 12,
    borderWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: COLORS.informText,
    marginBottom: width >= 600 ? 45 : 16
  },
  selectBySearchContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  selectBySearchContainerForm: {
    marginTop: "5%",
    width: "100%",
  },
  productItemContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.informText,
    width: "100%",
    paddingHorizontal: 4,
    paddingVertical: 10,
  },
  productItemText: {
    fontSize: width >= 600 ? 20 : 13,
    color: "black",
    paddingLeft: "2%",
    width: "100%",
  }
});

export default styles;
