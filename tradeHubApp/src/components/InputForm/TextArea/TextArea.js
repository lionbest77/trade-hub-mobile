import React, {useState} from 'react';
import {Alert, Clipboard, Platform, TouchableOpacity, View} from 'react-native';

import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import RequiredLabel from '../../../ui/RequiredLabel/RequiredLabel';
import { Ionicons } from '@expo/vector-icons';

import styles from './style';
import COLORS from '../../../constants/Colors';

const TextArea = ({
    text,
    required,
    setValue,
    description,
    setCopiedText
                  }) => {
  return (
       <View style={styles.container} selectTextOnFocus={true}>
        <RequiredLabel text={text} required={required}/>
        <AutoGrowingTextInput
            selectTextOnFocus={true}
            style={styles.inputContainer}
            minHeight={100}
            onChangeText={setValue}
            value={description}
            enableScrollToCaret
            maxLength={2000}
         />

         { Platform.OS === 'android' &&
         <View style={styles.paste_icon}>
           <TouchableOpacity
               onPress={  () => {
                Alert.alert('', 'Вставити текст який був скопійований?', [
                   {
                     text: 'Ні',
                   },
                   { text: 'Так', onPress: async() => setCopiedText(await Clipboard.getString())},
                 ])
               }
               }>
             <Ionicons  name="ios-copy" size = {18} color= {COLORS.finished} />
           </TouchableOpacity>
         </View>

         }
         </View>
  )
};

export default TextArea;