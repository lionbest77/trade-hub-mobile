import React from 'react';
import  {View, Text} from 'react-native';
import {styles} from './style';

const PageTitle = ({text}) => {

 return (
     <View style={styles.container}>
       <View style={styles.line}>
       </View>
       <Text style={styles.text}>
         {text}
       </Text>

     </View>
 )
};

export default PageTitle;