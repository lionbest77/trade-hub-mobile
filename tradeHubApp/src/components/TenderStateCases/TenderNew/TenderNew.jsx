import React from "react";
import {View} from 'react-native';

import Header from "../Header/Header";
import Content from "../Content/Content";
import Accordion from "../../Accordion/Accordion.js";
import HeaderStatus from "../HeaderStatus/HeaderStatus";

const TenderNew = props => {
  const tender = props.tender;

  return (
    <View style={{ flex: 1 }}>
      <Accordion
        initActiveState={true}
        header={<Header tender={tender} />}
        headerStatus={<HeaderStatus tender={tender} />}
        content={<Content
            tender={tender}
            navigation={props.navigation}/>}
      />
    </View>
  );
};

export default TenderNew;
