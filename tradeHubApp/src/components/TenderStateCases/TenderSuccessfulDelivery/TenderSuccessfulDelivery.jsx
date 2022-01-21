import React, {useRef, useState} from 'react';
import { View, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./style.js";

import HeaderStatus from "../HeaderStatus/HeaderStatus";
import Header from "../Header/Header";
import Content from "../Content/Content";

const TenderSuccessfulDelivery = ({ initActiveState = true, ...props }) => {
  const tender = props.tender;
  const formRef = useRef(null);

  const [active, setActive] = useState(initActiveState);
  const [expanded, setExpanded] = useState(initActiveState);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} ref={formRef} >
        <TouchableOpacity
          onPress={() => {
            setExpanded(!expanded);
            setActive(!active);
          }}
        >
          <HeaderStatus tender={tender} />
          <Header tender={tender} />
        </TouchableOpacity>
        <View>
        {expanded ?
            <Content
                tender={tender}
                formRef={formRef}
                addStyle={{flex: 1}}
                navigation={props.navigation}
            /> : null }
        </View>
      </ScrollView>
    </View>
  );
};

export default TenderSuccessfulDelivery;
