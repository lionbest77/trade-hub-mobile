import { StyleSheet } from 'react-native';
import COLORS from '../../constants/Colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dateContainer: {
    paddingVertical: 15,
    paddingLeft: 60,
  },
  mainRowContainer: {
    paddingTop: 16,
    paddingBottom: 10,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 15,
  },
  row: {
    marginHorizontal: 11,
    height: 2,
    width: 22,
    marginTop: 9,
  },
  rowTenderText: {
    color: '#828282',
    fontSize: 12,
  },
  rowTenderTextRead: {
    color: COLORS.disableBtnColor,
    fontSize: 12,
  },
  rowTitleText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    width: '90%',
  },
  rowTitleTextRead: {
    fontSize: 15,
    color: COLORS.disableBtnColor,
    lineHeight: 22,
    width: '90%',
  },
  rowDateText: {
    color: '#C2C2C2',
    fontSize: 12,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  removeContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    height: '100%',
    width: 120,
    justifyContent: 'center',
  },
  removeButtonContainer: {
    height: 60,
    width: 60,
    backgroundColor: '#F8E6EA',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    alignItems: 'center',
    justifyContent: 'center',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 32,
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
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
    marginTop: -40
  },
});