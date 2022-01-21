import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DEFAULT_URL } from '../constants/Req';

export const removeDeviceToken = async () => {
  const { token, user_ID, deviceToken } = JSON.parse(await AsyncStorage.getItem('tradeHubUser'));

  return axios.delete(
    `${DEFAULT_URL}/users/${user_ID}/devicetoken/${deviceToken}`,
    { headers: { 'Authorization': `Bearer ${token}` }},
    );
};
