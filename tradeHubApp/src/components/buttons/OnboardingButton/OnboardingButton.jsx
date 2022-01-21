import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";

import { styles } from "./styles";

const OnboardingButton = ({
                            width,
                            onPress,
                            leftComponent,
                            rightComponent,
                            buttonLeveling,
                            leftBorderNone,
                            rightBorderNone,
                            backgroundColor,
                            shadowOpacity = 0.4
}) => {
  const [isPress, setIsPress] = useState(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => setIsPress(true)}
      onPressOut={() => setIsPress(false)}
      disabled={false}
      activeOpacity={1}
      style={{ width: "100%" }}
    >
      <View
        style={[
          {
            ...styles.buttonContainer,
            width,
            backgroundColor,
            shadowOpacity
          },
          isPress && styles.buttonPressed,
          rightBorderNone && {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0
          },
          leftBorderNone && {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
          },
          buttonLeveling && {
            flexDirection: "row",
            justifyContent: "space-between"
          }
        ]}
      >
        {leftComponent}
        {rightComponent}
      </View>
    </TouchableOpacity>
  );
};

export default OnboardingButton;
