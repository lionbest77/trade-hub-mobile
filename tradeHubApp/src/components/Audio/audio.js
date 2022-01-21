import { Audio } from "expo-av";
import { Platform } from "react-native";

export const RECORDING_OPTIONS_PRESET_HIGH_QUALITY = {
  android: {
    extension: ".m4a",
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000
  },
  ios: {
    extension: ".m4a",
    outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false
  }
};

export const prepareToRecord = async (
  audioDuration,
  setRecordStatus,
  recording,
  setRecording,
  setAudioDuration,
  setUri,
  sound,
  setAudioData
) => {
  const { status } = await Audio.requestPermissionsAsync();

  if (status === "granted") {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: Platform.OS === "ios" && true,
      staysActiveInBackground: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false
    });

    await startRecord(
      setRecordStatus,
      recording,
      setRecording,
      setAudioDuration,
      setUri,
      sound,
      setAudioData
    );
  } else {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      shouldDuckAndroid: false
    });
  }
};

export const startRecord = async (
  setRecordStatus,
  recording,
  setRecording,
  setAudioDuration,
  setUri,
  sound,
  setAudioData
) => {
  setRecordStatus(true);

  try {
    await recording.prepareToRecordAsync(RECORDING_OPTIONS_PRESET_HIGH_QUALITY);

    await recording.startAsync();
    setTimeout(
      () =>
        stopRecord(
          recording,
          setRecordStatus,
          setAudioDuration,
          setRecording,
          setUri,
          sound,
          setAudioData
        ),
      300000
    );
  } catch (error) {
    console.log(error);
  }
};

export const stopRecord = async (
  recording,
  setRecordStatus,
  setAudioDuration,
  setRecording,
  setUri,
  sound,
  setAudioData
) => {
  try {
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false
    });
    await setRecordStatus(false);
    // console.log("RECORDING ====> ", recording);

    setAudioDuration(recording._finalDurationMillis);
    const uri = { uri: await recording.getURI() };
    await setAudioData({
      ...uri,
      durationMillis: recording._finalDurationMillis
    });
    // console.log(uri, '-----uri from function');
    await setUri(uri);
    await sound.loadAsync(uri, {}, true);
    setRecording(() => new Audio.Recording());

  } catch (e) {
    console.log(e);
  }
};

export const onPressPlay = async (
  sound,
  uri,
  isPlaying,
  setIsPlaying,
  value,
  setValue
) => {
  setIsPlaying(!isPlaying);

  //get properties of Sound Instance
  let soundStatus = await sound.getStatusAsync();

  //Watcher for Sound Instance statuses and forward position to the Slider
  try {
    sound._onPlaybackStatusUpdate = status => {
      if (status.isPlaying) {
        setValue(status.positionMillis);
      }
      if (status.didJustFinish && !status.isLooping) {
        setValue(0);
        setIsPlaying(false);
      }
      if (status.error) {
        console.log(
          `Encountered a fatal error during playback: ${status.error}`
        );
      }
    };
  } catch (e) {
    console.log(e.message);
  }

  // Control for audio reproduction

  if (isPlaying) {
    await sound.pauseAsync();
  } else {
    if (soundStatus.positionMillis === soundStatus.durationMillis) {
      await sound.replayAsync();
    } else {
      if (value) {
        await sound.playFromPositionAsync(value);
      }
      await sound.playAsync();
    }
  }
};

