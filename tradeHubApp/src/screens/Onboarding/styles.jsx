import {StyleSheet} from 'react-native';
import COLORS from '../../constants/Colors';

export const styles = StyleSheet.create({
  pageContainer: {
    flex: 0,
    paddingBottom: 40,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    position: 'relative',
  },
  dot: {
    backgroundColor: '#C4C4C4',
    height: 9,
    width: 9,
    marginLeft: 6,
    marginRight: 6,
    marginBottom: '27%',
  },
  dotActive: {
    backgroundColor: COLORS.main,
    height: 9,
    width: 9,
    marginLeft: 6,
    marginRight: 6,
    marginBottom: '27%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  contentImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  contentText: {
    height: '20%',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
    textAlign: 'center',
    justifyContent: 'center',
    color: '#000',
  },
  contentContainer: {
    height: '60%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});