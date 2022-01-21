import * as Linking from 'expo-linking'

export const downloadHelper = async url => {
  await Linking.openURL(url);
};
