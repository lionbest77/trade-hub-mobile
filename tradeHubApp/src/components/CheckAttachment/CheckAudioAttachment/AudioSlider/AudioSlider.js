import React from 'react';
import {Slider} from 'react-native-elements';

import styles from './style';
import COLORS from '../../../../constants/Colors';
import AudioChart from '../../../../ui/icons/AudioChart';

export const AudioSlider = ({
    audioDuration,
    value,
    setValue,
    onHandlerSlider
                            }) => {
  return (
      <Slider
          value={value}
          style={styles.main}
          animateTransitions={true}
          trackImage={<AudioChart/>}
          thumbStyle={styles.thumbStyle}
          trackStyle={styles.trackStyle}
          minimumTrackTintColor={COLORS.main}
          maximumTrackTintColor={COLORS.deleteBasket}
          maximumValue={audioDuration ? audioDuration : 0}
          onSlidingComplete={(position)=> setValue(position)}
          onValueChange={(position)=> onHandlerSlider(position)}
      >

      </Slider>
  )
};