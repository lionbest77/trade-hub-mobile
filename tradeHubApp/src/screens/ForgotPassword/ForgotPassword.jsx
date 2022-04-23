import React, { Component } from "react";
import {KeyboardAvoidingView, View, Text, Alert, ActivityIndicator, Platform} from 'react-native';

import { Formik } from "formik";
import axios from "axios";

import COLORS from '../../constants/Colors';
import { styles } from "./styles";
import { DEFAULT_URL } from "../../constants/Req.js";
import validationSchema from "./Validation.js";

import InputForm from "../../components/InputForm/InputForm/InputForm";
import MainButton from "../../components/buttons/MainButton/MainButton";

import MainHeader from "../../components/headers/MainHeader/MainHeader";
import InformText from "../../ui/InformText/InformText";
import ArrowLeftIcon from "../../ui/icons/ArrowLeftIcon";

import i18n from "../../services/localization";

class ForgotPassword extends Component {
  state = {
    id: "",
    error: false,
    email: "",
    isLoading: false,
  };

  sendEmail = async values => {
    const authOptions = {
      method: "PATCH",
      url: `${DEFAULT_URL}/users/passwordRecovery`,
      data: {
        email: values.email
      }
    };
    await this.setState({isLoading: true});
    await axios(authOptions)
      .then(res => {
        // console.log(res.data, "Forgot password");
        this.setState({ id: res.data.userId, email: values.email });
      })
      .catch(error => {
        this.setState({ error: true });
        console.log(error, "<<<===== ERR REGISTRATION");
      });
    await this.setState({isLoading: false});
  };

  exitScreen = async values => {
      await this.sendEmail(values);
      // console.log(this.state);
      if (this.state.error === false) {
        this.props.navigation.navigate("AuthCode", {
          id: this.state.id,
          email: values.email
        });
      } else {
        Alert.alert("", i18n.t('not_have_user_by_data'), [
          {text: i18n.t('ok')}]);
        this.setState({ email: '',  error: false });
      }
  };
  render() {
    return (
      <Formik
        initialValues={{
          email: ""
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
        {({
          values,
          handleChange,
          errors,
          }) => (
          <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <MainHeader
              leftComponent={
                <MainButton
                  onPress={() => this.props.navigation.goBack()}
                  leftBorderNone
                  width={80}
                  backgroundColor={"#FBFBFB"}
                  icon={<ArrowLeftIcon color={"#000"} />}
                />
              }
            />
            <KeyboardAvoidingView keyboardVerticalOffset={80} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
              <View style={styles.mainContainer}>
                <InformText style={{ marginTop: "25%" }}>
                  {i18n.t('please_say_email')}
                </InformText>

                <View>
                  <InputForm
                    secur={false}
                    label="Email"
                    name="email"
                    onChangeText={handleChange("email")}
                    autoCapitalize={'none'}
                  />
                  <Text style={styles.errorsStyle}>{errors.email}</Text>
                </View>
                <View style={styles.buttonContainer}>
                  {this.state.isLoading ? (
                      <View >
                        <ActivityIndicator size="large" color={COLORS.main} />
                      </View>
                  ) : (
                      <MainButton
                          width={"100%"}
                          label={i18n.t('send_code')}
                          forgot={values.email}
                          onPress={() => values.email && this.exitScreen(values)}
                          disabled={errors.email || !values.email}
                      />
                  )}

                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        )}
      </Formik>
    );
  }
}

export default ForgotPassword;
