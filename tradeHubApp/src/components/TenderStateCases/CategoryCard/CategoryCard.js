import React from 'react';
import {styles} from './style';
import {Text, View} from 'react-native';


export const CategoryCard = ({item}) => {
  const product ={
    name: item.item.name,
    amount: item.amount,
   };
  // console.log(props, '------------Item from Category Card ------------');

  return (
      <View style={styles.contentContainer}>
        <View style={{width: '70%'}}><Text style={styles.text}>{product.name}</Text></View>
        <View style={{width: '29%', alignItems:'flex-end'}}><Text style={styles.text}>{product.amount}</Text></View>
      </View>
  );
};