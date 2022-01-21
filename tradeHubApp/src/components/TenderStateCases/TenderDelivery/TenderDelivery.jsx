import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';

import ClipIcon from '../../../ui/icons/ClipIcon';
import MicrophoneIcon from '../../../ui/icons/MicrophoneIcon';
import WoodPickerArrow from '../../../ui/icons/WoodpickerArrow';

import Content from '../Content/Content';
import HeaderStatus from '../HeaderStatus/HeaderStatus';
import ContractorCard from '../../ContractorCard/ContractorCard';

import {styles} from './style.js';
import axios from 'axios';
import {DEFAULT_URL} from '../../../constants/Req';
import COLORS from '../../../constants/Colors';

const TenderDelivery = ({initActiveState = true, ...props}) => {

  const {tender, token} = props;
  const {name, description} = tender;
  const [isLoadPending, setIsLoadPending] = useState(false);
  const [active, setActive] = useState(initActiveState);
  const [expanded, setExpanded] = useState(initActiveState);
  const [offers, setOffers] = useState([]);

  let minutes, seconds;

  if (tender.audio) {
    minutes = Math.trunc(
        (tender.audio.metadata.audioObject.durationMillis) / 60000);
    seconds = Math.floor(
        ((tender.audio.metadata.audioObject.durationMillis) / 60000 - minutes) *
        60);
  }

  let countOfDocuments = tender.files.length ? tender.files.length : null;

  useEffect(() => {
    setIsLoadPending(true);
    axios.get(`${DEFAULT_URL}/tenders/${tender?._id}/offers`,
        {headers: {'Authorization': `Bearer ${token}`}}).then(res => {
      if (Array.isArray(res.data)){
        setOffers(res.data.filter(offer=>offer.accepted===true));
      }
    }).catch(err => {
      console.log(err);
    }).finally(() => setIsLoadPending(false));
  }, [tender]);

  return (
      <View style={{flex: 1}}>
        <HeaderStatus tender={tender}/>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.borderContainer}>
            <TouchableOpacity
                onPress={() => {
                  setExpanded(!expanded);
                  setActive(!active);
                }}
            >
              <View style={styles.shortInfoContainer}>
                <View style={styles.tenderTitle}>
                  <Text style={styles.textTitle}>{name}</Text>
                </View>
                <View style={styles.arrowContainer}>
                  <WoodPickerArrow/>
                </View>
              </View>
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
              {expanded ? <Content
                  navigation={props.navigation}
                  tender={tender}
                  addStyle={{flex: 1}}
              /> : null}
              {expanded ? null : (
                  <>
                    <Text style={styles.descriptionLabel}>Опис</Text>
                    <View style={styles.filesContainer}>
                      <View style={styles.file}>
                        <ClipIcon style={styles.fileIcon}/>
                        <Text style={styles.fileText}>{countOfDocuments}</Text>
                      </View>
                      <View style={styles.file}>
                        <MicrophoneIcon style={styles.voiceIcon}/>
                        <Text style={styles.fileText}>{tender.audio &&
                        (`${minutes} : ${seconds}`)}</Text>
                      </View>
                    </View>
                    <View style={styles.tenderDescriptionContainer}>
                      <Text ellipsizeMode={'head'} numberOfLines={5}
                            style={styles.tenderDescription}>{description}</Text>
                    </View>
                  </>
              )}
            </ScrollView>
          </View>

          {isLoadPending?
              <View>
                <ActivityIndicator size="large" color={COLORS.main}/>
              </View>:
            (offers.length > 0) &&
          (offers.map((item, index) => (
              <ContractorCard
                  key={index}
                  item={item}
                  index={index}
                  tendrId={props.tender._id}
                  delivery={true}
              />
          )))}
        </ScrollView>
      </View>
  );
};

export default TenderDelivery;
