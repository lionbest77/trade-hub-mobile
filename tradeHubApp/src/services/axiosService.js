import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const AxiosService = (navigation) => {
  axios.interceptors.response.use(
    response => response,
    async error => {
      try {
        const { response: { data } } = error;

        if (data?.code === 403 || data?.code === 404) {
          await AsyncStorage.removeItem('tradeHubUser');
          navigation.navigate('Login');
          Alert.alert('Помилка!', `${data?.message || 'Будь ласка, авторизуйтесь.'}`, [
            { text: "OK" }
          ]);
        }
      } catch (e) {
        console.error(e);
      }
    })
};
