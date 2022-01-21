import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {styles} from './style';
import COLORS from '../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

let {width} = Dimensions.get('window');

const RequiredLabel = ({
                         text, required = false,
                       }) => {
  return (
      <View style={styles.mainContainer}>
        <Text style={{  fontSize: (width >= 600) ?  20 : 13, color: COLORS.informText, marginBottom: '5%'}}>
          {text}
        </Text>
        {required && <Icon name="asterisk" size={6} color={COLORS.main}/>}
      </View>);
};

export default RequiredLabel;