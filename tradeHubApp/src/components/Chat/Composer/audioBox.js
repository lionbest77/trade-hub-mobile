import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MicrophoneIcon from '../../../ui/icons/MicrophoneIcon';
import COLORS from '../../../constants/Colors';
import {prepareToRecord, stopRecord} from '../../Audio/audio';

export const AudioBox = ({
                           recordStatus,
                           setRecordStatus,
                           audioDuration,
                           recording,
                           setRecording,
                           setAudioDuration,
                           setUri,
                           sound,
                           setAudioData,
                           setAudioOverlay
                         }) => {

  return (recordStatus ? (<View style={[styles.circleContainer, recordStatus && styles.buttonPressedCircle]}>
            <TouchableOpacity
            onPress={  () => {
               stopRecord(
                  recording,
                  setRecordStatus,
                  setAudioDuration,
                  setRecording,
                  setUri,
                  sound,
                  setAudioData,
              ).then(() => setAudioOverlay(true))
            }}
            >
              <View style={styles.subCircleContainer}>
                <MicrophoneIcon color={'#fff'}/>
              </View>
            </TouchableOpacity>
          </View>)
          :
          (<View>
            <TouchableOpacity
            onPress={() => {
              prepareToRecord(
                  audioDuration,
                  setRecordStatus,
                  recording,
                  setRecording,
                  setAudioDuration,
                  setUri,
                  sound,
                  setAudioData
              );
              setRecordStatus(true);
            }
               }
            >
              <MicrophoneIcon/>
            </TouchableOpacity>
          </View>)
  );
};

const styles = StyleSheet.create({
  circleContainer: {
    left: -10,
    height: 41,
    width: 41,
    position: 'absolute',
    alignItems: 'center',
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: COLORS.main,
  },
  subCircleContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.main,
  },
});