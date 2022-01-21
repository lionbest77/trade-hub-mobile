import React from "react";
import { Text, Image, View } from "react-native";
import { styles } from "./styles";

const Tab = ({ buttonIndex, selectedIndex, alignmentRight = false, label }) => (
  <View
    style={[
      styles.tabContainer,
      alignmentRight && { justifyContent: "flex-end" }
    ]}
  >
    {buttonIndex === selectedIndex && (
      <Image source={require("../../assets/images/dash.png")} />
    )}
    <Text
      style={[
        styles.tabText,
        buttonIndex !== selectedIndex && { color: "#C2C2C2" }
      ]}
    >
      {label}
    </Text>
  </View>
);

export default Tab;
