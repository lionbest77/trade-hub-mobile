import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

import COLORS from "../../../constants/Colors";
import { styles } from "./styles";

const MoreInfoButton = ({
                          onPress,
                          height = 60,
                          width = "100%",
                          disabled = false,
                          leftElem = null,
                          rightElem = null,
                          leftBorderNone = false,
                          rightBorderNone = false,
                          backgroundColor = COLORS.main
                        }) => {

  const [isPress, setIsPress] = useState(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => setIsPress(true)}
      onPressOut={() => setIsPress(false)}
      disabled={false}
      activeOpacity={1}
    >
      <View
        style={[
          { ...styles.buttonContainer, width, backgroundColor, height },
          isPress && styles.buttonPressed,
          disabled && { backgroundColor: COLORS.disableBtnColor },
          leftBorderNone && {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
          },
          rightBorderNone && {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
          }
        ]}
      >
        <View>{leftElem}</View>
        <View>{rightElem}</View>
      </View>
    </TouchableOpacity>
  );
};

export default MoreInfoButton;
