import React from 'react';
import {connect} from 'react-redux';
import {Text, TextInput, View} from 'react-native';

import {Formik} from 'formik';

import {styles} from '../style';
import validationSchema from '../validation';
import {SET_USER_PROFILE} from '../../../store/reduxConstants';

const UserData = (props) => {

  // console.log('-------------', props.userProfile, '---------------- USER Data-------------');

  const {
    name,
    lastName,
    surname,
  } = props.userProfile;

  return (
      <View>
        <Formik
            initialValues={{
              name: name, lastName: lastName, surname: surname,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, action) => {
              // console.log(values, '------------Values from form');
              // action.setSubmitting(true);
              // setTimeout(() => {
              //   setSubmitting(false);
              // }, 500);
            }}
        >
          {({
              values, handleBlur, errors, touched, setFieldValue,
            }) => (
              <View style={styles.formContainer}>

                <Text style={styles.registrationInputLabel}>Прізвище</Text>
                <TextInput
                    style={styles.registrationInput}
                    name="lastName"
                    onBlur={handleBlur('lastName')}
                    onChangeText={(value) => {
                      setFieldValue('lastName', value);
                      props.setIsChanged(true);
                      props.setUserProfile({lastName: value});
                    }}
                    value={values.lastName}
                />
                <Text style={styles.errorsStyle}>{touched.lastName && errors.lastName}</Text>

                <Text style={styles.registrationInputLabel}>Ім’я </Text>
                <TextInput
                    autoCapitalize='words'
                    name="name"
                    onBlur={handleBlur('name')}
                    onChangeText={(value) => {
                      setFieldValue('name', value);
                      props.setIsChanged(true);
                      props.setUserProfile({name: value});
                    }}
                    style={styles.registrationInput}
                    value={values.name}
                />
                <Text style={styles.errorsStyle}>{touched.name ? errors.name : null}</Text>

                <Text style={styles.registrationInputLabel}>По батькові</Text>
                <TextInput
                    autoCapitalize='words'
                    name="surname"
                    onBlur={handleBlur('surname')}
                    onChangeText={(value) => {
                      setFieldValue('surname', value);
                      props.setIsChanged(true);
                      props.setUserProfile({surname: value});
                    }}
                    style={styles.registrationInput}
                    value={values.surname}
                />
                <Text style={styles.errorsStyle}>{touched.surname && errors.surname}</Text>
              </View>)}
        </Formik>
      </View>);
};

const mapDispatchToProps = dispatch => ({
  setUserProfile: payload => dispatch({type: SET_USER_PROFILE, payload}),
});

const mapStateToProps = state => ({
  authTabNumber: state.reducerOne.authTabNumber,
  userData: state.userData.userData,
  userProfile: state.userProfile.profile.profile,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserData);
