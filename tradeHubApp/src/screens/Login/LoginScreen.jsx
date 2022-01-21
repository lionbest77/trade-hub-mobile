import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {ButtonGroup} from 'react-native-elements';
import {View, ScrollView, Dimensions, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import axios from "axios";
import * as Google from "expo-google-app-auth";
import { styles } from "./styles";
import { DEFAULT_URL } from "../../constants/Req";
import { GET_SCREEN, GET_TAB, GET_AUTH_TAB, SET_USER_DATA} from "../../store/reduxConstants";
import Tab from "../../components/Tab/Tab";
import MainHeader from "../../components/headers/MainHeader/MainHeader";
import Registration from "../../components/Registration/Registration";
import Authorization from "../../components/Authorization/Authorization";
import RegistrationAfterGoogle from "../../components/RegistrationAfterGoogle/RegistrationAfterGoogle";
import { registerForPushNotificationsAsync } from "../../services/PushNotifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const IOS_CLIENT_ID = '362356516786-kceuvv95ocqsl7u4qaqpk8fs2lkoa18d.apps.googleusercontent.com';
const ANDROID_CLIENT_ID = '362356516786-nbh043joj60danlkbagc5mncih1jfenc.apps.googleusercontent.com';

const LoginScreen = props => {
  let { width } = Dimensions.get("window");

  const [token, setToken] = useState("");
  const [tokenExpo, setTokenExpo] = useState("");
  const [gmailUser, setGmailUser] = useState('');

  const formRef = useRef(null);
  const notificationListener = useRef();
  const responseListener = useRef();

  const handleDown = formRef => {
    setTimeout(() => formRef.current.scrollToEnd({ animated: true }), 100);
  };

  const loginGoogle = async data => {
    const authOptions = {
      method: "POST",
      url: `${DEFAULT_URL}/users/oauth/verifyIdToken`,
      data: {
        token: data.idToken,
        deviceToken: tokenExpo
      }
    };

    await axios(authOptions)
    .then(res => {
      setToken(res.data.token);
      if (res.data.token) {
        props.setUserData({
          user_ID: res.data.userId,
          company_ID: res.data.companyId,
          role: res.data.role,
          token: res.data.token});
        AsyncStorage.setItem("tradeHubUser", JSON.stringify({
          user_ID: res.data.userId,
          company_ID: res.data.companyId,
          role: res.data.role,
          token: res.data.token,
          deviceToken: tokenExpo,
        }));
        props.navigation.navigate("Main");
      } else {
        Alert.alert("Помилка авторизації!", `${res.message}`, [
          { text: "OK" },
        ]);
      }
    })
    .catch(error => {
      console.log(error, "<=========== SERVER RESPONSE ERROR GOOGLE");
    });
  };

 const signInWithGoogleAsync = async () => {
      try {
        const result = await Google.logInAsync({
          androidClientId: ANDROID_CLIENT_ID,
          androidStandaloneAppClientId: ANDROID_CLIENT_ID,

          iosClientId: IOS_CLIENT_ID,
          iosStandaloneAppClientId: IOS_CLIENT_ID,
          scopes: ["profile", "email"]
        });
        if (result.type === "success") {
          await loginGoogle(result);
          await AsyncStorage.setItem("tradeHubPrivacyAgreement", "true");
          await AsyncStorage.setItem("tradeHubFirstEnter", "true");
        }
      } catch (e) {
        console.log("Don't login", e);
      }
  };

  const signUpWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        androidStandaloneAppClientId: ANDROID_CLIENT_ID,

        iosClientId: IOS_CLIENT_ID,
        iosStandaloneAppClientId: IOS_CLIENT_ID,
        scopes: ["profile", "email"],
      });
      if (result.type === "success") {

        await setGmailUser(result.user.email);

        await props.getTabNumber(3);

      } else {
        console.log("cancel");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const buttons = [
    {
      element: () => (
        <Tab
          buttonIndex={0}
          label={"Реєстрація"}
          selectedIndex={props.screenNumber}
        />
      )
    },
    {
      element: () => (
        <Tab
          buttonIndex={1}
          label={"Авторизація"}
          selectedIndex={props.screenNumber}
          alignmentRight
        />
      )
    }
  ];

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(expoPushToken => setTokenExpo(expoPushToken))
      .catch(err => {
        Alert.alert("Login", `${err.response.data}`, [
          { text: "OK" }
        ]);
      });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (

    <View style={styles.mainContainer}>

      {props.tabNumber === 3 ? (
        <RegistrationAfterGoogle
          onPress={props.getTabNumber}
          googleUser={gmailUser}
          formRef={formRef}
          navigation={props.navigation}
        />
      ) : (
        <>
          <MainHeader />
          <View style={{ paddingHorizontal: width >= 600 ? 45 : 25 }}>
            <ButtonGroup
              buttons={buttons}
              onPress={index => props.getScreenNumber(index)}
              selectedIndex={props.screenNumber}
              containerStyle={styles.tabsContainer}
              selectedButtonStyle={styles.buttonsContainer}
              innerBorderStyle={{ color: "#fff" }}
            />
          </View>

          <ScrollView ref={formRef}>
            <View style={{ flex: 1, paddingTop: 30, paddingBottom: 25 }}>
              {(() => {
                switch (props.screenNumber) {
                  case 0:
                    return (
                      <Registration
                        onPress={props.getTabNumber}
                        googleSignIn={signUpWithGoogleAsync}
                        handleDown={handleDown}
                        formRef={formRef}
                        navigation={props.navigation}
                      />
                    );

                  case 1:
                    return (
                      <Authorization
                        setUserData={props.setUserData}
                        token={token}
                        setToken={setToken}
                        tokenExpo={tokenExpo}
                        navigation={props.navigation}
                        onPress={props.getAuthTab}
                        googleSignIn={signInWithGoogleAsync}
                      />
                    );

                  default:
                    return null;
                }
              })()}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  tabNumber: state.reducerOne.tabNumber,
  screenNumber: state.reducerOne.screenNumber,
  authTabNumber: state.reducerOne.authTabNumber,
  userData: state.userData.userData
});

const mapDispatchToProps = dispatch => ({
  getAuthTab: number => dispatch({ type: GET_AUTH_TAB, authTabNumber: number }),
  setUserData: payload => dispatch({ type: SET_USER_DATA, payload }),
  getTabNumber: number => dispatch({ type: GET_TAB, tabNumber: number }),
  getScreenNumber: number => dispatch({ type: GET_SCREEN, screenNumber: number })
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
