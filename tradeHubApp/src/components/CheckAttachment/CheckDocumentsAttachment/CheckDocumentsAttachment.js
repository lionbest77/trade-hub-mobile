import React from 'react';
import {View} from 'react-native';

import styles from './style';
import CancelButton from '../../buttons/CancelButton/CancelButton';

const CheckDocumentsAttachment = ({arrayOfDocument, setArrayOfDocument, freeSpace, setFreeSpace}) => {
  let documentsItems = [];

  if (arrayOfDocument.length) {

    documentsItems = arrayOfDocument.map((item) => {
      return (
          <View style={{marginVertical: 5, width: '45%'}}
                key={item.id}>

        <CancelButton item={item}
                      arrayOfDocument={arrayOfDocument}
                      setArrayOfDocument={setArrayOfDocument}
                      freeSpace={freeSpace}
                      setFreeSpace={setFreeSpace}
        />
      </View>);
    });
  }

  return (
      <View style={styles.main_Container}>
        {documentsItems}
      </View>

  );
};

export default CheckDocumentsAttachment;