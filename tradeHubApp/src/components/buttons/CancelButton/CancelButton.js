import React, { useState } from "react";
import {View, TouchableOpacity, Text, Alert} from 'react-native';

import {styles} from './style';
import CancelIcon from '../../../ui/icons/CancelIcon';

const CancelButton = ({
                        item,
                        arrayOfDocument,
                        setArrayOfDocument,
                        freeSpace,
                        setFreeSpace}) => {

  const [isPress, setIsPress] = useState(false);

  const deleteDocument = () => {
    Alert.alert('Обраний файл буде видалено', 'Видалити файл?', [
      {
        text: 'Так',
        onPress: () => {
          const newArrayOfDocument = arrayOfDocument.filter((e) => e.id !== item.id);
          setArrayOfDocument(newArrayOfDocument);
          setFreeSpace(freeSpace + item.size);
        },
      }, {
        text: 'Ні'
      }]);
  };

   return (
      <TouchableOpacity
          onPress={deleteDocument}
          activeOpacity={1}
          style={{ width: "100%" }}
          onPressIn={() => setIsPress(true)}
          onPressOut={() => setIsPress(false)}
      >
        <View style={[styles.buttonContainer,  isPress && styles.buttonPressed]}>
               <View style={styles.iconText}>
                <Text numberOfLines={1} ellipsizeMode= 'middle' style={styles.smallerText}>{item.name}</Text>
                <CancelIcon  />
              </View>
        </View>
      </TouchableOpacity>
  );
};

export default CancelButton;
