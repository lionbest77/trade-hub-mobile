import React, { useState } from "react";
import { View, Text } from "react-native";

import { styles } from "./style.js";
import ProgressBar from "../../ProgressBar/ProgressBar";
import statusChecker from "../statusChecker.js";
import colorByStatus from "../colorByStatus.js";

const HeaderStatus = (props) => {
  const {
    status_code,
    internal_id,
    created_at } = props.tender;

  const [arrowState, setArrowState] = useState(false);

  const updatedStatus = statusChecker(status_code);
  const color = colorByStatus(status_code);

  let createData = new Date(created_at);

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
    <View
      style={styles.tenderHeader}
      onPress={() => setArrowState(!arrowState)}
    >
      <View
        style={{ ...styles.tenderStatusIndicator, backgroundColor: color }}
      />

      <View style={styles.subWrapper}>
        <View style={styles.tenderStatusWrapper}>
          <Text style={{ ...styles.tenderHeaderTitle, color }}>
            {updatedStatus}
          </Text>

          <View style={styles.progressBarContainer}>
            <ProgressBar state={status_code} />
          </View>
        </View>

        <View style={styles.tenderLeftContainer}>
          <Text style={styles.date}>
            {fullData.day}.{fullData.month}.{fullData.year} {fullData.hour} :{" "}
            {fullData.minutes}
          </Text>
          <Text style={styles.orderNumber}>Замовлення № {internal_id}</Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderStatus;
