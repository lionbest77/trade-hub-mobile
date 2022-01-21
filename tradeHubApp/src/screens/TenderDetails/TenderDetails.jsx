import React, {useState, useEffect} from 'react';

import {View, Text, ActivityIndicator, Alert} from 'react-native';

import {connect} from 'react-redux';

import axios from 'axios';

import {DEFAULT_URL} from '../../constants/Req.js';
import {styles} from './styles';

import TenderSuccessfulDelivery
  from '../../components/TenderStateCases/TenderSuccessfulDelivery/TenderSuccessfulDelivery';
import TenderSupplierSelection
  from '../../components/TenderStateCases/TenderSupplierSelection/TenderSupplierSelection';
import TenderApprovalRequired
  from '../../components/TenderStateCases/TenderApprovalRequired/TenderApprovalRequired';
import TenderContract
  from '../../components/TenderStateCases/TenderContract/TenderContract';
import TenderApproved
  from '../../components/TenderStateCases/TenderApproved/TenderApproved';
import TenderDelivery
  from '../../components/TenderStateCases/TenderDelivery/TenderDelivery';
import ArrowLeftIcon from '../../ui/icons/ArrowLeftIcon';
import MainHeader from '../../components/headers/MainHeader/MainHeader';
import MainButton from '../../components/buttons/MainButton/MainButton';
import TenderNew from '../../components/TenderStateCases/TenderNew/TenderNew';
import ChatIcon from '../../ui/icons/ChatIcon';
import COLORS from '../../constants/Colors';

const TenderDetails = props => {

  const socket = props.socket;

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [tender, setTender] = useState({});
  const [unread, setUnread] = useState(null);

  const tenderId = props.navigation.state.params._id;
  const userId = props.userData.user_ID;
  const role = props.userData.role;

  const statusSetter = (status) => {
    setStatus(status);
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      axios.get(`${DEFAULT_URL}/tenders/${tenderId}`,
          {headers: {'Authorization': `Bearer ${props.userData.token}`}}).
          then((res) => {
            // console.log(res.data, "<<<< RES");
            setTender(res.data);
            setStatus(tender.status_code);
            setIsLoading(false);
          }).
          catch((err) => {
            console.log(err);
          });
    } catch (e) {
      Alert.alert('Tender details', `${e.response.data}`, [
        {text: 'OK'},
      ]);
    }
  }, [status]);

  useEffect(() => {
    setIsLoading(true);

    const url = `${DEFAULT_URL}/tenders/${tenderId}/users/${userId}/messages/unread`;

    axios.get(url,
        {headers: {'Authorization': `Bearer ${props.userData.token}`}}).
        then((res) => {
          setUnread(res.data.unread);
          setIsLoading(false);
        }).
        catch((err) => {
          console.log(err);
        });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit('chatNotificationsSubscribe', {tender_id: tenderId});

      socket.on('chatNotification', (data) => {
        setUnread(prev => (++prev));
      });

      socket.on('notifications', async (data) => {
            const id = data.data.tender_id;

            if (tenderId === id) {
              const tenderResponse = await axios.get(
                  `${DEFAULT_URL}/tenders/${tenderId}`,
                  {headers: {'Authorization': `Bearer ${props.userData.token}`}});

              setStatus(tenderResponse.data.status_code);
              setTender(tenderResponse.data);
            }
          },
      );

      socket.on('error', (error) => {
            console.log(error, '-----error');
          },
      );
    }

    return () => {
      if (socket) {
        socket.off('notifications', (data) => console.log(data, 'OFF'));
        socket.off('chatNotification', (data) => console.log(data, 'OFF'));
        socket.emit('chatNotificationsUnsubscribe', {tender_id: tenderId});
      }
    };
  }, []);

  return (
      <View style={styles.mainContainer}>
        <View style={{width: '100%'}}>
          <MainHeader
              leftComponent={
                <View>
                  <MainButton
                      width={87}
                      shadowOpacity={0.4}
                      backgroundColor={'#FBFBFB'}
                      icon={<ArrowLeftIcon color={'#000'}/>}
                      leftBorderNone
                      onPress={() => props.navigation.navigate(
                          `${props.navigation.state.params.from}`,
                          {refresh: Date.now()})}
                  />
                </View>
              }
              rightComponent={
                <View>
                  <MainButton
                      icon={<ChatIcon/>}
                      backgroundColor={'#FBFBFB'}
                      rightBorderNone={true}
                      width={122}
                      label={'Чат'}
                      containerLeft={true}
                      onPress={() =>
                          props.navigation.navigate('Chat', {
                            tenderId,
                            internal_id: tender.internal_id,
                            created_at: tender.created_at,
                            from: 'TenderDetails',
                          })
                      }
                  />
                  <Text style={unread <= 9 ?
                      styles.counter :
                      styles.counter2}>{unread > 9 ?
                      '9+' :
                      unread === 0 ? null : unread}</Text>
                </View>
              }
          />
        </View>
        <View style={styles.contentContainer}>
          {isLoading ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={COLORS.main}/>
              </View>
          ) : (
              (() => {
                switch (status) {
                  case 3:
                    return (
                        <TenderSupplierSelection
                            token={props.userData.token}
                            tender={tender}
                            unread={unread}
                            navigation={props.navigation}
                            statusSetter={statusSetter}
                            role={role}
                        />
                    );
                  case 5:
                    return <TenderDelivery
                        tender={tender}
                        token={props.userData.token}
                        navigation={props.navigation}/>;
                  case 1:
                    return (

                        <TenderApprovalRequired
                            tender={tender}
                            navigation={props.navigation}
                            statusSetter={statusSetter}
                            unread={unread}
                        />
                    );
                  case 4:
                    return <TenderContract
                        tender={tender}
                        unread={unread}
                        navigation={props.navigation}/>;
                  case 2:
                    return <TenderApproved
                        tender={tender}
                        unread={unread}
                        navigation={props.navigation}/>;
                  case 6:
                    return (
                        <TenderSuccessfulDelivery
                            tender={tender}
                            unread={unread}
                            navigation={props.navigation}/>
                    );
                  case 0:
                    return <TenderNew
                        tender={tender}
                        unread={unread}
                        navigation={props.navigation}/>;
                  default:
                    return null;
                }
              })()
          )}
        </View>
      </View>
  );
};

const mapStateToProps = (state) => ({
  socket: state.setSocket.socket,
  userData: state.userData.userData,
});

export default connect(mapStateToProps)(TenderDetails);
