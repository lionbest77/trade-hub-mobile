import React, { Component } from "react";
import {
  View, TextInput, ActivityIndicator, Text, Dimensions, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Overlay } from "react-native-elements";
import { Formik } from "formik";
import axios from "axios";

import UserControlButton from "../buttons/UserControlButton/UserControlButton";
import SecondaryButton from "../buttons/SecondaryButton/SecondaryButton";
import NewUserCard from "../NewUserCard/NewUserCard";
import MainButton from "../buttons/MainButton/MainButton";
import GoogleIcon from "../../ui/icons/GoogleIcon";
import Delimiter from "../../ui/Delimiter/Delimiter";

import validationSchema from "./Validation.js";
import { DEFAULT_URL } from "../../constants/Req.js";
import { styles } from "./Styles";
import COLORS from '../../constants/Colors';
import i18n from "../../services/localization";

let { width } = Dimensions.get("window");

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      users: [],
      newUsers: [],
      error: false,
      exists: false,
      spinner: false,
      activeOverlay: false
    };
  }

  addUser = () => {
    if (this.state.newUsers.length < 20) {
      let index = 1;
      this.setState(prev => ({
        newUsers: [
          ...prev.newUsers,
          {
            pickedData: 0,
            email: "",
            full_name: "",
            companyName: "",
            id: index++
          }
        ]
      }));
    } else {
      this.setState({ activeOverlay: true });
    }
  };

  removeUser = id => {
    const users = this.state.newUsers.filter(item => item !== id);
    this.setState({
      newUsers: users
    });
  };

  closeOverlay = () => {
    this.setState({ activeOverlay: false });
  };

  sendUser = async values => {
    this.setState({ error: false, spinner: true });
    const authOptions = {
      method: "POST",
      url: `${DEFAULT_URL}/users/signUp/`,
      data: {
        role: 2,
        email: values.email,
        fullName: values.full_name,
        name: values.full_name.split(" ")[1],
        surname: values.full_name.split(" ")[2],
        lastName: values.full_name.split(" ")[0],
        company_name: values.companyName,
        registrationType: "email",
        staff: this.state.users
      }
    };
    // console.log(authOptions, '------------Registration Auth options');

    await axios(authOptions)
      .then(res => {
        this.setState({ id: res.data.id, spinner: false, error: false, exists: res.data.exists });
        // console.log(res.data, "<========== Response from registration email 1 screen");
      })
      .catch(err => {
        this.setState({ error: true, spinner: false });
        if(err?.response?.data?.statusCode === 500){
              Alert.alert(i18n.t('tech_error'), i18n.t('check_inputed_data'), [
                { text: i18n.t('ok') }
              ]);
        } else {
          Alert.alert(i18n.t('reg_error'), `${err?.response?.data?.message || i18n.t('something_went_wrong_check_data')}`, [
            { text: i18n.t('ok') }
          ]);
        }
      });
  };

  grabUser = (user, index)=> {
    if(this.state.users[index]){

      this.setState(prev => (
        prev.users[index] =
          {
            email: user.email,
            name: user.full_name.split(" ")[1],
            surname: user.full_name.split(" ")[2],
            lastName: user.full_name.split(" ")[0],
            registrationType: "email",
            companyName: user.companyName,
            role: user.pickedData.value,
            fullName: user.full_name
          }

      ));
    } else  {
      this.setState(prev => ({
        users: [
          ...prev.users,
          {
            email: user.email,
            name: user.full_name.split(" ")[1],
            surname: user.full_name.split(" ")[2],
            lastName: user.full_name.split(" ")[0],
            registrationType: "email",
            companyName: user.companyName,
            role: user.pickedData.value,
            fullName: user.full_name
          }
        ]
    }));
    }
  };

  exitScreen = async values => {
    await AsyncStorage.setItem("tradeHubFirstEnter", 'true');
    await this.sendUser(values);
    if (this.state.error === false) {
      this.props.navigation.navigate("AuthCode", {
        id: this.state.id,
        email: values.email,
        registration: true,
      });
    }
  };

  render() {
    const spinner = this.state.spinner;
    // console.log(this.state.users);
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled >
        <View style={styles.container}>
          <Overlay
            isVisible={this.state.activeOverlay}
            overlayStyle={styles.overlayContainer}
            onBackdropPress={this.closeOverlay}
          >
            <>
          <Text style={styles.text}>{i18n.t('added_max_employees')}</Text>
            <View style={styles.buttonsContainer}>
              <View><MainButton
                  width={100}
                  label={i18n.t('ok')}
                  onPress={this.closeOverlay}
                /></View>
            </View>
            </>
         </Overlay>
          <View style={{ width: "100%" }}>
            <SecondaryButton
              icon={<GoogleIcon />}
              text={i18n.t('auth_google')}
              onPress={this.props.googleSignIn}
            />
            <Delimiter />
          </View>
          <Formik
            initialValues={{
              full_name: "",
              email: "",
              companyName: ""
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
              handleBlur,
              isSubmitting,
              errors
            }) => (
                <View style={styles.formContainer}>
                  <Text style={styles.registrationInputLabel}>{i18n.t('PIB')}</Text>
                  <TextInput
                    style={styles.registrationInput}
                    name="full_name"
                    onBlur={handleBlur("full_name")}
                    onChangeText={handleChange("full_name")}
                    // autoCapitalize={'words'}
                  />
                  <Text style={styles.errorsStyle}>{errors.full_name}</Text>
                  <Text style={styles.registrationInputLabel}>{i18n.t('email')}</Text>
                  <TextInput
                    name="email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    style={styles.registrationInput}
                    autoCapitalize={'none'}
                    keyboardType={"email-address"}
                  />
                  <Text style={styles.errorsStyle}>{errors.email}</Text>
                  <Text style={styles.registrationInputLabel}>
                    {i18n.t('company_name')}
                  </Text>
                  <TextInput
                    name="companyName"
                    onBlur={handleBlur("companyName")}
                    onChangeText={handleChange("companyName")}
                    style={styles.registrationInput}
                    autoCapitalize={'none'}
                  />
                  <Text style={styles.errorsStyle}>{errors.companyName}</Text>
                  <View>
                    {this.state.newUsers.map((item, index) => (
                      <NewUserCard
                        companyName={values.companyName}
                        handleValues={this.handleValues}
                        onPress={() => this.removeUser(item)}
                        key={index}
                        id={index}
                        grabUser={this.grabUser}
                        users={this.state.newUsers}
                      />
                    ))}
                  </View>
                  <View style={{ marginBottom: 30 }}>
                    <UserControlButton
                      onPress={() => {
                        this.addUser();
                        setTimeout(() => {
                          this.props.formRef.current.scrollToEnd();
                        }, 100);
                      }}
                    />
                  </View>
                  {isSubmitting ? (
                    <ActivityIndicator />
                  ) : (
                      <View
                        style={width >= 600 ? { marginTop: 50 } : { marginTop: 10 }}
                      >
                        {spinner ? (
                          <View >
                            <ActivityIndicator size="large" color={COLORS.main} />
                          </View>
                        ) : (
                            <MainButton
                              smallFontSize={width >= 600 ? 22 : 18}
                              height={width >= 600 ? 70 : 60}
                              label={i18n.t('do_register')}
                              onPress={() =>
                                Object.keys(errors).length === 0 &&
                                errors.constructor === Object &&
                                values.email &&
                                values.full_name &&
                                values.companyName &&
                                this.exitScreen(values)
                              }
                              width={"100%"}
                              disabled={
                                Object.values(errors).length > 0 ||
                                !values.companyName ||
                                !values.email ||
                                !values.full_name ||
                                spinner
                                //!errors
                              }
                            />
                          )}

                      </View>
                    )}
                </View>
              )}
          </Formik>
        </View>
      </KeyboardAvoidingView >
    );
  }
}
export default Registration;
