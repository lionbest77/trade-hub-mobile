import {StyleSheet} from 'react-native';
import COLORS from '../../../constants/Colors';

const styles = StyleSheet.create({
  check_audio_container: {
    width: '100%',
    },
  text_duration: {
    color: COLORS.informText, fontSize: 13, position: 'absolute', bottom:'-40%', right: '20%',
  },

  text_duration_detail: {
    color: COLORS.informText, fontSize: 13, position: 'absolute', bottom:'-40%', right: '5%',
  }

});

export default styles;

