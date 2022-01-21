import React, { useState } from "react";
import { connect } from "react-redux";

import {
  View, Dimensions,
} from 'react-native';
import axios from "axios";

import { DEFAULT_URL } from "../../../constants/Req.js";

import HeaderStatus from "../HeaderStatus/HeaderStatus";
import Accordion from '../../Accordion/Accordion';
import Content from '../Content/Content';
import Header from "../Header/Header";

const TenderApprovalRequired = ({ initActiveState = true,...props }) => {

  let { height, width } = Dimensions.get("window");
  const tender = props.tender;
  const previousView = props.tender.previousState;

  // console.log(previousView, '--------PREV');
  // console.log(props.tender, '------------------tender');

  const [error, setError] = useState();
  const [spinner, setSpinner] = useState();
  const [previousState, setPreviousState] = useState(false);
  const [needToApprove, setNeedToApprove] = useState(true);

  const updateTender = async () => {
    setError(false);
    setSpinner(true);
    const authOptions = {
      method: "PATCH",
      url: `${DEFAULT_URL}/tenders/${props.tender._id}/status/confirmed`,
      headers: { 'Authorization': `Bearer ${props.userData.token}`}
    };

    await axios.patch(authOptions.url, {}, {headers: { 'Authorization': `Bearer ${props.userData.token}`}})
      .then(res => {
        setSpinner(false);
        props.statusSetter(res.status_code);
        // console.log(res.data, "<========== RES");
      })
      .catch(e => {
        setError(true);
        console.log(e, "<===== ERR");
      });
  };

  const exitScreen = async () => {
    await updateTender();
    await props.navigation.navigate("TenderDetails");
  };

  return (
      <View style={{flex: 1}}>
      <Accordion
          initActiveState={true}
          headerStatus={<HeaderStatus tender={tender} />}
          header={<Header tender={tender} />}
          content={
            <Content
              tender={ previousState ?  previousView :  tender}
              setPreviousState={setPreviousState}
              setNeedToApprove={setNeedToApprove}
              navigation={props.navigation}
              previousState={previousState}
              needToApprove={needToApprove}
              exitScreen ={exitScreen}
              />}
      />
        </View>
  );
};

const mapStateToProps = state => ({
  userData: state.userData.userData
});

export default connect(mapStateToProps)(TenderApprovalRequired);
