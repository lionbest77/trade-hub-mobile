import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import COLORS from '../../constants/Colors';

const Statistics = ({currentValue = 20, maxValue = 100}) => {
  const percent = currentValue / maxValue * 100;

  return (
      <View>
        <ProgressCircle
            percent={percent}
            radius={85}
            borderWidth={25}
            color={COLORS.main}
            shadowColor="#333"
            bgColor="#fff"
        >
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.currentValue}>
              {currentValue}
            </Text>
            <Text style={styles.separator}>
              /
            </Text>
            <Text style={styles.maxValue}>
              {maxValue}
            </Text>
          </View>
        </ProgressCircle>
      </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  currentValue: {
    fontSize: 18,
    color: COLORS.main,
    fontWeight: 'bold',
    marginRight: 3,
  },
  separator: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  maxValue: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 3,
  }
});