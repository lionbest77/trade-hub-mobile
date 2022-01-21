import React from 'react';
import { Image, View, Text, Alert } from 'react-native';

import COLORS from '../../constants/Colors.js';
import {styles} from './style.js';

import CrossIcon from '../../ui/icons/CrossIcon';
import MainButton from '../buttons/MainButton/MainButton';
import CheckMarkIcon from '../../ui/icons/CheckMarkIcon';
import GreenCheckMarkIcon from '../../ui/icons/GreenCheckMarkIcon';

import deliveryCarImage from '../../assets/images/deliveryCar.png'; 
// import BlackCheckMarkIcon from '../../assets/images/checkMark.png'; 

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
  const delivery = props.delivery;
  const setIndex = props.setIndex;
  const description = tender_item?.item?.description;
  const measureUnit = item?.tender_item?.measureUnit;
  const isApprove = props.item.accepted;
  const goodsName = tender_item?.item?.name ? tender_item.item.name : null;
  const setActiveOverlay = props.setActiveOverlay;
  const setActiveOverlayDel = props.setActiveOverlayDel;

  const text = (isApprove && isApprove === true) ? `Підтверждено` : `Відхилено`;
  const textColor = (isApprove && isApprove === true) ?
      COLORS.good :
      COLORS.main;

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
    Alert.alert('Недостатньо прав', 'на виконання даних дій', [{text: 'OK'}]);
  };
  return (<View style={styles.container}>
    <View style={styles.topWrapper}>

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

        <View style={{ width: "15%" }}>
          <Image source={ deliveryCarImage } style={{ width: 40, height: 40 }} /> 
        </View>
      </View>

      {!delivery && (<View>
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
            onPress={props.role ? () => {
              setIndex(index);
              setActiveOverlayDel(true);
            } : alertShow}
        />)}

      </View>)}
    </View>
    <View style={{marginTop: 6}}>
      <Text style={styles.desc}>Найменування товару</Text>
      <Text style={styles.val}>{goodsName}</Text>
    </View>

    <View style={{marginTop: 6}}>
      <Text style={styles.desc}>Опис</Text>
      <Text style={styles.val}>{description}</Text>
    </View>

    <View style={{marginTop: 6}}>
      <Text style={styles.desc}>Товар постачальника</Text>
      <Text style={styles.val}>{supplierItem}</Text>
    </View>

    <View style={{marginTop: 6}}>
      <Text style={styles.desc}>Кометар постачальника</Text>
      <Text style={styles.val}>{supplierComment}</Text>
    </View>

    <View style={{marginTop: 6}}>
      <Text style={styles.desc}>Ціна</Text>
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
          <Text style={styles.desc}>Кількість</Text>
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
              onPress={props.role ? () => {
                setIndex(index);
                setActiveOverlay(true);
              } : alertShow}
          />
        </View>)}
      </View>
      <View style={{marginTop: 3}}>
        <Text style={styles.desc}>Сума</Text>
        <Text style={styles.val}>{sum} {currency}</Text>
      </View>
      <Text style={styles.desc}>Примітка</Text>
      <Text style={{...styles.val, width: '80%', marginBottom: 10}}>
        {note}
      </Text>

      <View style={styles.deliverySuccessWrapper}>
        <View style={{ width: "40%" }}></View>

        <View style={{ width: "50%" }}>
        <MainButton
            icon={<GreenCheckMarkIcon />}
            backgroundColor={"#fff"}
            rightBorderNone={true}
            width={"100%"}
            label={"Отримано"}
            containerRight={true}
            onPress={ () => {
              // TODO: Add Implementation for delivery success (integrate with API)
            } }
          />
        </View>
      </View>

    </View>
  </View>);
};

export default ContractorCard;
