import React from "react";
import { View } from "react-native";

import COLORS from "../../constants/Colors.js";
import { styles } from "./style";

const ProgressBar = props => {
  const state = props.state;

  return (
    <View style={styles.barContainer}>
      <View
        style={
          state === "Новий. Очікує обробки" || state === "new" || state === 0
            ? { ...styles.barIndicator, backgroundColor: COLORS.main }
            : { ...styles.barIndicator }
        }
      />
      <View
        style={
          state === "Вимагає підтвердження" ||
          state === "approvalRequired" ||
          state === 1
            ? { ...styles.barIndicator, backgroundColor: COLORS.main }
            : { ...styles.barIndicator }
        }
      />

      <View
        style={
          state === "Підтверджений" || state === "approved" || state === 2
            ? { ...styles.barIndicator, backgroundColor: COLORS.main }
            : { ...styles.barIndicator }
        }
      />
      <View
        style={
          state === "Вибір постачальника" ||
          state === "supplierSelection" ||
          state === 3
            ? { ...styles.barIndicator, backgroundColor: COLORS.main }
            : { ...styles.barIndicator }
        }
      />
      <View
        style={
          state === "Документи" || state === "contract" || state === 4
            ? { ...styles.barIndicator, backgroundColor: COLORS.main }
            : { ...styles.barIndicator }
        }
      />

      <View
        style={
          state === "Доставка очікується" || state === "delivery" || state === 5
            ? { ...styles.barIndicator, backgroundColor: COLORS.main }
            : { ...styles.barIndicator }
        }
      />

      <View
        style={
          state === "Доставка успішна" ||
          state === "successfulDelivery" ||
          state === 6
            ? { ...styles.barIndicator, backgroundColor: COLORS.finished }
            : { ...styles.barIndicator }
        }
      />
    </View>
  );
};

export default ProgressBar;
