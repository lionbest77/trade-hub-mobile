import React, { useState } from "react";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";

import { styles } from "./styles";
import COLORS from "../../../constants/Colors";
import ChatIcon from "../../../ui/icons/ChatIcon";

const MainButton = ({
  backgroundColor = COLORS.main,
                      color,
                      onPress,
                      height = 60,
                      width = "100%",
                      ellipsizeMode,
                      shadowOpacity = 1,
                      smallFontSize = 18,
                      icon = null,
                      label = null,
                      counter = null,
                      disabled = false,
                      containerLeft = false,
                      containerRight = false,
                      leftBorderNone = false,
                      rightBorderNone = false,
                      containerLeftChat = false
}) => {

  const [isPress, setIsPress] = useState(false);

  return (
    <TouchableOpacity
        style={{ width: "100%" }}
        onPress={onPress}
        onPressIn={() => setIsPress(true)}
        onPressOut={() => setIsPress(false)}
        activeOpacity={1}
    >
      <View
        style={[
          {
            ...styles.buttonContainer,
            width,
            backgroundColor,
            height,
            shadowOpacity
          },
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
        {containerLeftChat ? (
          <View style={styles.iconText}>
            <ChatIcon style={styles.chatIcon}>
              <Text style={styles.counter}>{counter}</Text>
            </ChatIcon>

            <Text style={styles.smallerText}>{label}</Text>
          </View>
        ) : containerLeft ? (
          <View style={styles.iconText}>
            {icon}
            <Text
              style={[
                { ...styles.smallerText, fontSize: smallFontSize, color }
              ]}
            >
              {label}
            </Text>
          </View>
        ) : containerRight ? (
          <View style={styles.iconText}>
            <Text
              numberOfLines={1}
              ellipsizeMode={ellipsizeMode}
              style={styles.smallerText}
            >
              {label}
            </Text>
            {icon}
          </View>
        ) : icon ? (
          icon
        ) : (
          <Text style={styles.text}>{label}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MainButton;
