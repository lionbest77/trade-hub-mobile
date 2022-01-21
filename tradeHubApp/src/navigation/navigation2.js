import React from 'react';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import NotificationScreen from "../screens/Notification/NotificationScreen";
import UserProfileScreen from "../screens/UserProfile/UserProfileScreen";
import ConfirmPassword from "../screens/ConfirmPassword/ConfirmPassword";
import ForgotPassword from "../screens/ForgotPassword/ForgotPassword";
import LoadingScreen from "../screens/Loading/LoadingScreen";
import TenderDetails from "../screens/TenderDetails/TenderDetails";
import PolicyScreen from "../screens/PolicyScreen/PolicyScreen";
import TenderScreen from "../screens/Tender/TenderScreen";
import MainScreen2 from "../screens/MainScreen/MainScreen2";
import LoginScreen from "../screens/Login/LoginScreen";
import ChatScreen from "../screens/Chat/ChatScreen";
import FaqScreen from "../screens/FAQ/FAQScreen";
import AuthCode from "../screens/AuthCode/AuthCode";
import Preview from '../screens/Preview/Preview';


const LoginNavigation = createStackNavigator(
    {
      Login: LoginScreen,
      Loading: LoadingScreen,
      ForgotPassword: ForgotPassword,
      AuthCode: AuthCode,
      ConfirmPassword: ConfirmPassword
    },
    {
      headerMode: "none"
    },
);

const MainNavigation = createStackNavigator(
    {
      UserProfile: UserProfileScreen,
      Tender: TenderScreen,
      Main: MainScreen2,
      Chat: ChatScreen,
      Notification: NotificationScreen,
      FAQ: FaqScreen,
      TenderDetails: TenderDetails,
      Policy: PolicyScreen,
      Preview: Preview
    },
    {
      headerMode: "none"
    }
);

const AppNavigation = createSwitchNavigator({
  LoginNavigation,
  MainNavigation
});

const AppContainer2 = createAppContainer(AppNavigation);

export default AppContainer2;
