import React from 'react';
import {
  Text,
  TouchableOpacity,
  View} from 'react-native';
import Swipeable from 'react-native-swipeable';

import {styles} from './style'
import DeleteIcon from '../../ui/icons/DeleteIcon';

import i18n from '../../services/localization'

export const NotificationCard =({
                                  item,
                                  index,
                                  background,
                                  markAsRead,
                                  setIsSwiping,
                                  backgroundColor,
                                  setActiveOverlay,
                                  currentSwipeable,
                                  setCurrentSwipeable,
                                  setCurrentNotification
    }) => {

  let { body, _id, data, created_at, read } = item;

  let internal_id = data.internal_id ? data.internal_id : null;

  const goToDetail =async () => {
    setCurrentNotification(_id);
    if (!read) {
      await markAsRead(_id, {data});
    }
   };
  // console.log(item);

  let createData = new Date(created_at);

  let fullData = {
    day: createData.getDate() < 10 ? `0${createData.getDate()}` : createData.getDate(),
    month: (createData.getMonth() + 1) < 10 ? `0${createData.getMonth() + 1}` : (createData.getMonth() + 1),
    year: createData.getFullYear(),
    hour: createData.getHours() < 10  ? `0${createData.getHours()}` : createData.getHours(),
    minutes: createData.getMinutes() < 10  ? `0${createData.getMinutes()}` : createData.getMinutes(),
  };

  return (<View>
        <Swipeable
            key={index}
            onSwipeStart={() => setIsSwiping(true)}
            onSwipeRelease={() => setIsSwiping(false)}
            onRightButtonsOpenRelease=
                {(event, gestureState, swipeable) => {
                  if (currentSwipeable && currentSwipeable !== swipeable) {
                    currentSwipeable.recenter();
                  }
                  setCurrentSwipeable(swipeable);
                  setCurrentNotification(_id);
                }}
            onRightButtonsCloseRelease={() => setCurrentSwipeable(null)}
            rightButtonWidth={120}
            rightButtons={[
              <View style={styles.removeContainer}>
                <TouchableOpacity
                    onPress={() => {
                      setActiveOverlay(true);
                    }}
                >
                  <View style={styles.removeButtonContainer}>
                    <DeleteIcon/>
                  </View>
                </TouchableOpacity>
              </View>]}
        >
          <TouchableOpacity
              onPress={() => goToDetail()}
          >
            <View
                style={{
                  ...styles.mainRowContainer, backgroundColor,
                }}
            >
              <View style={styles.rowContainer}>
                <View
                    style={{
                      ...styles.row, backgroundColor: background,
                    }}
                />
                <Text style={!read ? styles.rowTitleText : styles.rowTitleTextRead}>
                  {body}
                </Text>
              </View>
              <View
                  style={{
                    alignItems: 'flex-end', paddingRight: 15,
                  }}
              >
                {internal_id && <Text
                    style={!read ? styles.rowTenderText : styles.rowTenderTextRead}>
                  {`${i18n.t('order')} №${internal_id}`}</Text>}

                <Text
                    style={styles.rowDateText}>{fullData.day}.{fullData.month}.{fullData.year} {fullData.hour}:{fullData.minutes}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Swipeable>
      </View>);
};
