import React, { useState } from "react";
import { View, Text } from "react-native";

import { styles } from "./style.js";

import WoodPickerArrow from "../../../ui/icons/WoodpickerArrow";

const Header = props => {
  const { name } = props.tender;
  const [arrowState, setArrowState] = useState(false);

  return (
    <View style={styles.shortInfoContainer}>
      <View style={styles.tenderTitle}>
        <Text style={styles.textTitle}>{name}</Text>
      </View>
      <View
        style={
          arrowState
            ? {
                ...styles.arrowContainer,
                transform: [{ rotate: "-90deg" }]
              }
            : styles.arrowContainer
        }
      >
        <WoodPickerArrow />
      </View>
    </View>
  );
};

export default Header;
