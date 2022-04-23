import React from "react";
import COLORS from "../../../constants/Colors";
import MainHeader from "../MainHeader/MainHeader";
import MainButton from "../../buttons/MainButton/MainButton";
import ArrowLeftIcon from "../../../ui/icons/ArrowLeftIcon";
import { Text, View, StyleSheet } from "react-native";

import { connect } from "react-redux";
/*import { leaveRoom } from "../../../services/chatService.js";*/

import i18n from '../../../services/localization'

const ChatHeader = (props) => {
/*  const userId = props.userData.user_ID;
  const tenderId = props.navigation.state.params.tenderId;*/
  const createData = props.navigation.state.params.created_at;
  const request = `${i18n.t('order')} №${props.navigation.state.params.internal_id}`;

/*  const socket = props.socket;*/

  let date = new Date(createData);

  let fullData = {
    day: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
    month:
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1,
    year: date.getFullYear(),
    hour: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
    minutes:
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
  };

  const rightComponent = (
    <View style={styles.container}>
      <Text style={styles.dateText}>
        {fullData.day}.{fullData.month}.{fullData.year} {fullData.hour}:{fullData.minutes}
      </Text>
      <Text style={styles.requestText}>{request}</Text>
    </View>
  );

  return (
    <View>
      <MainHeader
        leftComponent={
          <MainButton
            icon={<ArrowLeftIcon color={"#000"} />}
            leftBorderNone
            backgroundColor={"#FBFBFB"}
            shadowOpacity={0.4}
            width={80}
            onPress={() => {
          /*    leaveRoom(tenderId, userId, socket); */
              props.navigation.navigate("Main", {refresh: Date.now()});
            }}
          />
        }
        rightComponent={rightComponent}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData.userData,
  socket: state.setSocket.socket
});

export default connect(mapStateToProps)(ChatHeader);

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    height: 40,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  dateText: {
    fontSize: 12,
    color: COLORS.informText,
    fontWeight: "500",
  },
  requestText: {
    fontSize: 12,
    color: "#828282",
    fontWeight: "500",
  },
});
