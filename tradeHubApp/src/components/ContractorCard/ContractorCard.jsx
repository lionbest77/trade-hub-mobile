import React, { useState } from 'react';
import { Image, View, Text, Alert } from 'react-native';

import COLORS from '../../constants/Colors.js';
import {styles} from './style.js';
import axios from 'axios';
import {DEFAULT_URL} from '../../constants/Req.js';

import CrossIcon from '../../ui/icons/CrossIcon';
import MainButton from '../buttons/MainButton/MainButton';
import CheckMarkIcon from '../../ui/icons/CheckMarkIcon';
import GreenCheckMarkIcon from '../../ui/icons/GreenCheckMarkIcon';
import {Overlay} from 'react-native-elements';

import deliveryCarImage from '../../assets/images/deliveryCar.png'; 
import { ProgressBarAndroidComponent } from 'react-native';
// import BlackCheckMarkIcon from '../../assets/images/checkMark.png'; 

import i18n from '../../services/localization'

const ContractorCard = props => {
  const {
    sum,
    item,
    price,
    name,
    amount,
    created_at,
    tender_item,
    supplier,
    supplierItem,
    supplierComment,
    supplierPrice,
  } = props.item;

  // console.log("PROPS:",props);

  const note = item?.tender_item?.note;
  const currency = ' грн.';
  const index = props.index;
  const curId = props.curId;
  const delivery = props.delivery;
  const setIndex = props.setIndex;
  const setCurId = props.setCurId;
  const description = tender_item?.item?.description;
  const measureUnit = item?.tender_item?.measureUnit;
  const isApprove = props.item.accepted;
  const goodsName = tender_item?.item?.name ? tender_item.item.name : null;
  const setActiveOverlay = props.setActiveOverlay;
  const setActiveOverlayDel = props.setActiveOverlayDel;

  const text = (isApprove && isApprove === true) ? i18n.t('confirmed') : i18n.t('rejected');
  const productStatusText = props.item.sent ? (props.item.received ? i18n.t('received') : i18n.t('in_transit')) : i18n.t('expected');
  const textColor = (isApprove && isApprove === true) ?
      COLORS.good :
      COLORS.main;
  const [activeOverlayDelivveryAccept, setActiveOverlayDeliveryAccept] = useState(false);

  let createData = new Date(created_at);

  let fullData = {
    day: createData.getDate() < 10 ?
        `0${createData.getDate()}` :
        createData.getDate(),
    month: (createData.getMonth() + 1) < 10 ?
        `0${createData.getMonth() + 1}` :
        (createData.getMonth() + 1),
    year: createData.getFullYear(),
  };

  const alertShow = () => {
    Alert.alert(i18n.t('not_enough_rights_short'), i18n.t('perform_actions'), [{text: i18n.t('ok')}]);
  };

  const deliveryAccepted = async idd => {
    // TODO: Add Implementation for delivery success (integrate with API)
    setActiveOverlayDeliveryAccept(!activeOverlayDelivveryAccept);
    // setIsLoading(true);

    const body = [
      {
      "_id": idd,
      "received": true
      }
    ]
 
    const options = {
      headers: {'Authorization': `Bearer ${props.token}`},
    }
  
    axios.patch(`${DEFAULT_URL}/offers/update-status/received`, body, options)
      .then(res => {
          // setIsApprove(!isApprove);
          console.log('Success updated');
          //console.log(res);
        },
      )
        .catch(err => console.log(err));
    // setIsLoading(false);
  };


  const closeOverlay = () => {
    setActiveOverlayDeliveryAccept(false);
  };

  return (<View style={styles.container}>
    {
      <View style={styles.topWrapper}>
        {
          delivery && <Text style={{
                ...styles.productStatusText,
                color: `${textColor}`,
              }}>{productStatusText}</Text>
        }
        {
          isApprove !== null && !delivery && <Text style={{
            ...styles.approveText,
            color: `${textColor}`,
          }}>{text}</Text>
        }
      </View>
    }
    
    <View style={styles.secTopWrapper}>

      {/* <View style={styles.topTextImageWrapper}>
        <View style={{ width: "85%" }}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>
              {
                supplier?.fullName ?
                  supplier?.fullName :
                  name
              }
            </Text>
            <Text style={{
              ...styles.date,
              marginLeft: 35,
              marginBottom: 10,
            }}>
              {fullData.day}.{fullData.month}.{fullData.year}
            </Text>
          </View>
        </View>
        <View style={{ width: "15%" }}>
              <Image source={ deliveryCarImage } style={{ width: 40, height: 40 }} /> 
            </View>
      </View> */}

      {
          !delivery
          ? (
            <View style={{ width: "85%" }}>
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>
                  {
                    supplier?.fullName ?
                      supplier?.fullName :
                      name
                  }
                </Text>
                <Text style={{
                  ...styles.date,
                  marginLeft: 35,
                  marginBottom: 10,
                }}>
                  {fullData.day}.{fullData.month}.{fullData.year}
                </Text>
              </View>
            </View>
          )
          : (
            <View style={styles.topTextImageWrapper}>
              <View style={{ width: "85%" }}>
                <View style={styles.titleWrapper}>
                  <Text style={styles.title}>
                    {
                      supplier?.fullName ?
                        supplier?.fullName :
                        name
                    }
                  </Text>
                  <Text style={{
                    ...styles.date,
                    marginLeft: 35,
                    marginBottom: 10,
                  }}>
                    {fullData.day}.{fullData.month}.{fullData.year}
                  </Text>
                </View>
              </View>

              {
                props.item.sent && !props.item.received &&
                <View style={{ width: "15%" }}>
                  <Image source={ deliveryCarImage } style={{ width: 40, height: 40 }} /> 
                </View>
              }

              {/* <View style={{ width: "15%" }}>
                <Image source={ deliveryCarImage } style={{ width: 40, height: 40 }} /> 
              </View> */}
            </View>
          )
        }


      {/* {delivery ? null : ((isApprove === null) &&  */}

      {
         delivery ? null : ((isApprove === null) && (<MainButton
              width={76}
              icon={<CrossIcon/>}
              rightBorderNone={true}
              backgroundColor={COLORS.main}
              onPress={
                props.role 
                  ? () => {
                    setIndex(index);
                    setCurId(curId);
                    setActiveOverlayDel(true);
                  } 
                  : alertShow
              }
          />))
      }


      {/* {!delivery && (<View>
        {isApprove !== null ? (<View style={styles.approve}>
          <Text style={{
            ...styles.approveText,
            color: `${textColor}`,
          }}>{text}</Text>
        </View>) : (<MainButton
            width={76}
            icon={<CrossIcon/>}
            rightBorderNone={true}
            backgroundColor={COLORS.main}
            onPress={
              props.role 
                ? () => {
                  setIndex(index);
                  setActiveOverlayDel(true);
                } 
                : alertShow
            }
        />)}

      </View>)} */}
    </View>
    <View style={{marginTop: 6}}>
      <Text style={styles.desc}>{i18n.t('goods_name')}</Text>
      <Text style={styles.val}>{goodsName}</Text>
    </View>

    <View style={{marginTop: 6}}>
      <Text style={styles.desc}>{i18n.t('description')}</Text>
      <Text style={styles.val}>{description}</Text>
    </View>

    <View style={{marginTop: 6}}>
      <Text style={styles.desc}>{i18n.t('supplier_item')}</Text>
      <Text style={styles.val}>{supplierItem}</Text>
    </View>

    <View style={{marginTop: 6}}>
      <Text style={styles.desc}>{i18n.t('supplier_comment')}</Text>
      <Text style={styles.val}>{supplierComment}</Text>
    </View>

    <View style={{marginTop: 6}}>
      <Text style={styles.desc}>{i18n.t('price')}</Text>
      <Text style={styles.val}>
        {supplierPrice ? supplierPrice : price}
        {currency}
      </Text>
    </View>

    <View>
      <View
          style={{
            flexDirection: 'row', justifyContent: 'space-between',
          }}
      >
        <View style={{marginTop: 3}}>
          <Text style={styles.desc}>{i18n.t('quantity')}</Text>
          <Text style={styles.val}>{measureUnit ?
              `${amount} ${measureUnit}` :
              `${amount}`}</Text>
        </View>

        {delivery ? null : ((isApprove === null) && <View>
          <MainButton
              width={76}
              rightBorderNone={true}
              backgroundColor={COLORS.good}
              icon={<CheckMarkIcon/>}
              onPress={
                props.role 
                ? () => {
                  setIndex(index);
                  setCurId(curId);
                  setActiveOverlay(true);
                } 
                : alertShow
              }
          />
        </View>)}
      </View>
      <View style={{marginTop: 3}}>
        <Text style={styles.desc}>{i18n.t('sum')}</Text>
        <Text style={styles.val}>{sum} {currency}</Text>
      </View>
      <Text style={styles.desc}>{i18n.t('note')}</Text>
      <Text style={{...styles.val, width: '80%', marginBottom: 10}}>
        {note}
      </Text>

      {
        delivery 
        && props.item.sent 
        && !props.item.delivered 
        && !props.item.received
        && (
          <View style={styles.deliverySuccessWrapper}>
            <View style={{ width: "40%" }}></View>

            <View style={{ width: "50%" }}>
            <MainButton
                icon={<GreenCheckMarkIcon />}
                backgroundColor={"#fff"}
                rightBorderNone={true}
                width={"100%"}
                label={i18n.t('received')}
                containerRight={true} 
                onPress={
                  // props.role
                  // ? 
                  () => {
                    // setIndex(index); 
                    // setCurId(curId); 
                    setActiveOverlayDeliveryAccept(true);
                    // setActiveOverlay(true);
                    console.log('--------');
                    // console.log(props.token);
                    // props.deliveryAccepted(curId)
                  } 
                  // : alertShow
                  // : () => {
                  //   setIndex(index);
                  //   setCurId(curId);
                  // }
                }
              />
            </View>
          </View>
        )
      }

        <Overlay
            isVisible={activeOverlayDelivveryAccept}
            overlayStyle={styles.overlayContainer}
            onBackdropPress={closeOverlay}
        >
          <Text style={styles.text}>
            {i18n.t('confirm_arrive_product')}
          </Text>
          <View style={styles.buttonsContainer}>
            <View>
              <MainButton
                  width={80}
                  leftBorderNone
                  icon={<CrossIcon/>}
                  onPress={() => setActiveOverlayDeliveryAccept(false)}
              />
            </View>
            <View>
              <MainButton
                  width={80}
                  rightBorderNone
                  backgroundColor={'#27AE60'}
                  icon={<CheckMarkIcon/>}
                  onPress={() => deliveryAccepted(props.item._id)}
                  // onPress={() => addSupplier(index)}
              />
            </View>
          </View>
        </Overlay>
      

    </View>
  </View>);
};

export default ContractorCard;