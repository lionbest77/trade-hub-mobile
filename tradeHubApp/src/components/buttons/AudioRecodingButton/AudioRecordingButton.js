import React, {useEffect, useRef} from 'react';
import {
  Animated,
  TouchableOpacity,
  Text,
  View} from 'react-native';

import MicrophoneIcon from '../../../ui/icons/MicrophoneIcon';
import styles from './style';

const AudioRecordingButton = ({
                                onPressOut,
                                recordStatus,
                                }) => {

  const position = useRef(new Animated.ValueXY({x: -15, y: 0})).current;

  useEffect(() => {
      Animated.timing(position, {
      toValue: recordStatus ? {x: 0, y: 0} : {x: -15, y: 0},
      duration: 600,
    }).start();
  }, [recordStatus]) ;

  return (
      <Animated.View style={position.getLayout()}>
      <TouchableOpacity
          onPressOut={onPressOut}
          activeOpacity={1}
      >

      <View style={styles.mainContainer}>

        <Text style={styles.text}> "Йде запис"  </Text>
        <View style={[styles.circleContainer, recordStatus && styles.buttonPressedCircle]}>

          <View style={styles.subCircleContainer}>
            <MicrophoneIcon color={'#fff'}/>
          </View>

        </View>

      </View>
      </TouchableOpacity>
      </Animated.View>
  );
};

export default AudioRecordingButton;