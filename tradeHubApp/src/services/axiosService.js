import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

import i18n from '../services/localization'

export const AxiosService = (navigation) => {
  axios.interceptors.response.use(
    response => response,
    async error => {
      try {
        const { response: { data } } = error;

        if (data?.code === 403 || data?.code === 404) {
          await AsyncStorage.removeItem('tradeHubUser');
          navigation.navigate('Login');
          Alert.alert(i18n.t('error'), `${data?.message || i18n.t('please_log_in')}`, [
            { text: i18n.t('ok') }
          ]);
        }
      } catch (e) {
        console.error(e);
      }
    })
};
