import React from "react";
import {Text, View, TouchableOpacity} from 'react-native';

import { styles } from "./style";

const ForgotPasswordButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.text}>Забули пароль?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordButton;
