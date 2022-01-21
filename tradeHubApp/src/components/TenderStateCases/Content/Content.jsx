import React, {useState, useEffect, useRef} from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Alert,
} from 'react-native';
import uuid from "uuid";
import {Audio} from 'expo-av';

import ClipIcon from "../../../ui/icons/ClipIcon";
import MainButton from "../../../components/buttons/MainButton/MainButton";
import DownloadIcon from "../../../ui/icons/Download";
import ManVoiceIcon from "../../../ui/icons/ManVoiceIcon.js";
import { downloadHelper } from "../../../helpers/download/downloadHelper.js";

import { styles } from "./style.js";
import { DEFAULT_URL } from "../../../constants/Req.js";

import AudioChart from "../../../ui/icons/AudioChart";
import CheckMarkIcon from '../../../ui/icons/CheckMarkIcon';
import {CategoryCard} from '../CategoryCard/CategoryCard';
import CheckAudioAttachment from "../../CheckAttachment/CheckAudioAttachment/CheckAudioAttachment.js";
import {dateTimeToString} from '../../../services/formatService';

const Content = props => {
  const {
    documents_delivery_address,
    goods_delivery_address,
    additional_conditions,
    description,
    date_start,
    date_end,
    bargain_end_date,
    files,
    audio,
    items,
    name,
  } = props.tender;

  let { width } = Dimensions.get("window");
  let platform = Platform.OS;

  const ref=useRef(null);

  const {
    previousState = false,
    needToApprove = false,
    setPreviousState,
    exitScreen
  } = props;

  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(new Audio.Sound());
  const [goods, setGoods] = useState([]);
  const [uri, setUri] = useState({uri: audio ? `${DEFAULT_URL}${audio.path}` : '' });

  let minutes, seconds;
  let categoryArray=[];

  if(audio){
    minutes = Math.trunc((audio.metadata.audioObject.durationMillis)/60000);
    seconds  = Math.floor(((audio.metadata.audioObject.durationMillis)/60000 - minutes ) * 60);
    if(seconds < 10) {
      seconds = `0${seconds}`;
    }
  }

  let fullDataStart = null;
  let fullDataEnd = null;

  if (date_start) {
    let createDataStart = new Date(date_start);
    fullDataStart = {
      month: (createDataStart.getMonth() + 1) < 10 ? `0${createDataStart.getMonth() + 1}` : (createDataStart.getMonth() + 1),
      day: createDataStart.getDate() < 10 ? `0${createDataStart.getDate()}` : createDataStart.getDate(),
      year: createDataStart.getFullYear(),
      hour: createDataStart.getHours() < 10  ? `0${createDataStart.getHours()}` : createDataStart.getHours(),
      minutes: createDataStart.getMinutes() < 10  ? `0${createDataStart.getMinutes()}` : createDataStart.getMinutes(),
    }
  }

 if(date_end){
   let createDataEnd = new Date(date_end);
   fullDataEnd = {
     day: createDataEnd.getDate() < 10 ? `0${createDataEnd.getDate()}` : createDataEnd.getDate(),
     month: (createDataEnd.getMonth() + 1) < 10 ? `0${createDataEnd.getMonth() + 1}` : (createDataEnd.getMonth() + 1),
     year: createDataEnd.getFullYear(),
     hour: createDataEnd.getHours() < 10  ? `0${createDataEnd.getHours()}` : createDataEnd.getHours(),
     minutes: createDataEnd.getMinutes() < 10  ? `0${createDataEnd.getMinutes()}` : createDataEnd.getMinutes(),
   }
 }

  const createSound =  async () => {
    try {
     await sound.loadAsync(uri, {}, true );
   } catch (e) {
      Alert.alert("Помилка при завантаженні аудіо", `${e}`, [{ text: "OK" }]);
   }
};

 const goToPreviewScreen = (path, extension) => {
   let uri;
   if(platform === 'android'){
     if (extension === 'pdf' || extension === 'doc' || extension === 'docx' || extension === 'txt') {
       uri = `https://docs.google.com/gview?url=${DEFAULT_URL}${path}`;
     } else {
       uri = `${DEFAULT_URL}${path}`;
     }
   } else {
     uri = `${DEFAULT_URL}${path}`;
   }
   props.navigation.navigate('Preview', {path: uri});
 };

  useEffect( () => {
    if(audio) {createSound()}
    if (items.length) {
      categoryArray = items.map((elem) =>
          (<CategoryCard
                  key={Date.now().toString()}
                  item ={elem} />
          )
      )}
    setGoods(categoryArray);
     }, []);


  return (
      <View style={{ ...props.addStyle, flex: 1 }}>
        <ScrollView ref={ref} showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            <Text style={styles.mainContentLabel}>Опис</Text>
            <Text style={styles.descLabel}>Назва</Text>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.descLabel}>Опис</Text>
            <Text style={styles.title}>{description}</Text>
            <View style={styles.details}>
              <Text style={styles.descLabel}>Вид замовлення</Text>
              <Text style={styles.title}>Закупівля</Text>

              <View style={styles.categoryContainer}>
                <View style={{width: '70%'}}>
                  <Text style={styles.descLabel}>Найменування товару </Text>
                </View>
                <View style={{width: '29%', alignItems: 'flex-end'}}>
                  <Text style={styles.descLabel}>Кількість</Text>
                </View>
               </View>
              {!previousState &&
              <View style={{paddingVertical: '2%'}}>
               {goods}
              </View>
              }
              <View style={styles.dateContainer}>
                <View style={styles.dateSubContainer}>
                  <Text style={styles.descLabel}>Дата початку</Text>
                  <Text style={styles.title}>{fullDataStart && `${fullDataStart.day}.${fullDataStart.month}.${fullDataStart.year}`} </Text>
                </View>

                <View style={{...styles.dateSubContainer, alignItems: 'flex-end'}}>
                  <Text style={styles.descLabel}>Дата завершення</Text>
                  <Text style={styles.title}>{fullDataEnd && `${fullDataEnd.day}.${fullDataEnd.month}.${fullDataEnd.year}`}</Text>
                </View>
              </View>

              <View style={styles.dateContainer}>
                <View style={styles.dateSubContainer}>
                  <Text style={styles.descLabel}>Час закінчення торгів</Text>
                  <Text style={styles.title}>{dateTimeToString(bargain_end_date)}</Text>
                </View>
              </View>
              <Text style={styles.descLabel}>Адреса доставки документів:</Text>
              <Text style={styles.title}>{documents_delivery_address}</Text>
              <Text style={styles.descLabel}>Адреса доставки товарів:</Text>
              <Text style={styles.title}>{goods_delivery_address}</Text>
              <Text style={styles.descLabel}>Додаткові умови</Text>
              <Text style={styles.title}>{additional_conditions}</Text>
            </View>

            <View style={styles.filesContainer}>
              <Text style={styles.descLabel}>
                Вкладені файли
              </Text>

              {files.map((item, index) => (

                  <View style={styles.files} key={uuid()}>
                    <TouchableOpacity
                        style={{ width: width >= 600 ? "40%" : "80%"}}
                        onPress={() => goToPreviewScreen (item.path, item.extension) }
                    >
                    <View style={styles.file}>
                      <ClipIcon/>
                      <Text style={{paddingLeft: "5%", paddingRight: "3%"}} ellipsizeMode={'head'} numberOfLines={1}>
                        {item.filename.length < 10 ?
                            item.filename + '.' + item.extension :
                            item.filename.slice(0, 18) + '...' + item.extension}
                      </Text>
                    </View>
                  </TouchableOpacity>
                    <View style={{marginVertical: 8}}>
                      <MainButton
                          width={44}
                          backgroundColor={'#000'}
                          height={44}
                          icon={<DownloadIcon/>}
                          onPress={() => downloadHelper(`${DEFAULT_URL}${files[index].path}`)}
                      />
                    </View>

                  </View>))}

              {audio &&
              <View style={styles.audioWrapper}>

                <TouchableOpacity
                    onPress={() => {
                      setIsPlaying(!isPlaying);
                      setTimeout (()=>{ref.current.scrollToEnd({animated: true}); props.formRef?.current.scrollToEnd({animated: true})}, 100);
                    }}
                >
                  <View style={styles.file}>
                    <View style={{paddingRight: 16}}>
                      <ManVoiceIcon/>
                    </View>
                    <AudioChart/>
                  </View>

                </TouchableOpacity>

                <Text style={[styles.descLabel, styles.audioCounter]}>
                  {minutes}:{seconds}
                </Text>
              </View>

              }

              {isPlaying &&
              <View>
                <CheckAudioAttachment
                  audioDuration={audio.metadata.audioObject.durationMillis}
                  uri={uri}
                  setUri={setUri}
                  sound={sound}
                  setSound={setSound}
                  checkStatus={true}
                  creation={false}
              />
              </View>}
            </View>

          </View>
          {needToApprove && !previousState &&
          <View style={styles.buttonContainer1}>
            <MainButton
                smallFontSize={width >= 600 ? 22 : 18}
                height={width >= 600 ? 70 : 60}
                containerLeft={true}
                icon={<CheckMarkIcon />}
                width={"100%"}
                label={"Все вірно!"}
                onPress={() => exitScreen()}
                color={"#fff"}
            />
          </View>
          }
          {needToApprove &&
          <TouchableOpacity
          onPress={() => setPreviousState(!previousState)}
          >
            <View style={{ alignItems: "center", marginBottom: '5%' }}>
              <Text style={styles.tenderTooltip}>
                { previousState ? `Актуальний вигляд заявки`  : `Початковий вигляд заявки`  }
              </Text>
            </View>
          </TouchableOpacity>
          }
        </ScrollView>
      </View>
  );
};

export default Content;
