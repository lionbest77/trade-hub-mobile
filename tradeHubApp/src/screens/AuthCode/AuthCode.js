import React, { useRef, useState} from "react";
import {connect} from 'react-redux';

import {
  View,
  Text,
  Platform,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";

import ResendCodeButton from "../../components/buttons/ResendCodeButton/ResendCodeButton";
import MainButton from "../../components/buttons/MainButton/MainButton";
import MainHeader from "../../components/headers/MainHeader/MainHeader";

import ArrowLeftIcon from "../../ui/icons/ArrowLeftIcon";
import InformText from "../../ui/InformText/InformText";

import {GET_AUTH_TAB, GET_SCREEN, GET_TAB, SET_USER_DATA} from '../../store/reduxConstants';
import { DEFAULT_URL } from "../../constants/Req";
import COLORS from '../../constants/Colors';
import styles from "./style";

const AuthCode = props => {

  // console.log(props);

  const [id, setId] = useState(props.navigation.state.params.id);
  const [code, setCode] = useState("");
  const [email, setEmail] = useState(props.navigation.state.params.email);
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stateInputs, setStateInputs] = useState({
    "1": "",
    "2": "",
    "3": "",
    "4": "",
    "5": ""
  });
  const [activeOverlay, setActiveOverlay] = useState(false);

  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);
  const input5 = useRef(null);
  const arr = [input1, input2, input3, input4, input5];

  let googleReg;
  let registration;

  if (props) {
    registration = props.navigation
      ? props.navigation.state.params.registration
      : null;
  }
  if (props) {
    googleReg = props.navigation
      ? props.navigation.state.params.googleReg
      : null;
  }
  const handleInputChange = (text, input) => {
    const regex = /[0-9]/;
    if (regex.test(text.toLowerCase())) {
      setStateInputs({ ...stateInputs, [input]: text });
      if (arr.length > +input && text) {
        let temp = arr[+input];
        arr[+input].current.focus();
      }
      return;
    }
    setStateInputs({ ...stateInputs, [input]: "" });
  };

  const reversedInputChange = input => {
    if(input === 4) {
      if(stateInputs[5] === ''){
        arr[3].current.focus();
        setStateInputs({ ...stateInputs, [4]: "" });
      }
    } else {
      let tempIndex = input - 1;
      arr[tempIndex].current.focus();
      setStateInputs({ ...stateInputs, [input]: "" });
    }
    };

  const special = input => {
    const tempIndex = input;
    arr[tempIndex].current.focus();
  };
  const resetCode = () => {
    setCode("");
  };
  const resetInputs = () => {
    setStateInputs({ "1": "", "2": "", "3": "", "4": "", "5": "" });
  };
  const convertor = async stateInputs => {
    const arr = +Object.values(stateInputs)
      .toString()
      .replace(/,/g, "");
    if (arr.length < 5) {
      setWarning("Код повинен складатися з 5 цифр.");
    }
    setWarning(" ");
    setCode(arr);
  };

  const sendCode = async code => {
      props.getTabNumber(2);
      props.getScreenNumber(1);
      const authOptions = {
        method:
            props.navigation.state.params.login  ?
                "POST"
                :
                "PATCH",
        url:
            props.navigation.state.params.login  ?
                `${DEFAULT_URL}/users/signIn`
                :
                `${DEFAULT_URL}/users/authenticate/${id}`,

        data:
          props.navigation.state.params.login  ?
            { code: code,
              email: props.navigation.state.params.email,
              password: props.navigation.state.params.password,
             }
             :{code: code}

      };
    // console.log(authOptions, '-----------Options for code after  registration');

    await setIsLoading(true);
      // console.log(authOptions);
      await axios(authOptions)
      .then(res => {
        // console.log(res.data, "<========== RES after auth code send");
        if(res.data) {
          props.setUserData({
            user_ID: res.data.userId,
            company_ID: res.data.companyId,
            role: res.data.role,
            token: res.data.token
          });
          AsyncStorage.setItem("tradeHubUser", JSON.stringify({
            user_ID: res.data.userId,
            company_ID: res.data.companyId,
            role: res.data.role,
            token: res.data.token,
          }));
        }
        if (res.data.success === false) {
          setWarning(
              "Введений Вами код не співпадає з кодом, відправленим на Email"
          );
          setCode("");
        } else if (googleReg === true) {
          setActiveOverlay(true);
          // props.navigation.navigate("Login");
        }
        else if (props.navigation.state.params.login) {
          props.navigation.navigate("Main");
        }
        else {
          props.navigation.navigate("ConfirmPassword", { id, registration });
        }
      })
      .catch(error =>{ setError(true); console.log(error.response, "<<<<<< ERROR")});
      await setIsLoading(false);
  };

  // console.log(code);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <MainHeader />
      <Overlay
          isVisible={activeOverlay}
          overlayStyle={styles.overlayContainer}
          onBackdropPress={() => {setIsLoading(false); props.navigation.navigate("Login");}}
      >
        <Text style={styles.text}>
          Дякуємо, Ви зареєструвалися. Ми повідомимо Вас по email, коли заявка
          буде оброблена.
        </Text>
        <View style={styles.buttonsContainer}>
          <View>
            <MainButton
                width={100}
                label={"Добре"}
                onPress={() => {setIsLoading(false); props.navigation.navigate("Login");}}
            />
          </View>
        </View>
      </Overlay>
      <KeyboardAvoidingView keyboardVerticalOffset={50} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
        <View style={styles.mainContainer}>
          <View styles={styles.informText}>
            <InformText>Вам було надiслано код на пошту</InformText>
          </View>
          <View style={styles.codeInputContainer}>
            <TextInput
              ref={input1}
              keyboardType="numeric"
              style={styles.codeInput}
              value={stateInputs["1"]}
              blurOnSubmit={false}
              onChangeText={text => handleInputChange(text, "1")}
              maxLength={1}
              autoFocus
            />
            <TextInput
              ref={input2}
              keyboardType="numeric"
              style={styles.codeInput}
              value={stateInputs["2"]}
              blurOnSubmit={false}
              onChangeText={text => handleInputChange(text, "2")}
              maxLength={1}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                 reversedInputChange(1);
                }
              }}
            />
            <TextInput
              ref={input3}
              keyboardType="numeric"
              style={styles.codeInput}
              value={stateInputs["3"]}
              onChangeText={text => handleInputChange(text, "3")}
              maxLength={1}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  reversedInputChange(2);
                }
              }}
            />
            <TextInput
              ref={input4}
              keyboardType="numeric"
              style={styles.codeInput}
              value={stateInputs["4"]}
              onChangeText={text => handleInputChange(text, "4")}
              maxLength={1}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  reversedInputChange(3);
                }
              }}
            />
            <TextInput
              ref={input5}
              keyboardType="numeric"
              style={styles.codeInput}
              value={stateInputs["5"]}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  reversedInputChange(4);
                }
              }}
              onChangeText={text => {
                handleInputChange(text, "5");
              }}
              onSelectionChange={() => convertor(stateInputs)}
              maxLength={1}
            />
          </View>

          <ResendCodeButton
            resetCode={resetCode}
            resetInputs={resetInputs}
            id={id}
            email={email}
            warning={setWarning}
          >
            Resend code
          </ResendCodeButton>

          {warning ? <Text style={styles.errorsStyle}>{warning}</Text> : null}
          <View style={{ width: "100%" }}>
            <View style={styles.buttonContainer}>
              <View style={{ width: "30%" }}>
                <MainButton
                  width={"100%"}
                  icon={<ArrowLeftIcon />}
                  disabled={false}
                  onPress={() => props.navigation.goBack()}
                />
              </View>
              <View style={{ width: "60%" }}>
                {isLoading ? (
                    <View >
                      <ActivityIndicator size="large" color={COLORS.main} />
                    </View>
                ) : (
                    <MainButton
                        label={"Підтвердити"}
                        width={"100%"}
                        onPress={() => code && sendCode(code)}
                        disabled={!code}
                    />
                )}

              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const mapStateToProps = state => ({
  tabNumber: state.reducerOne.tabNumber,
});

const mapDispatchToProps = dispatch => ({
  getAuthTab: number => dispatch({ type: GET_AUTH_TAB, authTabNumber: number }),
  setUserData: payload => dispatch({ type: SET_USER_DATA, payload }),
  getTabNumber: number => dispatch({ type: GET_TAB, tabNumber: number }),
  getScreenNumber: number => dispatch({ type: GET_SCREEN, screenNumber: number })
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthCode);
