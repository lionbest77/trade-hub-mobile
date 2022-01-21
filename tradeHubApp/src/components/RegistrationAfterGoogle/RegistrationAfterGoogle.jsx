import React, { Component } from "react";
import axios from "axios";
import {
  ActivityIndicator, ScrollView, Text, TextInput, View, Dimensions, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Overlay } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from "formik";

import UserControlButton from "../buttons/UserControlButton/UserControlButton";
import validationSchema from "./Validation.js";
import { DEFAULT_URL } from "../../constants/Req.js";
import ArrowLeftIcon from "../../ui/icons/ArrowLeftIcon";
import NewUserCard from "../NewUserCard/NewUserCard";
import { styles } from "../Registration/Styles";
import MainHeader from "../headers/MainHeader/MainHeader";
import MainButton from "../buttons/MainButton/MainButton";

let { width } = Dimensions.get("window");

class RegistrationAfterGoogle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUsers: [],
      activeOverlay: false,
      id: "",
      error: false,
      users: [],
      spinner: false,
      exists: false
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
        name: values.full_name.split(" ")[1],
        surname: values.full_name.split(" ")[2],
        lastName: values.full_name.split(" ")[0],
        fullName: values.full_name,
        email: this.props.googleUser,
        registrationType: "gmail",
        staff: this.state.users,
        company_name: values.companyName,
        role: 2
      }
    };

    // console.log(authOptions, 'Options for registration after  google');

    await axios(authOptions)
    .then(res => {
      this.setState({ id: res.data.id, spinner: false, exists: res.data.exists  });
      // console.log(res.data, "<========== RES after registration after  google");
    })
    .catch(res => {
      this.setState({ error: true, spinner: false });
      console.log(res, "<===== ERR REGISTRATION");
      Alert.alert("Помилка регістрації!", `${res.response.data.message}`, [
        { text: "OK" },
      ]);
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
      if (this.state.error === false && !this.state.exists) {
        this.props.navigation.navigate("AuthCode", {
          id: this.state.id,
          email: this.props.googleUser,
          googleReg: true
        });
      }
      else {
        if (this.state.exists) {
          Alert.alert("Помилка реєстрації!", "Користувач з такими даними вже існує ", [
            {text: "OK"}]);
        }
        // else {
        //   Alert.alert("Вибачте, технична помилка",
        //       "Перевірте введені дані та спробуйте пізніше. ", [
        //         {text: "OK"}]);
        // }
      }
  };
  render() {
    // console.log(this.props.googleUser, "gmail user props");
    // console.log(this.props.navigation.navigate);

    const spinner = this.state.spinner;

    return (
        <KeyboardAvoidingView
            behavior={Platform.Os == "ios" ? "padding" : "height"}
            style={{flex: 1}}
        >
        <View style={{ height: "100%", backgroundColor: "#fff" }}>
          <MainHeader
              leftComponent={
                <MainButton
                    onPress={() => this.props.onPress(0)}
                    leftBorderNone
                    width={80}
                    backgroundColor={"#FBFBFB"}
                    icon={<ArrowLeftIcon color={"#000"} />}
                />
              }
          />
          <Overlay
              isVisible={this.state.activeOverlay}
              overlayStyle={styles.overlayContainer}
              onBackdropPress={this.closeOverlay}
          >
            <Text style={styles.text}>
              Ви додали максимальну кількість співробітників
            </Text>
            <View style={styles.buttonsContainer}>
              <View>
                <MainButton
                    width={100}
                    label={"Добре"}
                    onPress={this.closeOverlay}
                />
              </View>
            </View>
          </Overlay>
          <ScrollView>
            <View
                style={{
                  paddingHorizontal: 37,
                  paddingBottom: 35,
                  marginTop: "24%"
                }}
            >
              <Formik
                  initialValues={{
                    full_name: "",
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
                    touched,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                    setFieldValue,
                    errors
                  }) => (
                    <View style={styles.formContainer}>
                      <Text style={styles.registrationInputLabel}>ПІБ</Text>
                      <TextInput
                          style={styles.registrationInput}
                          name="full_name"
                          onBlur={handleBlur("full_name")}
                          onChangeText={handleChange("full_name")}
                          onChangeText={(value)=> setFieldValue("full_name", value)}
                            autoCapitalize={'words'}
                      />
                      <Text style={styles.errorsStyle}>{errors.full_name}</Text>
                      <Text style={styles.registrationInputLabel}>
                        Назва організації
                      </Text>
                      <TextInput
                          name="companyName"
                          onBlur={handleBlur("companyName")}
                          onChangeText={handleChange("companyName")}
                          onChangeText={(value)=> setFieldValue("companyName", value)}
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
                              }}
                        />
                      </View>
                      {isSubmitting ? (
                          <ActivityIndicator />
                      ) : (
                          <View
                              style={
                                width >= 600 ? { marginTop: 50 } : { marginTop: 10 }
                              }
                          >
                            <MainButton
                                smallFontSize={width >= 600 ? 22 : 18}
                                height={width >= 600 ? 70 : 60}
                                label={"Зареєструватись"}
                                onPress={() =>
                                    values.full_name &&
                                    values.companyName &&
                                    this.exitScreen(values)
                                }
                                width={"100%"}
                                disabled={
                                  !values.companyName || !values.full_name || spinner
                                  //!errors
                                }
                            />
                          </View>
                      )}
                    </View>
                )}
              </Formik>
            </View>
          </ScrollView>
        </View>

        </KeyboardAvoidingView>
    );
  }
}
export default RegistrationAfterGoogle;
