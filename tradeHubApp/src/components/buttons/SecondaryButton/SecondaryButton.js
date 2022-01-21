import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import { styles } from "./style";

const SecondaryButton = ({
  onPress,
  icon = null,
  text = null,
  width = "100%"
}) => {
  const [isPress, setIsPress] = useState(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      onPressIn={() => setIsPress(true)}
      onPressOut={() => setIsPress(false)}
      style={{ width: "100%" }}
    >
      <View
        style={[{ ...styles.button, width }, isPress && styles.buttonPressed]}
      >
        <View>{icon}</View>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SecondaryButton;
