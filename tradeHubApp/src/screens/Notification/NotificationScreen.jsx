import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {
  View, Text, Image, FlatList, ActivityIndicator, Dimensions, Alert,
} from 'react-native';
import { Overlay } from "react-native-elements";

import {DEFAULT_URL} from '../../constants/Req';
import { styles } from "./styles";
import COLORS from "../../constants/Colors";

import {NotificationCard} from '../../components/NotificationCard/NotificationCard';
import MainHeader from "../../components/headers/MainHeader/MainHeader";
import MainButton from "../../components/buttons/MainButton/MainButton";

import ArrowLeftIcon from "../../ui/icons/ArrowLeftIcon";
import CheckMarkIcon from "../../ui/icons/CheckMarkIcon";
import InformText from "../../ui/InformText/InformText";
import CrossIcon from "../../ui/icons/CrossIcon";

const NotificationScreen = (props) => {

  // console.log("-------Notification Props----------", props);

  let { width, height } = Dimensions.get("window");
  const {user_ID} = props.userData;

  const [currentNotification, setCurrentNotification] = useState(null);
  const [currentSwipeable, setCurrentSwipeable] = useState(null);
  const [activeOverlay, setActiveOverlay] = useState(false);
  const [notification, setNotification] = useState([]);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  // console.log(notification, '----------NOTIFS--------');

  const url = `${DEFAULT_URL}/users/${user_ID}/notifications?size=20&page=${page}`;

  const markAsRead = async ( notification_id, {data}) => {
    let url = `${DEFAULT_URL}/users/${user_ID}/notifications/${notification_id}`;

    // console.log(url);

   await fetch(url, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${props.userData.token}`}
    })
    .then(res => res.json())
        .then(response => {
      // console.log(response, '-------RESPONSE AFTER READ NOTIFICATION--------------');
    }).catch(e => {
      console.log(e, "-------ERROR AFTER READ NOTIFICATION-------------");
    });
    if(data.tender_id){
      props.navigation.navigate("TenderDetails", {_id: data.tender_id, status_code: data, from: 'Notification'});
    } else {
      props.navigation.navigate('UserProfile', {from: 'Notification'})
    }

   };

  const deleteElement = notificationNumber => {
    setNotification(
      notification.filter(item => item._id !== notificationNumber)
    );
    currentSwipeable.recenter();
    setActiveOverlay(false);
    deleteNotification(notificationNumber)
  };

  const footer = () => {
    if (!loading) return null;
    return (
        <View
            style={{
              position: "relative",
              width: width,
              height: height / 2,
              paddingVertical: 20,
              marginTop: 10,
              marginBottom: 10
            }}
        >
          <ActivityIndicator animating size="large" color={COLORS.main} />
        </View>
    );
  };

  const fetchAllNotifications = async (page) => {
    let currentUrl;
    if (page !== undefined) {
      currentUrl = `${DEFAULT_URL}/users/${user_ID}/notifications?size=20&page=0`;
      await setNotification([]);
    } else {
      currentUrl = url;
    }

    await fetch(currentUrl,
        {headers: { 'Authorization': `Bearer ${props.userData.token}`}})
    .then(response => response.json())
    .then(res => {
      // console.log('ALL Notifications from Notif Screen-------> ', res);
      if (res.length !== 0) {
        setPage((prevPage) => prevPage + 1);
        setNotification( (prev) => [...prev, ...res]);
      }
      setIsLoading(false);
      setLoading (false);
    }).catch(err => alert(err));
    await setLoading(false);
    await setIsLoading (false);
    // console.log(tenders);
  };

  const handleLoadMore = () => {
    // if (page <= 100) {
      setLoading (true)
      fetchAllNotifications();
    // }
  };

  const closeOverlay = () => {
    setActiveOverlay(false);
    currentSwipeable.recenter();
  };

  const deleteNotification = (id) => {
    // console.log(id, '--notification will be remove');
    let url = `${DEFAULT_URL}/notifications/${id}`;

    fetch(url, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${props.userData.token}`}
    })
    .then(res => res.json())
    .then(response => {
      // console.log(response, '-------RESPONSE AFTER DELETE NOTIFICATION--------------');
    }).catch(e => {
      console.log(e, "-------ERROR AFTER READ NOTIFICATION-------------");
    });
  };

  const refreshFunction = async () => {
    await setNotification([]);
    await setPage(0);
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      fetchAllNotifications()
    } catch (e) {
      Alert.alert("Notif", `${e.response.data}`, [
        { text: "OK" }
      ]);
    }}, []);

  // console.log(props.navigation.state.params, '-----------props.navigation.state.params');

  useEffect(() => {
    if(props.navigation.state.params?.refresh){
      setIsLoading(true);
      refreshFunction();
      fetchAllNotifications(0);
    }
  }, [props.navigation.state.params?.refresh]);

  return (
    <View style={styles.mainContainer}>
      <Overlay
        isVisible={activeOverlay}
        overlayStyle={styles.overlayContainer}
        onBackdropPress={closeOverlay}
      >
        <Text style={styles.text}>Ви дійсно хочите видалити повідомлення?</Text>
        <View style={styles.buttonsContainer}>
          <View>
            <MainButton
              width={80}
              leftBorderNone
              icon={<CrossIcon />}
              onPress={closeOverlay}
            />
          </View>
          <View>
            <MainButton
              width={80}
              rightBorderNone
              backgroundColor={"#27AE60"}
              icon={<CheckMarkIcon />}
              onPress={() => deleteElement(currentNotification)}
            />
          </View>
        </View>
      </Overlay>

      <MainHeader
        leftComponent={
          <MainButton
            width={80}
            icon={<ArrowLeftIcon color="#333" />}
            backgroundColor="#fff"
            leftBorderNone
            onPress={() => props.navigation.navigate('Main', {refresh: Date.now()})}
          />
        }
      />
      {isLoading ? (
          <View >
            <ActivityIndicator size="large" color={COLORS.main} />
          </View>
      ) : (
          !notification.length ? (
        <View style={styles.emptyTendersContainer}>
        <View style={styles.tendersContainer}>
        <Image source={require("../../assets/images/AddTenders.png")} />
        <InformText>Повідомлення відсутні</InformText>
        </View>
        </View>
        ) : (
        <FlatList
            data={notification}
            style={{width: '99%', height: '100%'}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              const backgroundColor = index % 2 === 0 ? "#E8E8E8" : "#FFF";
              const background = index % 2 === 0 ? COLORS.main : "#C2C2C2";
              return (
            <View>
              <NotificationCard
                  item={item}
                  index={index}
                  markAsRead={markAsRead}
                  background={background}
                  setIsSwiping={setIsSwiping}
                  backgroundColor={backgroundColor}
                  setActiveOverlay={setActiveOverlay}
                  currentSwipeable={currentSwipeable}
                  setCurrentSwipeable={setCurrentSwipeable}
                  setCurrentNotification={setCurrentNotification}
              />
            </View>
        )}}
            onEndReached={() => (notification.length >= 20) && handleLoadMore()}
            onEndReachedThreshold={0.2}
        ListFooterComponent={footer}
        />
        )
      )}
    </View>
  );
};
const mapStateToProps = state => ({
  userData: state.userData.userData
});

export default connect(mapStateToProps)(NotificationScreen);

