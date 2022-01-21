import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import {Overlay} from 'react-native-elements';

import axios from 'axios';
import {DEFAULT_URL} from '../../../constants/Req.js';

import ContractorCard from '../../ContractorCard/ContractorCard';
import HeaderStatus from '../HeaderStatus/HeaderStatus';
import MainButton from '../../buttons/MainButton/MainButton';
import Accordion from '../../Accordion/Accordion.js';
import Header from '../Header/Header';
import Tab from '../../Tab/Tab.js';
import Content from '../Content/Content';
import CrossIcon from '../../../ui/icons/CrossIcon.jsx';
import InformText from '../../../ui/InformText/InformText';
import CheckMarkIcon from '../../../ui/icons/CheckMarkIcon';

import COLORS from '../../../constants/Colors';
import {styles} from './style.js';

const TenderSupplierSelection = ({initActiveState = false, ...props}) => {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(initActiveState);
  const [expanded, setExpanded] = useState(initActiveState);
  const [isApprove, setIsApprove] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contractors, setContractors] = useState([]);
  const [activeOverlay, setActiveOverlay] = useState(false);
  const [activeOverlayDel, setActiveOverlayDel] = useState(false);
  const [refactoredContractors, setRefactoredContractors] = useState({});

  const formRef = useRef(null);

  const id = props.tender._id;

  const {tender, token, role} = props; 
  // console.log('TENDER', tender);

  useEffect(() => {
    try {
      setIsLoading(true);
      axios
      .get(`${DEFAULT_URL}/tenders/${id}/offers`,
          {headers: { 'Authorization': `Bearer ${token}`}})
      .then(res => {
        //console.log('OFFERS:', res.data);
        setContractors(res.data);
      })
      .catch(err => {
        console.log(err);
      });
      setIsLoading(false);

      // console.log(contractors[0]);
      console.log("-----");
      // setRefactoredContractors({});
      contractors.forEach((item) => {
        console.log(item.tender_item.item.name);
        console.log(`${item.tender_item.item.name}` in refactoredContractors);

        // if ([item.tender_item.item.name] in refactoredContractors) {
        //   console.log('Key exists');
        //   // refactoredContractors[item.tender_item.item.name] = [...refactoredContractors[item.tender_item.item.name], item.tender_item.item.name];
  
        //   // const newArrayWithNewItem = refactoredContractors[item.tender_item.item.name];
        //   // newArrayWithNewItem.push(item);
  
  
        //   // const newObj = refactoredContractors;
        //   // // console.log('----------newObj');
        //   // // console.log(newObj);
        //   // // console.log('///----------newObj');
  
        //   // newObj[item.tender_item.item.name] = newArrayWithNewItem;
        //   // // console.log('----------newObj ref');
        //   // console.log(newObj);
        //   // // console.log('///----------newObj ref');
        //   // setRefactoredContractors(() => newObj );
        //   setRefactoredContractors(() => { test: "test" } );
        // } else {
        //   console.log('New key');
        //   setRefactoredContractors((prev) => Object.assign(prev, { [item.tender_item.item.name]: [item] }) );
        //   console.log("ID: " + prev._id);
        // }
      });
      // console.log(refactoredContractors[0]);

      // setRefactoredContractors((prev) => Object.assign(prev, { [contractors[0].tender_item.item.name]: [contractors[0]] }) );




      if ([contractors[1].tender_item.item.name] in refactoredContractors) {
        console.log('Key exists');
        // refactoredContractors[contractors[1].tender_item.item.name] = [...refactoredContractors[contractors[1].tender_item.item.name], contractors[1].tender_item.item.name];

        const newArrayWithNewItem = refactoredContractors[contractors[1].tender_item.item.name];
        newArrayWithNewItem.push(contractors[1]);


        const newObj = refactoredContractors;
        // console.log('----------newObj');
        // console.log(newObj);
        // console.log('///----------newObj');

        newObj[contractors[1].tender_item.item.name] = newArrayWithNewItem;
        // console.log('----------newObj ref');
        console.log(newObj);
        // console.log('///----------newObj ref');
        setRefactoredContractors(() => newObj );
      } else {
        console.log('New key');
        setRefactoredContractors((prev) => Object.assign(prev, { [contractors[0].tender_item.item.name]: [contractors[0]] }) );
      }




      // refactoredContractors['key'] = "test";
      // TODO: refactor contractors array!
      // setRefactoredContractors((prev) => Object.assign(prev, { key: 'new' }) );

      console.log(refactoredContractors);

    } catch (e) {
      Alert.alert("Tender Supplier", `${e}`, [
        { text: "OK" }
      ]);
    }
  }, [isApprove, tender]);

  const addSupplier = async index => {
    setActiveOverlay(!activeOverlay);
    setIsLoading(true);
    const authOptions = {
      url: `${DEFAULT_URL}/tenders/${tender._id}/acceptOffer/${contractors[index]._id}`,
      method: 'PATCH',
      headers: {'Authorization': `Bearer ${token}`},
    };
    await axios(authOptions).then(res => {
          setIsApprove(!isApprove);
        },
    ).catch(err => console.log(err));
    setIsLoading(false);
  };

  const deleteSupplier = async index => {
    setActiveOverlayDel(!activeOverlayDel);
    setIsLoading(true);
    const authOptions = {
      method: 'PATCH',
      headers: {'Authorization': `Bearer ${token}`},
      url: `${DEFAULT_URL}/tenders/${tender._id}/refuseOffer/${contractors[index]._id}`,
    };

    await axios(authOptions).then(res => {
          setIsApprove(!isApprove);
        },
    )
        // .then(res => props.statusSetter(res.status_code))
        .catch(err => console.log(err));
    setIsLoading(false);
  };

  const closeOverlay = () => {
    setActiveOverlay(false);
    setActiveOverlayDel(false);
  };

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
              onPress={() => {
                setExpanded(!expanded);
                setActive(!active);
              }}
          >
            <HeaderStatus tender={tender}/>
            <Header tender={tender}/>
          </TouchableOpacity>
          <ScrollView ref={formRef}>
            {expanded ? (
                <View style={{flex: 1}}>
                  <Content
                      formRef={formRef}
                      navigation={props.navigation}
                      tender={tender}
                      addStyle={{flex: 1, paddingBottom: 80}}
                  />
                </View>
            ) : null}
          </ScrollView>
        </View>

        <View style={{flex: 1, paddingTop: '5%'}}>
          <View
              style={{
                marginTop: '2%',
              }}
          />
          <Accordion
              header={
                <View
                    style={{
                      marginLeft: 30,
                    }}а
                >
                  <Tab label="Постачальники"/>
                </View>
              }
              content={
                <ScrollView>
                  <View
                      style={{
                        flex: 1,
                        marginHorizontal: 4,
                      }}
                  >
                    {isLoading ? (
                        <View>
                          <ActivityIndicator size="large" color={COLORS.main}/>
                        </View>
                    ) 
                    : (
                      
                      
                        contractors.length > 0 ? (
                            contractors.map((item, index) => (
                                <ContractorCard
                                    key={`${index}`}
                                    item={item}
                                    index={index}
                                    tendrId={props.tender._id}
                                    setActiveOverlay={setActiveOverlay}
                                    setActiveOverlayDel={setActiveOverlayDel}
                                    activeOverlay={activeOverlay}
                                    setIndex={setIndex}
                                    role={role}
                                />
                            ))
                          ) : (
                              <View
                                  style={{
                                    marginTop: '25%',
                                    paddingHorizontal: '5%',
                                  }}
                              >
                                <InformText>
                                  Дякуємо, що обрали постачальників. Чекайте на
                                  зворотній зв'язок від менеджера.
                                </InformText>
                              </View>
                          )
                      )
                    }
                  </View>
                </ScrollView>
              }
              initActiveState
          />
        </View>

        <Overlay
            isVisible={activeOverlay}
            overlayStyle={styles.overlayContainer}
            onBackdropPress={closeOverlay}
        >
          <Text style={styles.text}>
            Ви впевнені, що хочете обрати постачальника
            "{(contractors.length > 0) && contractors[index].name}"
            для Вашої заявки?
          </Text>
          <View style={styles.buttonsContainer}>
            <View>
              <MainButton
                  width={80}
                  leftBorderNone
                  icon={<CrossIcon/>}
                  onPress={() => closeOverlay()}
              />
            </View>
            <View>
              <MainButton
                  width={80}
                  rightBorderNone
                  backgroundColor={'#27AE60'}
                  icon={<CheckMarkIcon/>}
                  onPress={() => addSupplier(index)}
              />
            </View>
          </View>
        </Overlay>

        <Overlay
            isVisible={activeOverlayDel}
            overlayStyle={styles.overlayContainer}
            onBackdropPress={closeOverlay}
        >
          <Text style={styles.text}>
            Ви впевнені, що хочете відмовитись від послуг постачальника
            "{(contractors.length > 0) && contractors[index].name}" для Вашої
            заявки?
          </Text>
          <View style={styles.buttonsContainer}>
            <View>
              <MainButton
                  width={80}
                  leftBorderNone
                  icon={<CrossIcon/>}
                  onPress={() => closeOverlay()}
              />
            </View>
            <View>
              <MainButton
                  width={80}
                  rightBorderNone
                  backgroundColor={'#27AE60'}
                  icon={<CheckMarkIcon/>}
                  onPress={() => deleteSupplier(index)}
              />
            </View>
          </View>
        </Overlay>
      </View>
  );
};

export default TenderSupplierSelection;
