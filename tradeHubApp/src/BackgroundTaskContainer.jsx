import React, { Component } from "react";
import {
  LOAD_CHAT_MESSAGES, SET_SOCKET, SET_UNREAD_MESSAGES,
} from './store/reduxConstants';
import { connect } from "react-redux";
import {SOCKET_URL} from './constants/Req';
// import Fire from "./services/Firebase";

import io from 'socket.io-client';

class BackgroundTaskContainer extends Component {
  render() {
    return <></>;
  }

  componentDidMount() {
    // Fire.shared.connectChatReducerActions(
    //   this.props.loadChatMessages,
    //   this.props.setUnreadMessages
    // );
    const socket = io(SOCKET_URL);
    this.props.setSocket(socket);
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  // loadChatMessages: (messages) =>
  //   dispatch({ type: LOAD_CHAT_MESSAGES, payload: messages }),
  // setUnreadMessages: (count) =>
  //   dispatch({ type: SET_UNREAD_MESSAGES, payload: count }),
   setSocket: payload =>  dispatch({ type: SET_SOCKET, payload }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BackgroundTaskContainer);
