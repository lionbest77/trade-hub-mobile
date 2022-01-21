import React from 'react';

import {Composer} from 'react-native-gifted-chat';
import {Platform, StyleSheet, Dimensions, View } from 'react-native';

import COLORS from '../../../constants/Colors';
import {AudioBox} from './audioBox';
import {AttachBox} from './AttachBox';

const device = Platform.OS;
let { width } = Dimensions.get("window");

export const RenderComposer = (props) =>{
  const {
    sound,
    setUri,
    document,
    recording,
    freeSpace,
    recordStatus,
    setRecording,
    setAudioData,
    setDocument,
    setFreeSpace,
    audioDuration,
    setRecordStatus,
    setAudioOverlay,
    setAttachOverlay,

  } = props.extraData;

  const styles = StyleSheet.create({
    composerMain: {
      top: recordStatus ? 0 : width <=330 ? 18: 10,
      right: recordStatus ? 10 : 25,
      position: "absolute",
      flexDirection: "row-reverse"
    },
  });

  return (
     <View>
        <Composer
            {...props}
            multiline={true}
            textInputAutoFocus={false}
            maxLength = {1000}
            textInputProps={{
                maxLength: 1000
            }}
            textInputStyle={[
              {
                width: width*0.8,
                position: 'relative',
                textAlign: 'left',
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "#D3D3D3",
                paddingRight: '25%',
                backgroundColor: "#F7F8F9",
                marginHorizontal: 10,
                paddingHorizontal: 15
              },
              device === "ios" && {
                paddingLeft: 10,
              }
             ]}
            placeholderTextColor={recordStatus ? COLORS.main : COLORS.informText}
          />
        <View style={styles.composerMain}>
          <View style={{marginHorizontal: '5%'}}>
            <AudioBox
                sound = {sound}
                setUri = {setUri}
                recording = {recording}
                setRecording ={setRecording}
                recordStatus = {recordStatus}
                setAudioData = {setAudioData}
                audioDuration = {audioDuration}
                setAudioOverlay={setAudioOverlay}
                setAudioDuration = {setAudioData}
                setRecordStatus = {setRecordStatus}
            />
          </View>
          {!recordStatus &&
          <View style={{marginHorizontal: '5%'}}>
            <AttachBox
                document={document}
                freeSpace={freeSpace}
                setDocument={setDocument}
                setFreeSpace={setFreeSpace}
                setAttachOverlay={setAttachOverlay}
            />
          </View>
          }
           </View>
     </View>
  )
};



