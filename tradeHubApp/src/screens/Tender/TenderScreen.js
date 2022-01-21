import React, {useState} from 'react';
import {View, ScrollView, Alert} from 'react-native';
import {Audio} from 'expo-av';

import {styles}  from "./style";
import MainHeader from "../../components/headers/MainHeader/MainHeader";
import MainButton from '../../components/buttons/MainButton/MainButton';
import {stopRecord} from '../../components/Audio/audio';
import ArrowLeftIcon from '../../ui/icons/ArrowLeftIcon';
import CreateNewTender from '../../components/CreateNewTender/CreateNewTender';

const TenderScreen = (props) => {
  const [checkStatusAudio, setCheckStatusAudio] = useState(false);
  const [arrayOfDocument, setArrayOfDocument] = useState([]);
  const [audioDuration, setAudioDuration] = useState(null);
  const [recordStatus, setRecordStatus] = useState(false);
  const [scrollEnable, setScrollEnable] = useState(true);
  const [freeSpace, setFreeSpace] = useState(10485760);
  const [recording, setRecording] = useState(new Audio.Recording());
  const [audioData, setAudioData] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [tender, setTender] = useState({ name: "", description: "", goods_delivery_address: "", date_start: new Date(), date_end: new Date() });
  const [sound, setSound] = useState(new Audio.Sound());
  const [uri, setUri] = useState(null);

 const navigation = props.navigation;
 const {setPage} = props.navigation.state.params;
 const clearTenderData = () => {
    stopRecord(recording,
        setRecordStatus,
        setAudioDuration,
        setRecording,
        setUri,
        sound,
        setAudioData);
    setSound(new Audio.Sound());
    setAudioDuration(null);
    setFreeSpace(10485760);
    setUri(null);
    setArrayOfDocument([]);
    setTender({ name: "", description: "", goods_delivery_address: "", date_start: new Date(), date_end: new Date() });
    setAudioData(null);
    setCheckStatusAudio(false);
  };

 const handlerGoBack = () => {
    Alert.alert( 'Незбережені дані будуть втрачені', "Ви впевнені, що хочете вийти?" , [
      {
        text: 'Так',
        onPress:() =>
          {
            navigation.navigate('Main', {refresh: Date.now()});
            clearTenderData()}
      },
      {
        text: 'Ні',
      }
    ])
  };

  return (
      <View style={styles.container}>
        <MainHeader
            leftComponent={<MainButton
                width={80}
                height={60}
                shadowOpacity={0.4}
                backgroundColor={'#fff'}
                icon={<ArrowLeftIcon color={'#000'}/>}
                leftBorderNone
                onPress={async () =>
                {isChanged ? handlerGoBack() : navigation.navigate('Main', {refresh: Date.now()});
                await sound.stopAsync()}}
            />}/>

        <ScrollView scrollEnabled={scrollEnable}>

          <View style={styles.mainContainer}>
           <CreateNewTender
               uri={uri}
               sound={sound}
               setUri={setUri}
               tender={tender}
               setPage={setPage}
               setSound={setSound}
               setTender={setTender}
               audioData={audioData}
               freeSpace={freeSpace}
               recording={recording}
               navigation ={navigation}
               setFreeSpace={setFreeSpace}
               setAudioData={setAudioData}
               setRecording={setRecording}
               recordStatus={recordStatus}
               setIsChanged={setIsChanged}
               audioDuration={audioDuration}
               setRecordStatus={setRecordStatus}
               clearTenderData={clearTenderData}
               arrayOfDocument={arrayOfDocument}
               setAudioDuration={setAudioDuration}
               checkStatusAudio={checkStatusAudio}
               setArrayOfDocument={setArrayOfDocument}
               setCheckStatusAudio={setCheckStatusAudio}
            />

          </View>

        </ScrollView>

      </View>

  );
};

export default TenderScreen;
