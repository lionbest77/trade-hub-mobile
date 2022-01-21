import React from "react";
import { Image, StyleSheet } from "react-native";
const logoIcon = require("../../assets/images/Logo/logo.svg");

const Logo = () => {
  return <Image style={styles.logo} source={logoIcon}></Image>;
};

const styles = StyleSheet.create({
  logo: {
    marginVertical: 58,
    marginHorizontal: 26
  }
});

export default Logo;
