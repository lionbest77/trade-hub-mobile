import React from "react";
import { View } from "react-native";

import COLORS from "../../constants/Colors.js";
import { styles } from "./style";

import i18n from '../../services/localization'

const ProgressBar = props => {
  const state = props.state;

  return (
    <View style={styles.barContainer}>
      <View
        style={
          state === i18n.t('new_processing') || state === "new" || state === 0
            ? { ...styles.barIndicator, backgroundColor: COLORS.main }
            : { ...styles.barIndicator }
        }
      />
      <View
        style={
          state === i18n.t('requires_confirm') ||
          state === "approvalRequired" ||
          state === 1
            ? { ...styles.barIndicator, backgroundColor: COLORS.main }
            : { ...styles.barIndicator }
        }
      />

      <View
        style={
          state === i18n.t('confirmed') || state === "approved" || state === 2
            ? { ...styles.barIndicator, backgroundColor: COLORS.main }
            : { ...styles.barIndicator }
        }
      />
      <View
        style={
          state === i18n.t('choice_supplier') ||
          state === "supplierSelection" ||
          state === 3
            ? { ...styles.barIndicator, backgroundColor: COLORS.main }
            : { ...styles.barIndicator }
        }
      />
      <View
        style={
          state === i18n.t('docs') || state === "contract" || state === 4
            ? { ...styles.barIndicator, backgroundColor: COLORS.main }
            : { ...styles.barIndicator }
        }
      />

      <View
        style={
          state === i18n.t('delivery_expected') || state === "delivery" || state === 5
            ? { ...styles.barIndicator, backgroundColor: COLORS.main }
            : { ...styles.barIndicator }
        }
      />

      <View
        style={
          state === i18n.t('delivery_success') ||
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
