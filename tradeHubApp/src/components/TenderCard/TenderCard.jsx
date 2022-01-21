import React from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";

import MicrophoneIcon from "../../ui/icons/MicrophoneIcon";
import ArrowRightIcon from "../../ui/icons/ArrowRightIcon";
import colorByStatus from "../TenderStateCases/colorByStatus.js";
import statusChecker from "../TenderStateCases/statusChecker.js";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import MainButton from "../../components/buttons/MainButton/MainButton";
import ChatIcon from "../../ui/icons/ChatIcon";
import ClipIcon from "../../ui/icons/ClipIcon";

import { styles } from "./style.js";

const TenderCard = (props) => {
  const {
    _id,
    internal_id,
    name,
    status_code,
    created_at,
    description,
    } = props.tender;

  const tender = props.tender;

  // console.log(tender, '-----tender');

  const userId = props.userData.user_ID;
  const tenderId = props.tender._id;
  let unread = props.unread;

  // console.log(unread, '-----------------------tender Card props');

  let countOfDocuments = tender.files.length ? tender.files.length : null;
  let createData = new Date(created_at);

  let fullData = {
    day: createData.getDate() < 10 ? `0${createData.getDate()}` : createData.getDate(),
    month: (createData.getMonth() + 1) < 10 ? `0${createData.getMonth() + 1}` : (createData.getMonth() + 1),
    year: createData.getFullYear(),
    hour: createData.getHours() < 10 ? `0${createData.getHours()}` : createData.getHours(),
    minutes: createData.getMinutes() < 10 ? `0${createData.getMinutes()}` : createData.getMinutes(),
  };

  let minutes, seconds;
  if (tender.audio) {
    minutes = Math.trunc((tender.audio.metadata.audioObject.durationMillis) / 60000);
    seconds = Math.floor(((tender.audio.metadata.audioObject.durationMillis) / 60000 - minutes) * 60);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
  }
  const newState = statusChecker(status_code);
  const colorIndicator = colorByStatus(status_code);

  return (
    <View style={styles.container}>
      <View style={styles.tenderHeader}>
        <View
          style={{
            ...styles.tenderStatusIndicator,
            backgroundColor: colorIndicator,
          }}
        />

        <View style={styles.subWrapper}>
          <View style={styles.tenderStatusWrapper}>
            <Text
              style={{
                ...styles.tenderHeaderTitle,
                color: colorIndicator,
              }}
            >
              {newState}
            </Text>

            <View style={styles.progressBarContainer}>
              <ProgressBar state={newState} />
            </View>
          </View>

          <View style={styles.tenderLeftContainer}>
            <Text style={styles.date}>
              {fullData.day}.{fullData.month}.{fullData.year} {fullData.hour}:{fullData.minutes}
            </Text>
            <Text style={styles.orderNumber}>Заявка № {internal_id}</Text>
          </View>
        </View>
      </View>

      <View style={styles.tenderTitle}>
        <Text style={styles.textTitle}>{name}</Text>
      </View>

      <Text style={styles.descriptionLabel}>Опис</Text>

      <View style={styles.filesContainer}>
        <View style={styles.file}>
          <ClipIcon style={styles.fileIcon} />
          <Text style={styles.fileText}>{countOfDocuments}</Text>
        </View>
        <View style={styles.file}>
          <MicrophoneIcon style={styles.voiceIcon} />
          <Text style={styles.fileText}>{tender.audio && (`${minutes}:${seconds}`)}</Text>
        </View>
      </View>

      <View style={styles.tenderDescriptionContainer}>
        <Text
          style={styles.tenderDescription}
          numberOfLines={5}
          ellipsizeMode={"tail"}
        >
          {description}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={{ width: "40%" }}>
          <MainButton
            icon={<ChatIcon />}
            width={"100%"}
            label={"Чат"}
            backgroundColor={"#fff"}
            leftBorderNone={true}
            containerLeftChat={true}
            counter={"4"}
            onPress={() =>
              props.navigation.navigate("Chat", {
                tenderId,
                internal_id,
                created_at,
                from: 'Main'
              })
            }
          />
           <Text style={unread <= 9 ? styles.counter : styles.counter2}>{unread > 9 ? "9+" : unread === 0 ? null : unread}</Text>
        </View>

        <View style={{ width: "50%" }}>
          <MainButton
            icon={<ArrowRightIcon />}
            backgroundColor={"#fff"}
            rightBorderNone={true}
            width={"100%"}
            label={"Детальніше"}
            containerRight={true}
            onPress={() =>props.navigation.navigate("TenderDetails", { _id, tender, from: 'Main' })}
          />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData.userData,
});

export default connect(mapStateToProps)(TenderCard);
