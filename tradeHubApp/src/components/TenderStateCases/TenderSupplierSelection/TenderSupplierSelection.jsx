import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';

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

import { GET_ALL_CONTRACTORS, SET_CONTRACTORS } from '../../../store/reduxConstants';

const TenderSupplierSelection = ({initActiveState = false, ...props}) => {
  const [index, setIndex] = useState(0);
  const [curId, setCurId] = useState(0);
  const [active, setActive] = useState(initActiveState);
  const [expanded, setExpanded] = useState(initActiveState);
  const [isApprove, setIsApprove] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contractors, setContractors] = useState([]);
  const [activeOverlay, setActiveOverlay] = useState(false);
  const [activeOverlayDel, setActiveOverlayDel] = useState(false);
  const [refactoredContractors, setRefactoredContractors] = useState({});
  const [indexIterator, setIndexIterator] = useState(0);

  const formRef = useRef(null);

  const id = props.tender._id;

  const {tender, token, role} = props; 
  // console.log('TENDER', tender);

  // useEffect(() => {
  //   if(contractors != null && contractors.length > 0) {
  //     refactorContractorsArray(contractors);
  //   }
  // }, []);

  useEffect(() => {
    try {
      setIsLoading(true);
      axios
        .get(`${DEFAULT_URL}/tenders/${id}/offers`,
            {headers: { 'Authorization': `Bearer ${token}`}})
        .then(res => {
          // console.log('OFFERS:', res.data);
          setContractors(res.data);
          refactorContractorsArray(res.data);
          console.log("refreshing contractors effect...");
        })
        .catch(err => {
          console.log(err);
        });
      setIsLoading(false);
    } catch (e) {
      Alert.alert("Tender Supplier", `${e}`, [
        { text: "OK" }
      ]);
    }

    return () => {

    };
  }, [isApprove, tender]);

  const refactorContractorsArray = (data) => {
    console.log("-----");
    // console.log('OFFERS:', data);

    if(!data) return;

    let refactoredContractorDictionary = {};
          // TODO: clear all contrsctor from array if list contains approved product

    data.map((item) => {
      if (refactoredContractorDictionary.hasOwnProperty(`${item.tender_item.item.name}`)) {
        //console.log(`Key exists --- ${item.tender_item.item.name}`);
        
        const newArrayWithNewItem = refactoredContractorDictionary[`${item.tender_item.item.name}`];
        // console.log(newArrayWithNewItem);
        newArrayWithNewItem.push(item);

        // const newArrayWithNewItem = [];
        // newArrayWithNewItem.push(item);

        refactoredContractorDictionary[item.tender_item.item.name] = newArrayWithNewItem;

      } else {
        //console.log(`New key --- ${console.log(item.tender_item.item.name)}`);
        refactoredContractorDictionary = Object.assign(refactoredContractorDictionary, { [item.tender_item.item.name]: [item] });
      }

    });

    for (const [key, value] of Object.entries(refactoredContractorDictionary)) {
      value.sort((a,b) => (a.supplierPrice > b.supplierPrice) ? 1 : ((b.supplierPrice > a.supplierPrice) ? -1 : 0))
    }

   

    setRefactoredContractors(refactoredContractorDictionary);
    props.setContractors(refactoredContractorDictionary);
    // console.log(refactoredContractors);
  }

  // const addSupplier = async index => {
  //   setActiveOverlay(!activeOverlay);
  //   setIsLoading(true);
  //   const authOptions = {
  //     url: `${DEFAULT_URL}/tenders/${tender._id}/acceptOffer/${contractors[index]._id}`,
  //     method: 'PATCH',
  //     headers: {'Authorization': `Bearer ${token}`},
  //   };
  //   await axios(authOptions)
  //   .then(res => {
  //         setIsApprove(!isApprove);
  //         // TODO: clear all contrsctor from sec array in this product

  //       },
  //   ).catch(err => console.log(err));
  //   setIsLoading(false);
  // };

  const addSupplier = async idd => {
    // console.log(idd);
    setActiveOverlay(!activeOverlay);
    setIsLoading(true);
    const authOptions = {
      url: `${DEFAULT_URL}/tenders/${tender._id}/acceptOffer/${idd}`,
      method: 'PATCH',
      headers: {'Authorization': `Bearer ${token}`},
    };
    await axios(authOptions)
    .then(res => {
          setIsApprove(!isApprove);
        },
    ).catch(err => console.log(err));
    setIsLoading(false);
  };

  const deleteSupplier = async idd => {
    setActiveOverlayDel(!activeOverlayDel);
    setIsLoading(true);
    const authOptions = {
      method: 'PATCH',
      headers: {'Authorization': `Bearer ${token}`},
      url: `${DEFAULT_URL}/tenders/${tender._id}/refuseOffer/${idd}`,
    };

    await axios(authOptions).then(res => {
          setIsApprove(!isApprove);
        },
    )
        // .then(res => props.statusSetter(res.status_code))
        .catch(err => console.log(err));
    setIsLoading(false);
  };

  // const deleteSupplier = async index => {
  //   setActiveOverlayDel(!activeOverlayDel);
  //   setIsLoading(true);
  //   const authOptions = {
  //     method: 'PATCH',
  //     headers: {'Authorization': `Bearer ${token}`},
  //     url: `${DEFAULT_URL}/tenders/${tender._id}/refuseOffer/${contractors[index]._id}`,
  //   };

  //   await axios(authOptions).then(res => {
  //         setIsApprove(!isApprove);
  //       },
  //   )
  //       // .then(res => props.statusSetter(res.status_code))
  //       .catch(err => console.log(err));
  //   setIsLoading(false);
  // };

  const closeOverlay = () => {
    setActiveOverlay(false);
    setActiveOverlayDel(false);
  };

  const renderSuppliersList = () => {
      let iterator = 0;
      return Object.keys(props.contractorsObject).map((key) => {
        return (
          <ScrollView key={ key } horizontal={ true }>
            {
              props.contractorsObject[key].map((item, index) => {
                // setIndexIterator((prev) => prev + 1);
                iterator++;
                return <ContractorCard
                  key={`${iterator-1}`}
                  item={item}
                  index={iterator-1}
                  curId={item._id}
                  tendrId={props.tender._id}
                  setActiveOverlay={setActiveOverlay}
                  setActiveOverlayDel={setActiveOverlayDel}
                  activeOverlay={activeOverlay}
                  setIndex={setIndex}
                  setCurId={setCurId}
                  role={role}
                />
              })
            }
          </ScrollView>
        );
      })
    
  }

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
                    {/* { console.log(props.getContractors()) }  */}
                    { 
                      // console.log(props.contractorsObject) 
                      //console.log('-----------------------'),
                      //console.log(props.contractorsObject),
                      //console.log('-----------------------'),
                      //Object.keys(props.contractorsObject).map((key) => console.log(props.contractorsObject[key].length))
                    }
                    {isLoading ? (
                        <View>
                          <ActivityIndicator size="large" color={COLORS.main}/>
                        </View>
                    ) 
                    : (
                      
                        
                      props.contractorsObject != null
                      && !!Object.keys(props.contractorsObject).length 
                        ? (
                          renderSuppliersList()
                        )  : (
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
                      
                        // contractors.length > 0 ? (
                        //     contractors.map((item, index) => (
                        //         <ContractorCard
                        //             key={`${index}`}
                        //             item={item}
                        //             index={index}
                        //             tendrId={props.tender._id}
                        //             setActiveOverlay={setActiveOverlay}
                        //             setActiveOverlayDel={setActiveOverlayDel}
                        //             activeOverlay={activeOverlay}
                        //             setIndex={setIndex}
                        //             role={role}
                        //         />
                        //     ))
                        //   ) : (
                        //       <View
                        //           style={{
                        //             marginTop: '25%',
                        //             paddingHorizontal: '5%',
                        //           }}
                        //       >
                        //         <InformText>
                        //           Дякуємо, що обрали постачальників. Чекайте на
                        //           зворотній зв'язок від менеджера.
                        //         </InformText>
                        //       </View>
                        //   )
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
                  onPress={() => addSupplier(curId)}
                  // onPress={() => addSupplier(index)}
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
                  onPress={() => deleteSupplier(curId)}
                  // onPress={() => deleteSupplier(index)}
              />
            </View>
          </View>
        </Overlay>
      </View>
  );
};

const mapStateToProps = state => ({
  contractorsObject: state.contractor.contractorsKeyValuePairs,
});

const mapDispatchToProps = dispatch => ({
  getContractors: () => dispatch({ type: GET_ALL_CONTRACTORS }),
  setContractors: payload => dispatch({ type: SET_CONTRACTORS, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TenderSupplierSelection);

// export default TenderSupplierSelection;
