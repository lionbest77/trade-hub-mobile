import {StyleSheet} from 'react-native';
import COLORS from '../../../../constants/Colors';

const styles = StyleSheet.create({

  check_audio_container: {
    width: '100%',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  container :{
    marginTop: -50,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',

   },
  mainContainerStyle: {
    marginTop: 20,
    height: "80%",
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  thumbStyle: {
    position: 'absolute',
    top: -10,
    height: 50,
    borderColor: COLORS.main,
  },
  itemStyle: {
    height: 20,

  },
  tenthItemStyle: {
    height: 24,
  }

});

export default styles;
