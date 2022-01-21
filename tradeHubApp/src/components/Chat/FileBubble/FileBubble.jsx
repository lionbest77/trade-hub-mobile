import React from "react";
import {Text, View, TouchableOpacity, Image} from 'react-native';

import { styles } from "./style";
import { DEFAULT_URL } from "../../../constants/Req.js";

import Contract from "../../../ui/icons/Contract.js";
import { downloadHelper } from "../../../helpers/download/downloadHelper.js";

const allowedFileTypes = ['png', 'jpg', 'svg', 'gif'];

const FileBubble = (props) => {
  // console.log(props);

  const url = `${DEFAULT_URL}${props.file}`;
  const rightPosition = props.rightPosition;

  let createData = new Date(props.time);

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

  return (

    <View style={rightPosition ? styles.rigth  : styles.left}>
      <Text style={styles.msg}>{props.text}</Text>
      {allowedFileTypes.includes(props.fileExtension) ? (
        <TouchableOpacity onPress={() => downloadHelper(url)}>
          <Image source={{ uri: `${DEFAULT_URL}${props?.file}` }} style={styles.img} resizeMode='contain' />
        </TouchableOpacity>
      ) : (
        <View style={styles.fileContainer}>
          <View>
            <TouchableOpacity onPress={() => downloadHelper(url)}>
              <View style={styles.iconContainer}>
                <Contract />
              </View>
            </TouchableOpacity>
          </View>
          <Text ellipsizeMode='head' numberOfLines={1} style={styles.fileName}>
            {props.fileName}.{props.fileExtension}
          </Text>
        </View>
      )}
      <View style={styles.timeContainer}>
        <Text
          style={styles.time}
        >{`${fullData.day}.${fullData.month}.${fullData.year}`}</Text>
        <Text
          style={styles.time}
        >{`${fullData.hour}:${fullData.minutes}`}</Text>
      </View>
    </View>
  );
};

export default FileBubble;
