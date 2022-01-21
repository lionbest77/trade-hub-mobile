import React from "react";
import {Text, StyleSheet, Dimensions} from 'react-native';
import COLORS from "../../constants/Colors.js"

let {width} = Dimensions.get('window');


const InformText = ({ children, style }) => (
  <Text style={[{...styles.informText, ...style}]}>{children}</Text>
);

const styles = StyleSheet.create({
  informText: {
    fontSize: (width >= 600) ?  25 : 16,
    color: COLORS.disableBtnColor,
    textAlign: "center",
    fontWeight: 'bold',
  }
});

export default InformText;
