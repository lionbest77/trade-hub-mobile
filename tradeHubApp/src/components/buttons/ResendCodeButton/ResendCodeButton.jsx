import React from "react";
import axios from "axios";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

import { DEFAULT_URL } from "../../../constants/Req.js";

let { width } = Dimensions.get("window");

class ResendCodeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: 60,
      btnActive: true,
      error: false
    };
  }

  sendCode = async () => {
    const authOptions = {
      method: "PATCH",
      url: `${DEFAULT_URL}/users/duplicateVerifyCode`,
      data: {
        email: this.props.email
      }
    };
    // console.log(authOptions, '=====options Resent');

    await axios(authOptions)
      .then(res => {
      // console.log(res, 'Resent response');
      if (res.data.success === false) {
          this.props.setWarning(
            "Ведений Вами код не співпадає з кодом відправленим на email."
          );
        }
      })

      .catch(error => {
        this.setState({ error: true });
        console.log(error, "<<<===== ERR REGISTRATION");
      });

    const countdown = setInterval(() => {
      if (this.state.timeLeft === 1) {
        clearInterval(countdown);
      }
      this.setState({ timeLeft: this.state.timeLeft - 1 });
      if (this.state.timeLeft > 0) {
        this.setState({ btnActive: false });
      }
      if (this.state.timeLeft === 0) {
        this.setState({ btnActive: true, timeLeft: 60 });
      }
    }, 1000);
  };

  render() {
    const { children } = this.props;
    const { btnActive, timeLeft } = this.state;
    const counter = btnActive ? null : ` (0:${timeLeft})`;
    const resetInputs = this.props.resetInputs;
    const resetCode = this.props.resetCode;

    // console.log(this.props, '-----Resent Code');

    return (
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => {
          this.sendCode(), resetCode(), resetInputs();
        }}
        disabled={!btnActive}
      >
        <Text style={styles.textStyle}>
          {children}
          {counter}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: width >= 600 ? 20 : 12,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    justifyContent: "center",
    textDecorationLine: "underline",
    marginVertical: '10%'
  }
});

export default ResendCodeButton;
