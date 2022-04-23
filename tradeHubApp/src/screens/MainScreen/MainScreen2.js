import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  Image, View, Dimensions, FlatList, ActivityIndicator, RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PTRView from "react-native-pull-to-refresh";
import axios from "axios";

import COLORS from "../../constants/Colors";
import { styles } from "./styles";

import {SET_USER_DATA} from '../../store/reduxConstants';
import { DEFAULT_URL } from "../../constants/Req";

import TenderAccordion from "../../components/Accordion/TenderAccordion/TenderAccordion";
import MainHeader from "../../components/headers/MainHeader/MainHeader";
import MainButton from "../../components/buttons/MainButton/MainButton";
import TenderCard from "../../components/TenderCard/TenderCard";

import NotificationCount from "../../ui/icons/NotificatiionCount";
import InformText from "../../ui/InformText/InformText";
import FilterIcon from "../../ui/icons/FilterIcon";
import UserIcon from "../../ui/icons/UserIcon";
import BellIcon from "../../ui/icons/BellIcon";
import PlusIcon from "../../ui/icons/PlusIcon";
import {AxiosService} from '../../services/axiosService';

import i18n from '../../services/localization'

const MainScreen2 = (props) => {
  let { width, height } = Dimensions.get("window");

  const socket = props.socket;

  const [notificationUnread, setNotificationUnread] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isTabOpen, setIsTabOpen] = useState(false);
  const [tenders, setTenders] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("created");
  const [unread, setUnread] = useState({});
  const [page, setPage] = useState(0);
  const FlatListRef = useRef(null);

  const url = `${DEFAULT_URL}/tenders/company/${props.userData.company_ID}?size=5&page=${page}&filter=${filter}`;

  const handlerIsTabOpen = () => {
    setIsTabOpen(!isTabOpen);
  };

  const fetchAllTenders = async (page, filter) => {

    let currentUrl;
    if(filter){
      currentUrl =`${DEFAULT_URL}/tenders/company/${props.userData.company_ID}?size=5&page=${page}&filter=${filter}`;
    } else {
      currentUrl = url
    }
    await axios.get(
        currentUrl,
        {headers: {'Authorization': `Bearer ${props.userData.token}`}})
    .then(res => {
      if (res?.data?.length !== 0) {
        setPage((prevPage) => prevPage + 1);
        setTenders((prev) => [...prev, ...res.data]);
        // TODO: need to modify
        //console.log(res.data);
      }
      setRefresh(Boolean(res.data.length));

    })
    .catch(err => console.log(err));
     await setIsLoading(false);
     await setLoading (false);
    };

  const handleNotificationRead = (data) => {
    let result = data?.find(item => item.read === false);
    if(result) {
      setNotificationUnread(true);
    } else {
      setNotificationUnread(false);
    }
  };

  const fetchAllNotifications = async () => {
    const url = `${DEFAULT_URL}/users/${props.userData.user_ID}/notifications?size=20&page=0`;
    await fetch(url,
        {headers: {'Authorization': `Bearer ${props.userData.token}`}})
      .then((response) => response.json())
      .then((res) => {

        if (res.length !== 0) {
          setNotificationCount(res.length);
          handleNotificationRead(res);
        } else {
          setNotificationUnread(false);
          setNotificationCount(null);
        }
      })
      .catch((err) => console.log(err));
  };

  const footer = () => {
    // if (!loading) return null;
    return (
      <View
        style={{
          position: "relative",
          width: width,
          height: height / 2,
          paddingVertical: 20,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <ActivityIndicator animating={isLoading} size="large" color={COLORS.main} />
      </View>
    );
  };

  const handleLoadMore = async () => {
    setLoading(true);
    await fetchAllTenders();
    await fetchAllNotifications();
  };

  const filterFunction = async () => {
    FlatListRef.current.scrollToIndex({ animated: true, index: 0 });
    await setIsLoading(true);
    await setTenders([]);
    await setPage(0);
    await setFilter(filter === "created" ? "updated" : "created");
  };

  const refreshFunction = async () => {
    await setTenders([]);
    await setPage(0);
  };

  const PullToRefreshProject = async () => {
    await fetchAllTenders();
    await fetchAllNotifications();
  };

  const getDataFromLS =async () => {
    let localStorageData = JSON.parse( await AsyncStorage.getItem('tradeHubUser'));
    if(localStorageData.token) {
    props.setUserData({
        user_ID: localStorageData.user_ID,
        company_ID: localStorageData.company_ID,
        role: localStorageData.role,
        token: localStorageData.token});
    }
  };

  const getUnreadMessages = async () => {
    const url = `${DEFAULT_URL}/users/${props.userData.user_ID}/messages/unread?size=100&page=0`;

    axios
    .get(url, {headers: {'Authorization': `Bearer ${props.userData.token}`}})
    .then((res) => {
      setUnread(res.data);
      setIsLoading(false);
    })
    .catch((err) => {
          alert(err.response.data);
        }
    );
  };

  const handleRefreshListOfTenders = async () => {
    setIsLoading(true);
    setPage(0);
    setTenders([]);
    await fetchAllTenders(0, 'created');
  };

  useEffect(() => {
  if (props.userData.user_ID === null){
      setIsLoading(true);
      getDataFromLS().then((r) => r )
    }
  }, []);

  useEffect(() => {
    AxiosService(props.navigation)
  }, []);

  useEffect(() => {
    if(props.userData.user_ID) {
      setIsLoading(true);
      fetchAllNotifications();
      getUnreadMessages();
      fetchAllTenders();
    }
  }, [props.userData.user_ID, filter]);

  useEffect(() => {
  if(props.navigation.state.params?.refresh){
    setIsLoading(true);
    fetchAllNotifications();
    getUnreadMessages();
    refreshFunction();
    fetchAllTenders(0,'created');
     }
  }, [props.navigation.state.params?.refresh]);

  useEffect(() => {
    if (socket) {
      socket.emit('chatNotificationsSubscribe', props.userData.company_ID );
      socket.emit('subscribeUserToNotifications', props.userData.user_ID );

      socket.on('chatNotificationsSubscribe', () => {});

      socket.on('subscribeUserToNotifications', () => {});

      socket.on('chatNotification',  (data) => {
        setUnread( prev => (
          prev[data] ?
            {...prev, ...data = ++prev[data]} :
            {...prev, [data]: 1}
        ));
      });

      socket.on('notifications', async (data) => {
          if (data?.type === 'chat') {
            setNotificationCount( prev => (prev + 1));
            setNotificationUnread( true);
          } else {
            const tenderId = data.data.tender_id;

            const tenderResponse = await axios.get(`${DEFAULT_URL}/tenders/${tenderId}`,
              {headers: { 'Authorization': `Bearer ${props.userData.token}`}});

            setTenders(prevState => prevState.map(tender => {
              if (tender._id === tenderId) {
                return tenderResponse.data || tender;
              }

              return tender;
            }))
          }
        }
      );

      socket.on('error', (error) => {
          console.log(error, '-----error');
        }
      );
    }

    return () => {
      if (socket) {
        socket.off('notifications');
        socket.off('chatNotification');

        socket.emit('chatNotificationsUnsubscribe', props.userData.company_ID);
        socket.emit("unsubscribeUserToNotifications", props.userData.user_ID );
      }
    }
  }, [socket, props.userData.company_ID, props.userData.user_ID, props.userData.token]);

  return (
    <View style={styles.mainContainer}>
      <View style={{ width: "100%" }}>
        <MainHeader
          leftComponent={
            <View>
              <MainButton
                width={80}
                shadowOpacity={0.4}
                backgroundColor={"#FBFBFB"}
                icon={<UserIcon />}
                leftBorderNone
                onPress={() => props.navigation.navigate("UserProfile", {from: 'Main'})}
              />
            </View>
          }
          rightComponent={
            <View>
              <MainButton
                width={80}
                shadowOpacity={0.4}
                backgroundColor={"#FBFBFB"}
                icon={
                  notificationCount && notificationUnread ? (
                    <NotificationCount />
                  ) : (
                    <BellIcon />
                  )
                }
                rightBorderNone
                onPress={() => props.navigation.navigate("Notification")}
              />
            </View>
          }
        />
      </View>
      {
        console.log(tenders)
      }
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.main} />
        </View>
      ) : (
      <View style={styles.contentContainer}>
        {!tenders.length ? (
          <View style={styles.emptyTendersContainer}>
            <PTRView onRefresh={PullToRefreshProject} style={{ paddingTop: 150 }}>
              <View style={styles.tendersContainer}>
                <Image source={require("../../assets/images/AddTenders.png")} />
                <InformText>{i18n.t('to_create_order')}</InformText>
              </View>
            </PTRView>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <TenderAccordion
              filterFunction={filterFunction}
              text={i18n.t('bids')}
              active={!isTabOpen}
              setActive={handlerIsTabOpen}
              style={
                width >= 600
                  ? { fontSize: 22, color: "black" }
                  : { fontSize: 16, color: "black" }
              }
              containerStyle={{ flex: 1, height: '100%' }}
              content={
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={loading}
                      onRefresh={handleRefreshListOfTenders}
                    />
                  }
                  refreshing={loading}
                  ref={FlatListRef}
                  keyExtractor={(item, index) => index.toString()}
                  data={tenders}
                  renderItem={({ item }) => (
                    <View>
                      <TenderCard
                        socket={socket}
                        tender={item}
                        navigation={props.navigation}
                        unread={unread[item._id]}
                      />
                    </View>
                  )}
                  onEndReached={() =>
                    refresh && handleLoadMore()
                  }
                  onEndReachedThreshold={0.2}
                  ListFooterComponent={footer}
                />
              }
              icon={<FilterIcon />}
            />
            </View>
          )}
        </View>
      )}
      <View style={styles.buttonContainer}>
        <MainButton
          onPress={() => {
            props.navigation.navigate("Tender", {setPage});
          }}
          icon={<PlusIcon />}
          width={60}
          shadowOpacity={0.4}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData.userData,
  socket: state.setSocket.socket
});

const mapDispatchToProps = dispatch => ({
  setUserData: payload => dispatch({ type: SET_USER_DATA, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen2);
