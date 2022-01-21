import React from "react";
import { Bubble, InputToolbar, Send } from "react-native-gifted-chat";
import {Text, View, StyleSheet, Dimensions} from 'react-native';

import COLORS from "../constants/Colors";
import FileBubble from "../components/Chat/FileBubble/FileBubble.jsx";
import MessageIcon from "../ui/icons/MessageIcon";

let {width } = Dimensions.get("window");

export const renderSend = (props) => {
  return (
    <View>
      {props.recordStatus ? null : (
        <Send
          {...props}
          alwaysShowSend={true}
          containerStyle={{
            width: width*0.15,
            backgroundColor: COLORS.main,
            borderRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            activeOpacity={1}
          >
            <MessageIcon />
          </View>
        </Send>
      )}
    </View>
  );
};

export const renderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    containerStyle={{
      borderTopColor: "transparent",
      margin: 0,
      marginBottom: 7,
      padding: 0,
     }}
  />
);

export const renderBubble = (props) => {
  // console.log(props);

  let createData = new Date(props.currentMessage.created_at);

  let fullData = {
    day:
        createData.getDate() < 10
            ? `0${createData.getDate()}`
            : createData.getDate(),
    month:
        createData.getMonth() + 1 < 10
            ? `0${createData.getMonth() + 1}`
            : createData.getMonth() + 1,
    year: createData.getFullYear(),
    hour:
        createData.getHours() < 10
            ? `0${createData.getHours()}`
            : createData.getHours(),
    minutes:
        createData.getMinutes() < 10
            ? `0${createData.getMinutes()}`
            : createData.getMinutes(),
  };

  const styles = StyleSheet.create({
    timeContainer: {
      width: '100%',
      position: 'absolute',
      right: (props.user._id === props.currentMessage.user._id) ? '5%' : '38%' ,
      bottom: 0,
      justifyContent: 'flex-end',
      flexDirection: "row",
    },

    time: {
      color: COLORS.secondary,
      fontSize: 12,
      marginLeft: "3%"
    }});

  return (
    <>
      {props.currentMessage.isFile ? (
        <FileBubble
          fileName={props.currentMessage.file.filename}
          file={props.currentMessage.file.path}
          text={props.currentMessage.text}
          time={props.currentMessage.created_at}
          fileExtension={props.currentMessage.file.extension}
          user={props.currentMessage.user._id}
          rightPosition={props.user._id === props.currentMessage.user._id}
        />
       ) : (
    <View>
          <Bubble
              {...props}
              wrapperStyle={{
                left: {
                  maxWidth: '80%',
                  backgroundColor: "#eff0f1",
                  paddingHorizontal: 22,
                  paddingVertical: 8,
                 },
                right:   {
                  maxWidth: '80%',
                  backgroundColor: '#FFDCDF',
                  paddingHorizontal: 22,
                  paddingVertical: 8,
                 }
              }}
              containerStyle={{
                left: {
                  marginBottom: 20,
                  marginTop: 10,
                  position: 'relative'
                },
                right: {
                  marginBottom: 20,
                  marginTop: 10,
                  position: 'relative'
                }
              }}
              textStyle={{
                right: {
                  color: '#000',
                },
              }}
              renderUsernameOnMessage={true}
            />
  <View style={styles.timeContainer}>
              <Text style={styles.time}>{`${fullData.day}.${fullData.month}.${fullData.year}`}</Text>
              <Text style={styles.time}>{`${fullData.hour}:${fullData.minutes}`}</Text>
  </View>
</View>
      )}

    </>
  );
};
