import React from 'react';
import {TouchableOpacity,
  View} from 'react-native';
import ClipIcon from '../../../ui/icons/ClipIcon';
import {addDocument} from '../../../helpers/singleDocumentPicker/singleDocumentPciker';

export const AttachBox = ({
    setDocument,
    freeSpace,
    setFreeSpace,
    setAttachOverlay,
                }) => {
  return (
          <View>
            <TouchableOpacity
                onPress={
                  () => addDocument(setDocument, freeSpace, setFreeSpace, setAttachOverlay)}
            >
              <View>
                <ClipIcon />
              </View>
            </TouchableOpacity>
          </View>)

};
