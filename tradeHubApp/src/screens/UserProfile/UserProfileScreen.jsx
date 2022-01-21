import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';

import {
  Text,
  View,
  Image,
  Alert,
  Switch,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import uuid from 'uuid';
import axios from 'axios';

import {NewEmployeeCard} from '../../components/UserProfileComponents/EmployeeCard/NewEmployeeCard';
import UserControlButton from '../../components/buttons/UserControlButton/UserControlButton';
import AccordionButton from '../../components/buttons/AccordionButton/AccordionButton';
import ContactsData from '../../components/UserProfileComponents/ContactsData/ContactsData';
import CompanyData from '../../components/UserProfileComponents/CompanyData/CompanyData';
import MainButton from '../../components/buttons/MainButton/MainButton';
import MainHeader from '../../components/headers/MainHeader/MainHeader';
import UserData from '../../components/UserProfileComponents/UserData/UserData';

import {
  GET_AUTH_TAB,
  SET_COMPANY_PROFILE,
  SET_USER_PROFILE, UPDATE_EMPLOYEES,
} from '../../store/reduxConstants';
import COLORS from '../../constants/Colors';
import {styles} from './styles';
import {DEFAULT_URL} from '../../constants/Req';

import ArrowLeftIcon from '../../ui/icons/ArrowLeftIcon';
import CheckMarkIcon from '../../ui/icons/CheckMarkIcon';
import LogoutIcon from '../../ui/icons/LogoutIcon.js';
import ArrowDown from '../../ui/icons/ArrowDown';
import CrossIcon from '../../ui/icons/CrossIcon';
import ArrowUp from '../../ui/icons/ArrowUp';
import { removeDeviceToken } from '../../utils/authorization';

const UserProfileScreen = props => {

  const {width} = Dimensions.get('window');

  const [inviteUserActive, setInviteUserActive] = useState(false);
  const [changesOverlay, setChangesOverlay] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState(false);
  const [exitOverlay, setExitOverlay] = useState(false);
  const [initActive, setInitActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  const [newUsers, setNewUsers] = useState([]);
  const scrollRef = useRef(null);

  const url = `${DEFAULT_URL}/users/${props.userData.user_ID}/profile`;
  let newUsersObj;

  const fetchUserProfile = async () => {
    await setIsLoading(true);
    await fetch(url,
        {headers: { 'Authorization': `Bearer ${props.userData.token}`}})
    .then(res => res.json())
    .then(response =>
       {
         props.setUserProfile({
           id: response.profile.id,
           name: response.profile.name,
           email: response.profile.email,
           role:  response.profile.role,
           phone: response.profile.phone,
           twoFA: response.profile.twoFA,
           surname: response.profile.surname,
           lastName: response.profile.lastName,
           fullName: response.profile.fullName,
           additional_phone: response.profile.additional_phone,
           notifications_enabled: response.profile.notifications_enabled,
         } );
         props.setCompanyProfile({
           _id: response.company._id,
           mfi: response.company.mfi,
           name: response.company.name,
           email: response.company.email,
           phone: response.company.phone,
           users: response.company.users,
           edrpou: response.company.edrpou,
           bank_name: response.company.bank_name,
           payment_account: response.company.payment_account,
           additional_phone: response.company. additional_phone,
           goods_delivery_address: response.company.goods_delivery_address,
           documents_delivery_address: response.company.documents_delivery_address,
         });

       }
       )
    .catch(e => console.log(e, 'Error'));
    await  setIsLoading(false);
  };

  const patchChanges = async () => {
    setIsLoading (true);
    setInitActive(false);
    setExitOverlay(false);

    const options = {
      method: "PATCH",
      url: `${DEFAULT_URL}/users/profile/`,
      data: props.profile,
      headers: { 'Authorization': `Bearer ${props.userData.token}`}
      };
      await setIsLoading(true);
      await axios(options)
      .then(res => {
        setIsChanged(false);
      })
      .catch(e => {
        console.log(e.response.data, "<===== ERROR AFTER CHANGE");
      });
     setIsLoading (false);
     setIsChanged(false);
       };

  const addUser = async () => {
    if (newUsers.length < 20) {
      let newUser = {
        fullName: null,
        lastName: null,
        surname: null,
        name: null,
        email: null,
        role: null,
        key: uuid(),
      };
      setNewUsers([...newUsers, newUser]);
    }
    else {
      setActiveOverlay(true);
    }
  };

  const removeUser = item => {
    const users = newUsers.filter(
        el => el.key !== item.key
    );
        setNewUsers(users);
  };
  const closeOverlay = async () => {
    setActiveOverlay(false);
  };

  const closeOverlayChanges = async () => {
    setChangesOverlay(false);
    setInviteUserActive (false);
  };

  const exitWithoutChange = () => {
    fetchUserProfile();
    setExitOverlay(false);
    setInviteUserActive (false);
    setIsChanged(false);
    props.navigation.navigate(`${props.navigation.state.params.from}`, {refresh: Date.now()});
    setInitActive(false);
  };

  const logoutHandler = () => {
    Alert.alert('Ви впевнені, що хочете вийти?', 'У разі незбережених даних вони будуть втрачені', [
      {
        text: 'Так', onPress: async () => {
          await removeDeviceToken();
          props.navigation.navigate('Login');
          await AsyncStorage.removeItem("tradeHubUser");
        },
      }, {
        text: 'Ні',
      }]);
  };

  const editNewUser =(key, name, value) => {
    newUsersObj = newUsers.map((el) =>{
        if (el.key === key) {
          if(name ==='fullName'){
            el[name] = value;
            el.name = value.split(" ")[1];
            el.surname = value.split(" ")[2];
            el.lastName = value.split(" ")[0];
          }
           el[name] = value;
           return el;
                }
        else {
          return el
        }
     });
     setNewUsers([...newUsersObj])
  };

  const handleChange = async () => {
    let valuesArray = newUsers.map(item => {
      return  Object.values(item)
    });
    let emptyField;
    valuesArray.map(item => {
      emptyField = item.includes(null) || item.includes('') || item.includes(undefined)
    });
    if (!emptyField) {
      await props.updateEmployees(newUsers);
      setInviteUserActive (false);
      setNewUsers([]);
      setExitOverlay(true);
    }
    else {
     Alert.alert( 'Невірно заповнені дані'," Необхідно заповнити всі поля для нових співробітників" , [
        {
          text: 'Зрозуміло',
          onPress:() =>
          { setInviteUserActive (false) }
        },

      ])
    }
  };

  useEffect(() => {
    try {
     fetchUserProfile();
    }catch (e) {
      Alert.alert("Технічна помилка!", `${e.response.data}`, [
        { text: "OK" }
      ]);
    }
  }, []);

  return (
      <KeyboardAvoidingView style={{ height: '100%', width: '100%' }} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled >
      <View style={styles.mainContainer}>

       <Overlay
        isVisible={exitOverlay}
        overlayStyle={styles.overlayContainer}
        >
         <>
        <Text style={styles.text}>
       Зберегти зміни?
        </Text>
        <View style={styles.buttonsContainer2}>
          <View>
            <MainButton
                width={80}
                leftBorderNone
                icon={<CrossIcon />}
                onPress={()=> exitWithoutChange()}
            />
          </View>
          <View>
            <MainButton
                width={80}
                rightBorderNone
                backgroundColor={"#27AE60"}
                icon={<CheckMarkIcon />}
                onPress={() => patchChanges()}
            />
          </View>
        </View>
         </>
      </Overlay>
        <Overlay
            isVisible={activeOverlay}
            overlayStyle={styles.overlayContainer}
        >
          <>
          <Text style={styles.text}>
            Ви додали максимальну кількість співробітників
          </Text>
          <View style={styles.buttonsContainer}>
            <View>
              <MainButton width={100} label={'Ok'} onPress={closeOverlay}/>
            </View>
          </View>
          </>
        </Overlay>

        <Overlay
            isVisible={changesOverlay}
            overlayStyle={styles.overlayContainer}
        >
          <>
          <Text style={styles.text}>
             Дякуємо, зміни у Вашому профілі будут збережені!
          </Text>
          <View style={styles.buttonsContainer}>
            <View>
              <MainButton width={100} label={'Ok'} onPress={closeOverlayChanges}/>
            </View>
          </View>
          </>
        </Overlay>
<View style={isLoading && { width: "100%"}}>
  <MainHeader
      leftComponent={<MainButton
          width={80}
          icon={<ArrowLeftIcon color="#333"/>}
          backgroundColor="#fff"
          leftBorderNone
          onPress={ () => isChanged ? handleChange(): exitWithoutChange()}
      />}
      rightComponent={<MainButton
          width={80}
          icon={<LogoutIcon/>}
          rightBorderNone
          backgroundColor={'#fff'}
          onPress={() => {
            logoutHandler();
            props.getAuthTab(0);
          }}
      />}
  />
</View>

        { isLoading ? (
         <View style={styles.loaderContainer}>
           <ActivityIndicator size="large" color={COLORS.main} />
         </View>
         ) : (
            <ScrollView ref={scrollRef} >
              <View>
                <AccordionButton
                    text="Особисті дані"
                    initActiveState={initActive}
                    content={<UserData setIsChanged={setIsChanged}/>}
                    style={(width >= 600) ? {fontSize: 22, color: 'black'} :  (width <= 350) ? {fontSize: 13, color: 'black'} : {fontSize: 16, color: 'black'}}
                />
                <AccordionButton
                    initActiveState={initActive}
                    text="Контактна інформація"
                    content={<ContactsData setIsChanged={setIsChanged} />}
                    style={(width >= 600) ? {fontSize: 22, color: 'black'} :  (width <= 350) ? {fontSize: 13, color: 'black'} : {fontSize: 16, color: 'black'}}
                />
                <AccordionButton
                    initActiveState={initActive}
                    text="Компанія"
                    content={<CompanyData
                        scrollRef={scrollRef}
                        setIsChanged={setIsChanged}
                    />}
                    style={(width >= 600) ? {fontSize: 22, color: 'black'} :  (width <= 350) ? {fontSize: 13, color: 'black'} : {fontSize: 16, color: 'black'}}
                />
                <View style={styles.switchContainer}>
                  <Text style={styles.switchText}>Двофакторна автентифікація</Text>
                  <Switch
                      thumbColor="#fff"
                      ios_backgroundColor={{false: '#C4C4C4', true: COLORS.main}}
                      trackColor={{false: '#C4C4C4', true: COLORS.main}}
                      value={props.userProfile.twoFA}
                      onValueChange={() => {
                        props.setUserProfile({twoFA: !props.userProfile.twoFA});
                        setIsChanged(true);
                      }}
                  />
                </View>
                <View style={styles.switchContainer}>
                  <Text style={styles.switchText}>Повідомлення</Text>
                  <Switch
                      thumbColor="#fff"
                      ios_backgroundColor={{false: '#C4C4C4', true: COLORS.main}}
                      trackColor={{false: '#C4C4C4', true: COLORS.main}}
                      value={props.userProfile.notifications_enabled}
                      onValueChange={() => {
                        props.setUserProfile({notifications_enabled: !props.userProfile.notifications_enabled});
                        setIsChanged(true);
                      }}
                  />
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('FAQ')}>
                  <View style={styles.switchContainer}>
                    <Text style={styles.switchText}>FAQ</Text>
                    <Image source={require('../../assets/images/FAQArrow.png')}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                      setInviteUserActive(!inviteUserActive);
                      setTimeout(() => {
                        scrollRef.current.scrollToEnd();
                      }, 100);
                    }}
                >
                  <View style={styles.switchContainer}>
                    <Text style={styles.switchText}>Запрошення користувачів</Text>
                    {inviteUserActive ? <ArrowUp/> : <ArrowDown/>}
                  </View>

                </TouchableOpacity>
                {inviteUserActive && (<View style={{paddingHorizontal: 30}}>
                      <View style={{marginBottom: (width >= 600) ? '5%' : '10%'}}>
                        {newUsers.map(item => (
                            <NewEmployeeCard
                                setIsChanged={setIsChanged}
                                setNewUsers={editNewUser}
                                item={item}
                                onPress={(item) => removeUser(item)}
                                key={item.key}/>))}
                      </View>

                      <View style={{marginBottom: 30}}>
                        <UserControlButton
                            onPress={() => {
                              addUser();
                              setTimeout(() => {
                                scrollRef.current.scrollToEnd();
                              }, 100);
                            }}
                        />
                      </View>

                    </View>

                )}

              </View>
              <View style={styles.buttonContainer}>
                <MainButton
                    backgroundColor={!isChanged ? COLORS.disableBtnColor : COLORS.main }
                    smallFontSize={(width >= 600) ? 24 : 18}
                    containerLeft={true}
                    label={'Зберегти зміни'}
                    height={(width >= 600) ? 80: 60}
                    onPress={() => isChanged && handleChange()}
                    icon={<CheckMarkIcon/>}
                    color={'#fff'}
                />
              </View>
            </ScrollView>
        )}

      </View>
      </KeyboardAvoidingView>);
};

const mapDispatchToProps = dispatch => ({
  getAuthTab: number => dispatch({type: GET_AUTH_TAB, authTabNumber: number}),
  setUserProfile: payload => dispatch({type: SET_USER_PROFILE, payload}),
  updateEmployees: payload => dispatch({type: UPDATE_EMPLOYEES, payload}),
  setCompanyProfile: payload => dispatch({type: SET_COMPANY_PROFILE, payload}),
});

const mapStateToProps = state => ({
  profile: state.userProfile.profile,
  userData: state.userData.userData,
  userProfile: state.userProfile.profile.profile,
  authTabNumber: state.reducerOne.authTabNumber,
  companyProfile: state.userProfile.profile.company,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);
