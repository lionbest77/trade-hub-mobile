import React, {Component} from 'react';
import {Text, View} from 'react-native';
import firebase from 'firebase';

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoginIn();
  }

  checkIfLoginIn = () => {
    firebase.auth().onAuthStateChanged(
        user => {
          if (user) {
            this.props.navigation.navigate('Login');
          } else {
            this.props.navigation.navigate('Main');
          }
        },
    );
  };

  render() {
    return (
        <View>
          <Text>Hello</Text>
        </View>
    );
  }
};

export default LoadingScreen;