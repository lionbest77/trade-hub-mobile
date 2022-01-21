import React from "react";
import {Dimensions, View} from 'react-native';

import HeaderStatus from "../HeaderStatus/HeaderStatus";
import Accordion from "../../Accordion/Accordion.js";
import Content from "../Content/Content";
import Header from "../Header/Header";

const TenderApproved = props => {
  const tender = props.tender;

  return (
    <View style={{ flex: 1 }}>
      <Accordion
        initActiveState={true}
        headerStatus={<HeaderStatus tender={tender} />}
        header={<Header tender={tender} />}
        content={<Content
            tender={tender}
            navigation={props.navigation}/>}
      />
    </View>
  );
};

export default TenderApproved;
