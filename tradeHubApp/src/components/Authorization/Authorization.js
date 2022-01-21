import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";
import { CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../constants/Colors";
import { styles } from "./style";
import { DEFAULT_URL } from "../../constants/Req";

import MainButton from "../buttons/MainButton/MainButton";
import GoogleIcon from "../../ui/icons/GoogleIcon";
import Delimiter from "../../ui/Delimiter/Delimiter";
import InputForm from "../InputForm/InputForm/InputForm";
import SecondaryButton from "../buttons/SecondaryButton/SecondaryButton";
import ForgotPasswordButton from "../buttons/ForgotPasswordButton/ForgotPasswordButton";

const Authorization = (props) => {
  let { width } = Dimensions.get("window");

  const [check, setCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [valueEmail, setValueEmail] = useState(props.navigation.state.params?.valueEmail ? props.navigation.state.params.valueEmail : '');
  const [warningEmail, setWarningEmail] = useState(null);
  const [valuePassword, setValuePassword] = useState(props.navigation.state.params?.valuePassword ? props.navigation.state.params.valuePassword : '');
  const [warningPassword, setWarningPassword] = useState(null);
  const [privacyAgreement, setPrivacyAgreement] = useState();

  const errorMessageEmail = "Email невірний";
  const errorMessagePassword = "Пароль має бути не меньш ніж 8 символів";

  const getPrivacyAgreement = async () => {
    setPrivacyAgreement(await AsyncStorage.getItem("tradeHubPrivacyAgreement"));
  };

  //validation for inputs
  const onSubmitEditing = (value, name, errorText) => {
    if (name === "email") {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!regex.test(String(value).toLowerCase())) {
        setWarningEmail(errorText);
        return false;
      }
      setWarningEmail(null);
      return true;
    }
    if (name === "password") {
      if (!value || value.length < 8) {
        setWarningPassword(errorText);
        return false;
      }
      setWarningPassword(null);
      return true;
    }
  };

  const onChangeEmail = (value) => {
    setValueEmail(value);
  };

  const onChangePassword = (value) => {
    setValuePassword(value);
  };

  const onCheckBoxPress = () => {
    setCheck(!check);
  };

  const loginEmail = async () => {
    const authOptions = {
      method: "POST",
      url: `${DEFAULT_URL}/users/signIn`,
      data: {
        email: valueEmail.toLowerCase(),
        password: valuePassword,
        deviceToken: props.tokenExpo,
      },
    };

    await setIsLoading(true);
    await axios(authOptions)
      .then((res) => {
        props.setToken(res.data.token);

        if (res.data.token) {
          props.setUserData({
            user_ID: res.data.userId,
            company_ID: res.data.companyId,
            role: res.data.role,
            token: res.data.token,
            deviceToken: props.tokenExpo,
          });
          AsyncStorage.setItem("tradeHubUser", JSON.stringify({
            user_ID: res.data.userId,
            company_ID: res.data.companyId,
            role: res.data.role,
            token: res.data.token,
            deviceToken: props.tokenExpo,
          }));
          props.navigation.navigate("Main");
        }
        if (res.data.twoFA) {
          props.navigation.navigate("AuthCode", {
            login: true,
            email: valueEmail,
            password: valuePassword,
            });
        }
      })
      .catch((error) => {
        Alert.alert("Помилка авторизації!", `${error?.response?.data?.message || 'Щось пішло не так!'}`, [
          { text: "OK" },
        ]);
      })
      .finally(() => setIsLoading(false));
  };

  const onLoginPress = async () => {
    try {
      await loginEmail();
      await AsyncStorage.setItem("tradeHubPrivacyAgreement", `${!check}`);
      await AsyncStorage.setItem("tradeHubFirstEnter", "true");
    } catch (e) {
      console.log(
        "Error from Email LogIn ----------------------->",
        e.response.data
      );
    }
  };

  const privacyRequire = () => {
    Alert.alert(
      "Помилка авторизації!",
      "Для авторизації ознайомтесь, будь ласка, із політикою конфіденційності",
      [{ text: "OK" }]
    );
  };

  useEffect(() => {
    const abortController = new AbortController();
    try {
      getPrivacyAgreement().then(r => r);
    } catch (e) {
      Alert.alert("Authorization", `${e.response.data}`, [{ text: "OK" }]);
    }
    return () => {
     abortController.abort();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      enabled
    >
      <View style={styles.mainContainer}>
        <View style={{ width: "100%" }}>
          <SecondaryButton
            onPress={
              privacyAgreement || check ? props.googleSignIn : privacyRequire
            }
            icon={<GoogleIcon />}
            text={"Через Google акаунт"}
          />
          <Delimiter style={{ marginVertical: 150 }} />
        </View>

        <View style={styles.inputContainer}>
          <View style={{ marginBottom: "12%" }}>
            <InputForm
              secur={false}
              label={"Email"}
              warning={warningEmail}
              value={valueEmail}
              onChangeText={onChangeEmail}
              onSubmitEditing={() =>
                onSubmitEditing(valueEmail, "email", errorMessageEmail)
              }
              keyboardType={"email-address"}
              autoCapitalize={'none'}
            />
          </View>

          <View>
            <InputForm
              secur={true}
              label="Пароль"
              warning={warningPassword}
              value={valuePassword}
              iconVisible={<Ionicons name="md-eye" size={30} color="#C2C2C2" />}
              iconNonVisible={
                <Ionicons name="ios-eye-off" size={30} color="#C2C2C2" />
              }
              onChangeText={onChangePassword}
              onSubmitEditing={() =>
                onSubmitEditing(valuePassword, "password", errorMessagePassword)
              }
              autoCapitalize={'none'}
            />
          </View>

          <ForgotPasswordButton
            onPress={() => props.navigation.navigate("ForgotPassword")}
          />
        </View>

        <View style={styles.bottomContainer}>
          {!privacyAgreement ? (
            <View style={styles.policyContainer}>
              <CheckBox
                containerStyle={{ padding: 0, margin: 0 }}
                checked={check}
                onIconPress={onCheckBoxPress}
                checkedColor={COLORS.main}
                size={22}
              />
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Policy", {valueEmail, valuePassword})}
              >
                <Text style={styles.policyText}>
                  {" "}
                  Політика конфіденційності
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.policyContainer}></View>
          )}

          <View style={styles.buttonContainer}>
            {isLoading ? (
              <View>
                <ActivityIndicator size="large" color={COLORS.main} />
              </View>
            ) : (
              <MainButton
                backgroundColor={
                  !(
                    (privacyAgreement || check) &&
                    valuePassword &&
                    valuePassword
                  )
                    ? COLORS.disableBtnColor
                    : COLORS.main
                }
                disabled={
                 !( (privacyAgreement || check) && valuePassword && valueEmail)
                }
                smallFontSize={width >= 600 ? 22 : 18}
                height={width >= 600 ? 70 : 60}
                width={"100%"}
                label={"Увійти"}
                onPress={() =>
                  (privacyAgreement || check) &&
                  valueEmail &&
                  valuePassword &&
                  onLoginPress()
                }
              />
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData.userData,
});

export default connect(mapStateToProps, {})(Authorization);
