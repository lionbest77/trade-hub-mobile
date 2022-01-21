import React from 'react';

import {View, TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import COLORS from '../../../constants/Colors';

let {width} = Dimensions.get('window');

const TenderAccordion = ({
                           text = null, content = null, active, style, containerStyle = {}, setActive, icon, filterFunction
                         }) => {
  return (<View style={containerStyle}>

        <View style={styles.container}>
          <TouchableOpacity
              onPress={setActive}
              style={styles.textContainer}
          >
          <View style={[
            {...styles.lineContainer}, !active && {backgroundColor: COLORS.informText}]}/>

          <View style={styles.iconContainer}>

            <Text
                style={[
                  {...styles.text, ...style}, !active && {color: COLORS.informText}]}
            >
              {text}
            </Text>

          </View>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.icon}
              onPress={filterFunction}
          >
            {active && icon}
          </TouchableOpacity>

        </View>

        {active && content}

      </View>);
};

export default TenderAccordion;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', alignItems: 'center', marginBottom: '1%', marginTop: 30, justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'row', alignItems: 'center',
  },
  lineContainer: {
    height: 2, width: 22, marginRight: 6, marginLeft: 30, backgroundColor: COLORS.main,

  },
  icon: {
    paddingRight: '7%',
    alignItems: 'center',
    color: 'black'
  },
  text: {
    fontWeight: 'bold', textTransform: 'uppercase', paddingRight: 30,

  }, smallText: {
    fontSize: (width >= 600) ? 20 : 13, color: COLORS.informText, fontWeight: 'bold',

  }, iconContainer: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },

});
