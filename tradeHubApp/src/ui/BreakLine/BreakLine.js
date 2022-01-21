import React from "react";
import {Divider} from 'react-native-elements';
import {Text, View} from "react-native";
import styles from "./style";

const BreakLine = ({text}) => {
    return (
        <View style={styles.container}>
            <Divider style={styles.line}/>
            <Text style={styles.text}> {text}</Text>
            <Divider style={styles.line}/>
        </View>

)
}

export default BreakLine;