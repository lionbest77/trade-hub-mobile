import React, { useState } from "react";
import { Overlay } from "react-native-elements";
import {View, Text, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform} from 'react-native';

import axios from "axios";
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";

import COLORS from '../../constants/Colors';
import { styles } from "./style";
import { DEFAULT_URL } from "../../constants/Req.js";
import validationSchema from "../../screens/ConfirmPassword/Validation.js";

import InputForm from "../../components/InputForm/InputForm/InputForm";
import MainHeader from "../../components/headers/MainHeader/MainHeader";
import MainButton from "../../components/buttons/MainButton/MainButton";
import InformText from "../../ui/InformText/InformText";
import ArrowLeftIcon from "../../ui/icons/ArrowLeftIcon";

const ConfirmPassword = props => {

  const [error, setError] = useState();
  const [warning, setWarning] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState(false);

  const id = props.navigation.state.params.id;
  let registration;

  if (props) {
    registration = props.navigation
      ? props.navigation.state.params.registration
      : null;
  }

  const closeOverlay = () => {
    setActiveOverlay(false);
  };

  const sendPassword = async values => {
      setError(false);

      const authOptions = {
        method: "PATCH",
        url: `${DEFAULT_URL}/users/password/${id}`,
        data: {
          password: values.confirmPassword
        }
      };
      // console.log(authOptions);
      await  setIsLoading(true);
      await axios(authOptions)
      .then(res => {
        // console.log(res.data, "<========== RES after confirm password");
        if (res.data.success === false) {
          setWarning(
              "Введений Вами пароль не задовольняє правилам безпеки."
          );
        } else {
          setActiveOverlay(true);
        }
      })
      .catch(error => {
        setError(true);
        // console.log(error.response.data, "<<<===== ERR REGISTRATION");
        setWarning('Введений Вами пароль не задовольняє правилам безпеки')
      });
      await  setIsLoading(false);
  };

  return (
    <>
      <Overlay
        isVisible={activeOverlay}
        overlayStyle={styles.overlayContainer}
        // onBackdropPress={closeOverlay}
      >
        {registration ? (
          <Text style={styles.text}>
            Дякуємо, ми прийняли Вашу заявку. Ми повідомимо Вас по email, коли заявка
            буде оброблена.
          </Text>
        ) : (
          <Text style={styles.text}>
            Пароль змінено. Будь ласка, авторизуйтеся, використовуючи Ваш новий
            пароль
          </Text>
        )}

        <View style={styles.buttonsContainer}>
          <View>
            <MainButton
              width={100}
              label={"Добре"}
              onPress={() => {
                closeOverlay;
                props.navigation.navigate("Login");
              }}
            />
          </View>
        </View>
      </Overlay>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          alert(JSON.stringify(values));
          setTimeout(() => {
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ values, handleSubmit, handleChange, isSubmitting, errors }) => (
          <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <MainHeader
              leftComponent={
                <MainButton
                  onPress={() => props.navigation.goBack()}
                  leftBorderNone
                  width={80}
                  backgroundColor={"#FBFBFB"}
                  icon={<ArrowLeftIcon color={"#000"} />}
                />
              }
            />
            <KeyboardAvoidingView keyboardVerticalOffset={80} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
            <ScrollView>
              <View style={styles.mainContainer}>
                <View style={styles.informStylesContainer}>
                  {registration ? (
                    <>
                      <InformText>
                        Створіть пароль до акаунта, який повинен містити латинські
                        букви, інші символи та хоча б 1 цифру.
                      </InformText>
                      <InformText>Пароль не може містити пробіли.</InformText>
                    </>
                  ) : (
                    <>
                      <InformText>
                        Створіть новий пароль до акаунта, який повинен містити латинські
                        букви, інші символи та хоча б 1 цифру.
                      </InformText>
                      <InformText>Пароль не може містити пробіли.</InformText>
                    </>
                  )}
                </View>

                <InputForm
                  name="password"
                  secur={true}
                  label="Пароль"
                  iconVisible={
                    <Ionicons name="md-eye" size={30} color="#C2C2C2" />
                  }
                  iconNonVisible={
                    <Ionicons name="ios-eye-off" size={30} color="#C2C2C2" />
                  }
                  onChangeText={handleChange("password")}
                  autoCapitalize={'none'}

                />

                <Text style={styles.errorsStyle}>{errors.password}</Text>
                <InputForm
                  name="confirmPassword"
                  secur={true}
                  label="Повторіть пароль"
                  iconVisible={
                    <Ionicons name="md-eye" size={30} color="#C2C2C2" />
                  }
                  iconNonVisible={
                    <Ionicons name="ios-eye-off" size={30} color="#C2C2C2" />
                  }
                  onChangeText={handleChange("confirmPassword")}
                  autoCapitalize={'none'}
                />
                <Text style={styles.errorsStyle}>{errors.confirmPassword}</Text>

                {warning ? (
                  <Text style={styles.errorsStyle}>{warning}</Text>
                ) : null}

                <View style={styles.buttonContainer}>
                  {registration ? (
                           isLoading ? (
                            <View >
                              <ActivityIndicator size="large" color={COLORS.main} />
                            </View>
                            ) : (
                                <MainButton
                                    label={"Зареєструватися"}
                                    onPress={() =>
                                        Object.keys(errors).length === 0 &&
                                        errors.constructor === Object &&
                                        values.password &&
                                        values.confirmPassword &&
                                        sendPassword(values)
                                    }
                                    disabled={
                                      Object.values(errors).length > 0 ||
                                      !values.password ||
                                      !values.confirmPassword
                                    }
                                />
                            )

                  ) : (
                      isLoading ? (
                          <View >
                            <ActivityIndicator size="large" color={COLORS.main} />
                          </View>
                      ) : (
                              <MainButton
                                  label={"Створити"}
                                  onPress={() =>
                                      Object.keys(errors).length === 0 &&
                                      errors.constructor === Object &&
                                      values.password &&
                                      values.confirmPassword &&
                                      sendPassword(values)
                                  }
                                  disabled={
                                    Object.values(errors).length > 0 ||
                                    !values.password ||
                                    !values.confirmPassword
                                  }
                              />
                          )
                      )}
                </View>
              </View>
            </ScrollView>
            </KeyboardAvoidingView>
          </View>
        )}
      </Formik>
    </>
  );
};

export default ConfirmPassword;
