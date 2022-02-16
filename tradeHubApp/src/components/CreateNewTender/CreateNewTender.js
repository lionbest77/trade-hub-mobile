import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Overlay} from 'react-native-elements';

import COLORS from '../../constants/Colors';
import styles from './style';

import AudioRecordingButton
  from '../buttons/AudioRecodingButton/AudioRecordingButton';
import MainButton from '../buttons/MainButton/MainButton';

import MicrophoneIcon from '../../ui/icons/MicrophoneIcon';
import CheckMarkIcon from '../../ui/icons/CheckMarkIcon';
import PageTitle from '../../ui/PageTitle/PageTitle';
import CrossIcon from '../../ui/icons/CrossIcon';
import ClipIcon from '../../ui/icons/ClipIcon';

import InputForm from '../InputForm/InputForm/InputForm';
import TextArea from '../InputForm/TextArea/TextArea';

import CheckDocumentsAttachment
  from '../CheckAttachment/CheckDocumentsAttachment/CheckDocumentsAttachment';
import CheckAudioAttachment
  from '../CheckAttachment/CheckAudioAttachment/CheckAudioAttachment';
import {attachDocument} from '../DocumentPicker/DocumentPicker';

import {prepareToRecord, stopRecord} from '../Audio/audio';
import {createTenderFunction} from '../../helpers/createTenderFunction/createTenderFunction';
import {DEFAULT_URL} from '../../constants/Req';
import AddItemFromCatalog from './AddItemFromCatalog/AddItemFromCatalog';
import DeleteItemIcon from '../../ui/icons/DeleteItemIcon';
import {dateTimeToString} from '../../services/formatService';

const CreateNewTender = ({
    uri,
    sound,
    tender,
    setUri,
    setPage,
    setSound,
    userData,
    setTender,
    freeSpace,
    audioData,
    recording,
    navigation,
    setFreeSpace,
    setRecording,
    recordStatus,
    setIsChanged,
    setAudioData,
    audioDuration,
    setRecordStatus,
    arrayOfDocument,
    clearTenderData,
    setAudioDuration,
    checkStatusAudio,
    setArrayOfDocument,
    setCheckStatusAudio,

  }) => {

      const [isLoading, setIsLoading] = useState(false);
      const [arrayLength, setArrayLength] = useState(null);
      const [activeOverlay, setActiveOverlay] = useState(false);
      const [activeDateEnd, setActiveDateEnd] = useState(false);
      const [activeDateTradingEnd, setActiveDateTradingEnd] = useState(false);
      const [activeDateStart, setActiveDateStart] = useState(false);
      const [categories, setCategories] = useState([]);
      const [showCatalog, setShowCatalog] = useState(false);
      const [items, setItems] = useState([]);

      let minutes, seconds;

      if (audioDuration) {
        minutes = Math.trunc((audioDuration) / 60000);
        seconds = Math.floor(((audioDuration) / 60000 - minutes) * 60);
        if (seconds < 10) {
          seconds = `0${seconds}`;
        }
      }

      let fullDataStart = null;
      let fullDataEnd = null;

      if (tender.date_start) {
        let createDataStart = new Date(tender.date_start);
        fullDataStart = {
          year: createDataStart.getFullYear(),
          month: (createDataStart.getMonth() + 1) < 10 ?
              `0${createDataStart.getMonth() + 1}` :
              (createDataStart.getMonth() + 1),
          day: createDataStart.getDate() < 10 ?
              `0${createDataStart.getDate()}` :
              createDataStart.getDate(),
          hour: createDataStart.getHours() < 10 ?
              `0${createDataStart.getHours()}` :
              createDataStart.getHours(),
          minutes: createDataStart.getMinutes() < 10 ?
              `0${createDataStart.getMinutes()}` :
              createDataStart.getMinutes(),
        };
      }

      if (tender.date_end) {
        let createDataEnd = new Date(tender.date_end);
        fullDataEnd = {
          day: createDataEnd.getDate() < 10 ?
              `0${createDataEnd.getDate()}` :
              createDataEnd.getDate(),
          month: (createDataEnd.getMonth() + 1) < 10 ?
              `0${createDataEnd.getMonth() + 1}` :
              (createDataEnd.getMonth() + 1),
          year: createDataEnd.getFullYear(),
          hour: createDataEnd.getHours() < 10 ?
              `0${createDataEnd.getHours()}` :
              createDataEnd.getHours(),
          minutes: createDataEnd.getMinutes() < 10 ?
              `0${createDataEnd.getMinutes()}` :
              createDataEnd.getMinutes(),
        };
      }

      const handlerTenderName = value => {
        setTender(prev => ({...prev, name: value}));
        setIsChanged(true);
      };

      const handlerTenderNameDescription = value => {
        setTender(prev => ({...prev, description: value}));
        setIsChanged(true);
      };

      const handlerAddress = value => {
        setTender(prev => ({...prev, goods_delivery_address: value}));
        setIsChanged(true);
      };

      const handlerDateStart = async value => {
        setActiveDateStart(false);
        if (value) {
          await setTender(prev => ({...prev, date_start: value}));
        }
        setIsChanged(true);
      };

      const handlerDateEnd = async value => {
        setActiveDateEnd(false);
        if (value) {
          await setTender(prev => ({...prev, date_end: value}));
        }
        setIsChanged(true);
      };
      const handlerDateTradingEnd = async value => {
        setActiveDateTradingEnd(false);
        if (value) {
          await setTender(prev => ({...prev, bargain_end_date: value}));
        }
        setIsChanged(true);
      };

      const handlerPasteCopiedText = value => {
        setTender(prev => ({...prev, description: prev.description + value}));
        setIsChanged(true);
      };

      const closeOverlay = () => {
        setActiveOverlay(false);
      };

      if (audioDuration) {
        minutes = Math.trunc((audioDuration) / 60000);
        seconds = Math.floor(((audioDuration) / 60000 - minutes) * 60);
        if (seconds < 10) {
          seconds = `0${seconds}`;
        }
      }

      const url = `${DEFAULT_URL}/users/${userData.user_ID}/profile`;

      const fetchUserProfile = async () => {
        setIsLoading(true);

        await fetch(url,
            {headers: {'Authorization': `Bearer ${userData.token}`}}).
            then(res => res.json()).
            then(response => {
                  setTender(prev => ({
                    ...prev,
                    goods_delivery_address: response.company.goods_delivery_address,
                  }));
                },
            ).
            catch(e => console.log(e, 'Error'));
        setIsLoading(false);
      };

      const getCategories = async () => {
        await fetch(`${DEFAULT_URL}/categories/root`,
            {headers: {'Authorization': `Bearer ${userData.token}`}},
        ).then(res => res.json(), err => {
          console.log('Error get categories,', err);
        }).then(res => {
          // console.log(res);
          setCategories(res.map(item => ({label: item.name, value: item._id})));
          // console.log('CATEGORIES:', res);
        });
      };

      const getCategory = async (id) => {
        return fetch(`${DEFAULT_URL}/categories/${id}`,
            {headers: {'Authorization': `Bearer ${userData.token}`}},
        ).then(res => res.json());
      };

      const getItemList = async (categoryId) => {
        return fetch(`${DEFAULT_URL}/categories/${categoryId}/recursive`,
            {headers: {'Authorization': `Bearer ${userData.token}`}},
        ).then(res => res.json());
      };

      const getItem = async (itemId) => {
        return fetch(`${DEFAULT_URL}/items/${itemId}`,
            {headers: {'Authorization': `Bearer ${userData.token}`}},
        ).then(res => res.json());
      };

      const getRootCategoryByCategoryId = async (categoryId) => {
        // https://dev-back.buypro.team/api/categories/1a678ceb-d7af-41f8-9054-5e23f8b087cc
        return fetch(`${DEFAULT_URL}/categories/${categoryId}`,
            {headers: {'Authorization': `Bearer ${userData.token}`}},
        ).then(res => res.json());
      };

      const addItem = itemData => {
        console.log('========= Add item =======');
        console.log('------ items --------');
        console.log(items);
        console.log('------ /items --------');
        setItems([...items, itemData]);
      };

      const removeItem = index => {
        let tenderItems = [...items];
        tenderItems.splice(index, 1);
        setItems([...tenderItems]);
      };

      const removeItemQuery = (index, name) => Alert.alert('Попередження',
          `Товар "${name}" буде видалений з заявки. Продовжити?`, [
            {
              text: 'Ні',
              style: 'cancel',
            },
            {text: 'Так', onPress: () => removeItem(index)},
          ], {
            cancelable: true,
          });

      useEffect(() => {
        fetchUserProfile().catch(err => console.warn('Error getting user profile'));
        getCategories().catch(err => {
          console.log('Error get categories:', err);
        });
      }, []);

      return (

          <KeyboardAvoidingView
              style={{width: '100%'}}
              behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
            {isLoading ? (
                <View>
                  <ActivityIndicator size="large" color={COLORS.main}/>
                </View>
            ) : (
                <View
                    style={styles.container}>

                  <Overlay
                      isVisible={activeOverlay}
                      overlayStyle={styles.overlayContainer}
                  >
                    <>
                      <Text style={styles.textOverlay}>Створити заявку?</Text>
                      <View style={styles.buttonsContainer}>
                        <View>
                          <MainButton
                              width={80}
                              leftBorderNone
                              icon={<CrossIcon/>}
                              onPress={closeOverlay}
                          />
                        </View>
                        <View>
                          <MainButton
                              width={80}
                              rightBorderNone
                              backgroundColor={'#27AE60'}
                              onPress={async () => {
                                // if (audioDuration) {await sound.stopAsync()};
                                await setActiveOverlay(false);
                                await setIsLoading(true);
                                await setPage(0);
                                // console.log(`-----------------------`);
                                // console.log(`items: ${items}`);
                                // console.log(`-----------------------`);
                                // console.log(`items count: ${items.length}`);
                                // TODO: pass status code
                                const responseObject = {
                                  ...tender,
                                  company_id: userData.company_ID,
                                  token: userData.token,
                                  items: items,
                                  status_code: items.length > 0 ? 2 : 0,
                                };
                                
                                await createTenderFunction(
                                    responseObject,
                                    audioData && {...audioData},
                                    arrayOfDocument,
                                ).finally(() => {
                                  navigation.navigate('Main',
                                      {refresh: Date.now()});
                                });
                                await setIsLoading(false);
                                await clearTenderData();
                              }
                              }
                              icon={<CheckMarkIcon/>}
                          />
                        </View>
                      </View>
                    </>
                  </Overlay>

                  <AddItemFromCatalog showForm={showCatalog}
                                      closeForm={() => setShowCatalog(false)}
                                      categories={categories}
                                      getCategory={getCategory}
                                      getItem={getItem}
                                      getItemList={getItemList}
                                      getRootCategoryByCategoryId={getRootCategoryByCategoryId}
                                      addItem={addItem}
                                      userToken={userData.token}
                  />
                  <View style={styles.title}>
                    <PageTitle text={'Створення заявки'}/>
                  </View>

                  <View style={styles.inputsContainer}>
                    <InputForm
                        defaultValue=""
                        label={`Назва`}
                        required={true}
                        security={false}
                        selectTextOnFocus={true}
                        onChangeText={value => handlerTenderName(value)}
                    />

                    <TextArea
                        text={'Опис'}
                        description={tender.description}
                        setCopiedText={handlerPasteCopiedText}
                        setValue={value => handlerTenderNameDescription(value)}
                    />

                    <View style={{marginBottom: 10}}>
                      {!!items?.length &&
                      items.map((itemInstance, index) =>
                          <View key={index} style={styles.tenderItem}>
                            <View style={{width: '85%'}}>
                              <Text numberOfLines={1} ellipsizeMode="middle"
                                    style={styles.tenderItemName}>{index +
                              1}. {itemInstance?.name} - {itemInstance.amount}{itemInstance.measureUnit} (макс.{itemInstance.maxPrice}грн.)</Text>
                            </View>
                            <TouchableOpacity onPress={() => removeItemQuery(index,
                                itemInstance?.name)}>
                              <View style={styles.removeItemButton}>
                                <DeleteItemIcon/>
                              </View>
                            </TouchableOpacity>

                          </View>,
                      )
                      }
                      <MainButton
                          backgroundColor={'#3763c6'}
                          width={'100%'}
                          height={40}
                          onPress={() => setShowCatalog(true)}
                          label={'Додати з каталогу'}
                      />
                    </View>

                    <InputForm
                        security={false}
                        required={false}
                        selectTextOnFocus={true}
                        label={'Адреса доставки товарів'}
                        value={tender.goods_delivery_address}
                        onChangeText={value => handlerAddress(value)}
                    />
                    <DateTimePickerModal
                        isVisible={activeDateEnd}
                        mode="date"
                        onConfirm={handlerDateEnd}
                        minimumDate={tender.date_start}
                        onCancel={() => setActiveDateEnd(false)}
                    />
                    <DateTimePickerModal
                        isVisible={activeDateStart}
                        mode="date"
                        onConfirm={handlerDateStart}
                        minimumDate={new Date()}
                        onCancel={() => setActiveDateStart(false)}
                    />
                    <DateTimePickerModal
                        isVisible={activeDateTradingEnd}
                        mode="datetime"
                        onConfirm={handlerDateTradingEnd}
                        minimumDate={new Date()}
                        onCancel={() => setActiveDateTradingEnd(false)}
                    />

                    {(!activeDateStart && !activeDateEnd) &&
                    (<>
                          <View style={styles.inputsAddressContainer}>
                            <View style={{width: '40%'}}>
                              <TouchableOpacity
                                  onPress={() => setActiveDateStart(true)}>
                                <InputForm
                                    required={true}
                                    editable={false}
                                    security={false}
                                    label={'Дата початку'}
                                    selectTextOnFocus={true}
                                    onTouchStart={() => setActiveDateStart(true)}
                                    value={`${fullDataStart.day}.${fullDataStart.month}.${fullDataStart.year}`}
                                />
                              </TouchableOpacity>
                            </View>
                            <View style={{width: '40%'}}>
                              <TouchableOpacity
                                  onPress={() => setActiveDateEnd(true)}>
                                <InputForm
                                    warning={tender.date_end < tender.date_start}
                                    onTouchStart={() => setActiveDateEnd(true)}
                                    selectTextOnFocus={true}
                                    security={false}
                                    value={`${fullDataEnd.day}.${fullDataEnd.month}.${fullDataEnd.year}`}
                                    label={'Дата завершення'}
                                    required={true}
                                    editable={false}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                          <View style={{width: '100%'}}>
                            <TouchableOpacity
                                onPress={() => setActiveDateTradingEnd(true)}>
                              <InputForm
                                  // warning={!tender.bargain_end_date}
                                  onTouchStart={() => setActiveDateEnd(true)}
                                  selectTextOnFocus={true}
                                  security={false}
                                  value={dateTimeToString(tender.bargain_end_date)}
                                  label={'Час закінчення торгів'}
                                  required={true}
                                  editable={false}
                              />
                            </TouchableOpacity>
                          </View>
                        </>
                    )}

                    <Text style={styles.text}>Вкладені файли</Text>

                  </View>
                  <View style={styles.mainContainer}>
                    <View
                        style={!recordStatus ?
                            styles.subContainerStart :
                            styles.subContainer}
                    >
                      <View
                          style={
                            !recordStatus
                                ? styles.recordButtonsContainer
                                : styles.startButtonsContainer
                          }
                      >
                        {recordStatus ? (
                            <View style={{width: '70%'}}>
                              <AudioRecordingButton
                                  onPressOut={() =>
                                      stopRecord(
                                          recording,
                                          setRecordStatus,
                                          setAudioDuration,
                                          setRecording,
                                          setUri,
                                          sound,
                                          setAudioData,
                                      ).then(setIsChanged(true))
                                  }
                                  recordStatus={recordStatus}
                              />
                            </View>
                        ) : (
                            <View style={{marginRight: 25}}>
                              <MainButton
                                  containerLeft={!!audioDuration}
                                  onPress={() =>
                                      !audioDuration
                                          ? prepareToRecord(
                                          audioDuration,
                                          setRecordStatus,
                                          recording,
                                          setRecording,
                                          setAudioDuration,
                                          setUri,
                                          sound,
                                          setAudioData,
                                          )
                                          : setCheckStatusAudio(true)
                                  }
                                  backgroundColor={'#FFF'}
                                  width={!!audioDuration ? 115 : 60}
                                  height={60}
                                  icon={<MicrophoneIcon/>}
                                  label={`${minutes}:${seconds}`}
                              />
                            </View>
                        )}

                        <View>
                          <MainButton
                              containerLeft={arrayOfDocument.length}
                              backgroundColor={'#FFF'}
                              width={arrayOfDocument.length ? 80 : 60}
                              height={60}
                              icon={<ClipIcon style={{marginRight: 25}}/>}
                              onPress={() =>
                                  attachDocument(
                                      arrayOfDocument,
                                      setArrayOfDocument,
                                      setArrayLength,
                                      freeSpace,
                                      setFreeSpace,
                                  ).then(setIsChanged(true))
                              }
                              label={arrayOfDocument.length}
                          />
                        </View>
                      </View>
                    </View>

                    {checkStatusAudio && (
                        <View style={{width: '80%', position: 'relative'}}>
                          <CheckAudioAttachment
                              audioDuration={audioDuration}
                              setAudioDuration={setAudioDuration}
                              uri={uri}
                              setUri={setUri}
                              sound={sound}
                              setSound={setSound}
                              setCheckStatusAudio={setCheckStatusAudio}
                              checkStatus={checkStatusAudio}
                              creation={true}
                          />
                        </View>
                    )}

                    <View style={{width: '80%'}}>
                      <CheckDocumentsAttachment
                          arrayOfDocument={arrayOfDocument}
                          setArrayOfDocument={setArrayOfDocument}
                          freeSpace={freeSpace}
                          setFreeSpace={setFreeSpace}
                      />
                    </View>
                  </View>
                  <View style={styles.checkContainer}>
                    <MainButton
                        backgroundColor={
                          tender.name && (tender.date_start <= tender.date_end) &&
                          tender.bargain_end_date
                              ? COLORS.agreeButton
                              : COLORS.disableBtnColor
                        }
                        width={80}
                        height={60}
                        icon={<CheckMarkIcon/>}
                        onPress={async () => {
                          tender.name && (tender.date_start <= tender.date_end) &&
                          tender.bargain_end_date &&
                          setActiveOverlay(true);
                          tender.name && (tender.date_start <= tender.date_end) &&
                          tender.bargain_end_date &&
                          audioDuration && await sound.stopAsync();
                        }}
                        shadowOpacity={0.4}
                        rightBorderNone
                    />
                  </View>

                </View>

            )}

          </KeyboardAvoidingView>
      );
    }

;

const mapStateToProps = state => (
    {
      userData: state.userData.userData,
    }
);

export default connect(mapStateToProps)(CreateNewTender);

