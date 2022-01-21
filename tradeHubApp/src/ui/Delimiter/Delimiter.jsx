import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';

const Delimiter = () => {
    return (
        <View style={styles.container}>
            <View style={styles.line}/>
            <Text style={styles.text}>
              Або
            </Text>
            <View style={styles.line}/>
        </View>
    );
};

export default Delimiter;