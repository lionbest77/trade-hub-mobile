import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {
  View,
  Text,
  Alert,
  AppState,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';

import axios from 'axios';
import {Audio} from 'expo-av';
import {styles} from './style';
import {Overlay} from 'react-native-elements';
import {GiftedChat} from 'react-native-gifted-chat';
import {DEFAULT_URL} from '../../constants/Req';

import {
  renderBubble, renderInputToolbar, renderSend,
} from '../../services/ChatStyles';

import renderFileBuble from '../../services/ChatStyles.js';
import {sendAudio, sendFile, sendPost} from '../../services/chatService';

import ChatHeader from '../../components/headers/ChatHeader/ChatHeader';
import MainButton from '../../components/buttons/MainButton/MainButton';
import {stopRecord} from '../../components/Audio/audio';
import {RenderComposer} from '../../components/Chat/Composer/composer';
import CheckAudioAttachment from '../../components/CheckAttachment/CheckAudioAttachment/CheckAudioAttachment';

import CrossIcon from '../../ui/icons/CrossIcon';
import CheckMarkIcon from '../../ui/icons/CheckMarkIcon';
import COLORS from '../../constants/Colors';

const ChatScreen = (props) => {
  const [checkStatusAudio, setCheckStatusAudio] = useState(false);
  const [attachOverlay, setAttachOverlay] = useState(false);
  const [audioDuration, setAudioDuration] = useState(null);
  const [recordStatus, setRecordStatus] = useState(false);
  const [audioOverlay, setAudioOverlay] = useState(false);
  const [recording, setRecording] = useState(new Audio.Recording());
  const [inputText, setInputText] = useState("");
  const [audioData, setAudioData] = useState();
  const [freeSpace, setFreeSpace] = useState(10485760);
  const [isLoading, setLoading] = useState(false);
  const [stateApk, setStateApk] = useState(null);
  const [document, setDocument] = useState({});
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(props.userData.user_ID);
  const [sound, setSound] = useState(new Audio.Sound());
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    name: "Ви",
    _id: props.userData.user_ID,
  });
  const [uri, setUri] = useState(null);

  const tenderId = props.navigation.state.params.tenderId;
  const socket = props.socket;

  // console.log(socket.connected, '----connect');
  // console.log(stateApk, isAttach);

  if(!socket.connected){
    props.navigation.navigate("Main",  {refresh: Date.now()})
  }

  const clearTenderData = async () => {
    stopRecord(
      recording,
      setRecordStatus,
      setAudioDuration,
      setRecording,
      setUri,
      sound,
      setAudioData
    );
    await sound.stopAsync();
    setSound(new Audio.Sound());
    setAudioDuration(null);
    setFreeSpace(10485760);
    setUri(null);
    setAudioData(null);
    setCheckStatusAudio(false);

    // console.log("cleaned");
  };

  const onSend = async (messages) => {
      await messages.forEach((msg) => sendPost(msg.text, tenderId, userId, socket));
      await setInputText("");
      await clearTenderData();
  };

  useEffect(() => {
    const url = `${DEFAULT_URL}/messages/history/${tenderId}?size=1000&page=0`;

    try {
      setLoading(true);
      axios.get(url,
          {headers: { 'Authorization': `Bearer ${props.userData.token}`}}).then((res) => {
        // console.log(res, '------------History From Chat');
        setMessages(res.data);
        setLoading(false);
      }).catch((err) => {
        console.log(err);
      });
    } catch (e) {
      Alert.alert('Chat Screen', `${e.response.data}`, [{text: 'OK'}]);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    try {
      axios.patch(`${DEFAULT_URL}/users/${userId}/messages/${tenderId}/read`,
          {}, {headers: { 'Authorization': `Bearer ${props.userData.token}`}}
          )
      // .then(res => console.log(res, '-------------read patch request'))
    } catch (e) {
      console.log(e, '------Error read patch request');
    }
    socket.emit('joinChat', {
      user_id: userId, tender_id: tenderId,
    });

    socket.on('joinChat', (data) => {
      // console.log(data, '--------join chat');
      if (data.success !== true) {
        setError(true);
      }
      // console.log(userId, '-----------user ID');

      socket.on('chatMessage', (data) => {
        // console.log(data, '-------------data from UseEffect ChatMessage');
        setMessages((messages) => [...messages, data].sort((a, b) => {
          let dateA = new Date(a.created_at);
          let dateB = new Date(b.created_at);
          return dateB - dateA;
        }));

      });

      setLoading(false);
    });

    socket.on('error', (error) => {
      console.log(error, '-------------error from UseEffect Chat');

    });

    return () => {
      socket.emit('leaveChat', {user_id: userId, tender_id: tenderId});
      socket.off('chatMessage');
      socket.off('joinChat');
    };
  }, []);

  useEffect(() => {
    AppState.addEventListener("change",() => setStateApk(AppState.currentState));
    return () => {
    AppState.removeEventListener("change", () => setStateApk(null));
    };
  },[]);

  return (
   <KeyboardAvoidingView style={{ height: '100%', width: '100%' }} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0} >
    <View style={{ height: "100%", backgroundColor: "#fff" }}>
      <ChatHeader
        navigation={props.navigation}
        date={props.navigation.state.params.createData}
        internalId={props.navigation.state.params.internalId}
        tenderId={tenderId}
      />
      <Overlay
          isVisible={audioOverlay}
          overlayStyle={styles.overlayContainer}
         >
        <Text style={styles.text2}>
          Відправити аудіозапис?
        </Text>
        {audioData &&
        <View style={{width: '80%', marginHorizontal: '10%', marginBottom: '5%'}}>
          <CheckAudioAttachment
            audioDuration={audioData.durationMillis}
            uri={uri}
            setUri={setUri}
            sound={sound}
            setSound={setSound}
            checkStatus={true}
            creation={false}
        />
        </View>
        }

        <View style={styles.buttonsContainer2}>
          <View>
            <MainButton
                width={80}
                leftBorderNone
                icon={<CrossIcon />}
                onPress={()=> {
                  setAudioOverlay(false);
                  clearTenderData()}}
            />
          </View>
          <View>
            <MainButton
                width={80}
                rightBorderNone
                backgroundColor={"#27AE60"}
                icon={<CheckMarkIcon />}
                onPress={() => {
                  sendAudio(tenderId, userId, audioData, socket);
                  setAudioOverlay(false);
                  clearTenderData();
                }
                }
            />
          </View>
        </View>
      </Overlay>
      <Overlay
          isVisible={attachOverlay}
          overlayStyle={styles.overlayContainer}
      >
        <Text style={styles.text2}>
          Відправити файл {document.name && document.name}?
        </Text>
        <View style={styles.buttonsContainer2}>
          <View>
            <MainButton
                width={80}
                leftBorderNone
                icon={<CrossIcon />}
                onPress={()=> {
                  setAttachOverlay(false);
                  clearTenderData()}}
            />
          </View>
          <View>
            <MainButton
                width={80}
                rightBorderNone
                backgroundColor={"#27AE60"}
                icon={<CheckMarkIcon />}
                onPress={() => {
                  sendFile(tenderId, userId, document, socket, setLoading);
                  setAttachOverlay(false);
                  clearTenderData();
                }
                }
           />
          </View>
        </View>
      </Overlay>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.main} />
        </View>
      ) : (
        <GiftedChat
          onInputTextChanged={(text) => setInputText(text)}
          renderInputToolbar={renderInputToolbar}
          isKeyboardInternallyHandled={false}
          renderFileBuble={renderFileBuble}
          renderComposer={RenderComposer}
          disableComposer={recordStatus}
          renderUsernameOnMessage={true}
          renderBubble={renderBubble}
          recordStatus={recordStatus}
          renderSend={renderSend}
          showUserAvatar={false}
          renderAvatar={null}
          messages={messages}
          bottomOffset={-15}
          onSend={onSend}
          user={user}
          renderLoading={() => {
            <Text>Loading...</Text>;
          }}
          placeholder={!recordStatus ? "Відправити повідомлення..." : "Йде запис..."}
          extraData={{
            setRecordStatus,
            setAttachOverlay,
            setAudioDuration,
            setAudioOverlay,
            audioDuration,
            recordStatus,
            setRecording,
            setAudioData,
            setFreeSpace,
            setDocument,
            recording,
            freeSpace,
            audioData,
            tenderId,
            document,
            setUri,
            sound,
          }}
        />
      )}
    </View>
   </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state) => ({
  userData: state.userData.userData,
  socket: state.setSocket.socket
});


export default connect(mapStateToProps)(ChatScreen);
