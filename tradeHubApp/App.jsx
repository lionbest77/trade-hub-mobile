import React, {useEffect, useState} from 'react';
import { Provider} from 'react-redux';
import {Platform, SafeAreaView, StatusBar, StyleSheet, Dimensions, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";

import BackgroundTaskContainer from './src/BackgroundTaskContainer';
import AppContainer2 from './src/navigation/navigation2';
import AppContainer from "./src/navigation/navigation";
import AppContainer3 from './src/navigation/navigation3';
import store from './src/store/store';

import i18n from './src/services/localization'

const App = (props) => {

  // const Spacer = Platform.OS === 'ios' ? <KeyboardSpacer /> : null
 let {height, width} = Dimensions.get('window');

 const [firstEnter, setFirstEnter] = useState();
 const [isLogin, setIsLogin] = useState({});
 const [isConnected, setIsConnected] = useState(true);

 let isLoginStatus={};

 const getFirstStatus = async () => {
   setFirstEnter(await AsyncStorage.getItem("tradeHubFirstEnter"));
 };

 const getIsLoginStatus =async () => {
   isLoginStatus = JSON.parse(await AsyncStorage.getItem('tradeHubUser'));
   if(isLoginStatus.token){
     setIsLogin(isLoginStatus)
   }
 };

  useEffect(() =>
{
  try {
    getFirstStatus().then(r => r);
    getIsLoginStatus().then(r => r);
  }catch (e) {
    Alert.alert("App", `${e.response.data}`, [
      { text: i18n.t('ok') }
    ]);
  }

}, []);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      if (!state.isConnected && isConnected) {
        Alert.alert(i18n.t('tech_error'), i18n.t('check_internet'), [
          { text: i18n.t('ok') }
        ]);

        setIsConnected(false);
      }
    })
  }, [isConnected]);

  return (
    <Provider store={store}>

      <SafeAreaView style={style.AndroidSafeArea} >
        <StatusBar barStyle="dark-content" translucent={true} />
        <BackgroundTaskContainer/>
        {isLogin.token ? (
            <AppContainer3 screenheight={height} screemWidth={width} />
        ) : (
            !!firstEnter ?
                <AppContainer2 screenheight={height} screemWidth={width} />
                :
                <AppContainer screenheight={height} screemWidth={width} />
                )}
        {/*{Spacer}*/}

      </SafeAreaView>

    </Provider>
  );
};

const style = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});

export default App;
