import React, { useEffect, useRef} from "react";
import {
  Alert,
  Animated,
  View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./style";
import COLORS from "../../../../constants/Colors";

import BasketIcon from "../../../../ui/icons/BasketIcon";
import MainButton from "../../../buttons/MainButton/MainButton";
import { AudioSlider } from "../AudioSlider/AudioSlider";

import i18n from '../../../../services/localization'

const CheckAudio = ({
                      value,
                      sound,
                      onPress,
                      setValue,
                      creation,
                      isPlaying,
                      checkStatus,
                      handleDelete,
                      setIsPlaying,
                      audioDuration
}) => {
  const handlerDeleteAudio = () => {
    Alert.alert(i18n.t('audio_will_deleted'), i18n.t('delete_file'), [
      { text: i18n.t('yes'), onPress: () => handleDelete() },
      { text: i18n.t('no'), onPress: () => {} }
    ]);
  };

  const onHandlerSlider = async value => {
    await sound.stopAsync();
    setIsPlaying(false);
  };

  const playIcon = <Ionicons name="ios-play" size={30} color={COLORS.main} />;
  const pauseIcon = <Ionicons name="ios-pause" size={30} color={COLORS.main} />;

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    try {
      Animated.timing(opacity, {
        toValue: checkStatus ? 1 : 0,
        duration: 200,
        useNativeDriver: true
      }).start();
    }catch (e) {
      Alert.alert("Check Audio", `${e.response.data}`, [
        { text: i18n.t('ok') }
      ]);
    }
  }, [checkStatus]);

  return (
    <Animated.View style={{ opacity }}>
      <View style={styles.check_audio_container}>
        <View
          style={{
            width: "17%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <MainButton
            backgroundColor={"#fff"}
            width={"100%"}
            height={55}
            onPress={onPress}
            icon={isPlaying ? pauseIcon : playIcon}
          />
        </View>

        <View style={{ width: creation ? "60%" : "80%" }}>
          <MainButton
            backgroundColor={"#fff"}
            width={"100%"}
            height={55}
            icon={
              <AudioSlider
                audioDuration={audioDuration}
                value={value}
                setValue={setValue}
                onHandlerSlider={onHandlerSlider}
              />
            }
          />
        </View>
        {creation ? (
          <View style={{ width: "17%" }}>
            <MainButton
              backgroundColor={COLORS.deleteBasket}
              width={"100%"}
              height={55}
              onPress={handlerDeleteAudio}
              icon={<BasketIcon />}
            />
          </View>
        ) : null}
      </View>
    </Animated.View>
  );
};

export default CheckAudio;
