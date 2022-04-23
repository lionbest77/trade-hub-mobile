import React, {useState, useEffect, useRef} from 'react';
import { connect } from "react-redux";
import {
  View, Text, ScrollView, TouchableOpacity, Share, ActivityIndicator, Alert, Dimensions,
} from 'react-native';
import {Overlay} from 'react-native-elements';

import axios from "axios";
import COLORS from '../../../constants/Colors';
import { styles } from "./style.js";
import { DEFAULT_URL } from "../../../constants/Req.js";

import Header from "../Header/Header";
import Content from "../Content/Content";
import HeaderStatus from "../HeaderStatus/HeaderStatus";

import OnboardingButton from "../../buttons/OnboardingButton/OnboardingButton";
import MainButton from "../../buttons/MainButton/MainButton";
import Contract from "../../../ui/icons/Contract.js";
import ClipIcon from "../../../ui/icons/ClipIcon";
import ShareIcon from "../../../ui/icons/ShareIcon.js";
import EnvelopeIcon from "../../../ui/icons/Envelope.js";

import { addDocument } from "../../../helpers/singleDocumentPicker/singleDocumentPciker.js";
import { sendContract } from "../../../helpers/sendContract/sendContract.js";
import { downloadHelper } from "../../../helpers/download/downloadHelper.js";

import CrossIcon from '../../../ui/icons/CrossIcon';
import CheckMarkIcon from '../../../ui/icons/CheckMarkIcon';

import i18n from '../../../services/localization'

const TenderContract = ({ initActiveState = false, ...props }) => {
  const [error, setError] = useState(false);
  const [active, setActive] = useState(initActiveState);
  const [spinner, setSpinner] = useState(false);
  const [expanded, setExpanded] = useState(initActiveState);
  const [document, setDocument] = useState({});
  const [contracts, setContracts] = useState([]);
  const [freeSpace, setFreeSpace] = useState(10485000);
  const [isOpenOverlay, setIsOpenOverlay] = useState(false);
  const [isOpenOverlayEmail, setIsOpenOverlayEmail] = useState(false);

  const tender = props.tender;
  const tenderId = tender._id;

  const formRef = useRef(null);

  const prepareContract = async () => {
   await addDocument(setDocument, freeSpace, setFreeSpace, setIsOpenOverlay);
  };

 const sendContractAsync = async () => {
   await setSpinner(true);
   await setIsOpenOverlay (false);
   await sendContract(document, tenderId, props.userData.token);
   await clearDocument();
   await setSpinner(false);
 };

  const clearDocument = () => {
    setFreeSpace(10485760);
    setDocument({});
  };

  const shared = async url => {
    await Share.share({
      url: url,
      message: i18n.t('send_contract_link') + url
    });
  };

  const sendByEmail = async () => {
    setError(false);
    setSpinner(true);
    setIsOpenOverlayEmail(false);
    const authOptions = {
      method: "POST",
      url: `${DEFAULT_URL}/tenders/${tenderId}/sendByEmail/${props.userData.user_ID}`,
      headers: { 'Authorization': `Bearer ${props.userData.token}`}
      // data: {
      //   userId: props.userData.user_ID
      // }
      };
    // console.log(authOptions.url);

    await axios(authOptions)
      .then(res => {
        setSpinner(false);
        // console.log(res.data, "<========== RES");
      })
      .catch(res => {
        setSpinner(false);
        setError(true);
        console.log(res.response.data, "<===== ERR");
      });
  };

  // console.log(filePath, '-----------------File Path');

  useEffect(() => {
    try {
      setSpinner(true);
      axios
      .get(`${DEFAULT_URL}/tenders/${tenderId}`,
          {headers: { 'Authorization': `Bearer ${props.userData.token}`}}
          )
      .then(res => {
        setContracts(res.data.contracts);
        // console.log(res.data.contracts, '----------------contract---------------');
      })
      .catch(err => {
        console.log(err);
      });
      setSpinner(false);
    }catch (e) {
      Alert.alert("Tender Contract", `${e.response.data}`, [
        { text: i18n.t('ok') }
      ]);
    }

  }, [document]);

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            setExpanded(!expanded);
            setActive(!active);
          }}
        >
          <HeaderStatus tender={tender} />
          <Header tender={tender} />
        </TouchableOpacity>
        <ScrollView ref={formRef}>
          {expanded && (
            <View style={{ flex: 1 }}>
              <Content
                formRef={formRef}
                navigation={props.navigation}
                tender={tender}
                addStyle={{ flex: 1, paddingBottom: 80 }}
              />
            </View>
          )}
        </ScrollView>
      </View>
      {spinner ? (
          <View style={{marginTop: '30%'}}>
            <ActivityIndicator size="large" color={COLORS.main} />
          </View>
      ) : (
          <ScrollView style={{flex: 1}}>
          <View style={styles.buttonsContainer}>
            <View style={{ marginVertical: "5%" }}>

                {contracts.length > 0 &&
                    contracts.map((item) => {
                      return (
                          <View style={styles.extraWrapper}>
                          <View style={styles.downloadButton}>
                            <OnboardingButton
                                backgroundColor={"#fff"}
                                onPress={() => downloadHelper(`${DEFAULT_URL}${item.path}`)}
                                leftComponent={
                                  <View style={{ marginRight: '5%' }}>
                                    <Contract />
                                  </View>
                                }
                                rightComponent={
                                  <View style={{ flexDirection: "row" }}>
                                    <Text ellipsizeMode={'tail'} numberOfLines={1} style={styles.text}>{item.filename} </Text>
                                  </View>
                                }
                            />
                          </View>
                          <View style={styles.shareButton}>
                          <MainButton
                            backgroundColor="#fff"
                            icon={<ShareIcon />}
                            onPress={() => shared(`${DEFAULT_URL}${item.path}`)}
                            />
                        </View>
                    </View>
                      )
                    }
                )}
            </View>

            <View style={styles.extraWrapper}>
                <OnboardingButton
                    backgroundColor={"#fff"}
                    onPress={ () => prepareContract()}
                    leftComponent={
                      <View style={{ marginRight: 10 }}>
                        <ClipIcon />
                      </View>
                    }
                    rightComponent={
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.text}>{i18n.t('add_doc')}</Text>
                      </View>
                    }
                />
            </View>

            <View style={styles.buttonWrapper}>
              <OnboardingButton
                  onPress={() => setIsOpenOverlayEmail(true)}
                  border={true}
                  backgroundColor={"#fff"}
                  leftComponent={
                    <View style={{ marginRight: 7 }}>
                      <EnvelopeIcon />
                    </View>
                  }
                  rightComponent={
                    <Text style={styles.text}>{i18n.t('send_to_email')}</Text>
                  }
              />
            </View>
          </View>
          </ScrollView>
      )}
      <Overlay
          isVisible={isOpenOverlay}
          overlayStyle={styles.overlayContainer}
          onBackdropPress={() => setIsOpenOverlay(false)}
      >
        <Text style={styles.text1}>
          {i18n.t('file_will_send_p1')} "{document.name && document.name }" {i18n.t('file_will_send_p2')}
        </Text>
        <View style={styles.buttonsContainer1}>
          <View>
            <MainButton
                width={80}
                leftBorderNone
                icon={<CrossIcon />}
                onPress={() => setIsOpenOverlay(false)}
            />
          </View>
          <View>
            <MainButton
                width={80}
                rightBorderNone
                backgroundColor={"#27AE60"}
                icon={<CheckMarkIcon />}
                onPress={() => sendContractAsync()}
            />
          </View>
        </View>
      </Overlay>
      <Overlay
          isVisible={isOpenOverlayEmail}
          overlayStyle={styles.overlayContainer}
          onBackdropPress={() => setIsOpenOverlay(false)}
      >
        <Text style={styles.text1}>
          {i18n.t('send_contract_to_email')}
        </Text>
        <View style={styles.buttonsContainer1}>
          <View>
            <MainButton
                width={80}
                leftBorderNone
                icon={<CrossIcon />}
                onPress={() => setIsOpenOverlayEmail(false)}
            />
          </View>
          <View>
            <MainButton
                width={80}
                rightBorderNone
                backgroundColor={"#27AE60"}
                icon={<CheckMarkIcon />}
                onPress={() => sendByEmail()}
            />
          </View>
        </View>
      </Overlay>
    </View>

  );
};

const mapStateToProps = state => ({
  userData: state.userData.userData
});

export default connect(mapStateToProps)(TenderContract);
