import React, { useState } from "react";
import { Text, View } from "react-native";
import { Audio } from "expo-av";

import { onPressPlay } from "../../Audio/audio";
import CheckAudio from "./CheckAudio/CheckAudio";

import styles from "./style";

const CheckAudioAttachment = ({
                                uri,
                                sound,
                                setUri,
                                setSound,
                                creation,
                                checkStatus,
                                audioDuration,
                                setAudioDuration,
                                setCheckStatusAudio,

}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [value, setValue] = useState(0);

  const minutes = Math.trunc((audioDuration-value)/60000);
  let seconds = Math.floor(((audioDuration-value)/60000 - minutes ) * 60);
  if(seconds < 10) {
    seconds = `0${seconds}`;
  }

  const handleDeleteAudio = () => {
    setSound(() => new Audio.Sound());
    setUri(null);
    setAudioDuration(null);
    setCheckStatusAudio(false);
  };
  // console.log(audioDuration, '-- duration');
  return (
    <View style={styles.check_audio_container}>
      <CheckAudio
        onPress={() =>
          onPressPlay(sound, uri, isPlaying, setIsPlaying, value, setValue)
        }
        value={value}
        sound={sound}
        setValue={setValue}
        creation={creation}
        isPlaying={isPlaying}
        checkStatus={checkStatus}
        setIsPlaying={setIsPlaying}
        audioDuration={audioDuration}
        handleDelete={() => handleDeleteAudio()}
      />
      <Text style={creation ? styles.text_duration : styles.text_duration_detail }>
        {minutes}:{seconds}
       </Text>
    </View>
  );
};

export default CheckAudioAttachment;
