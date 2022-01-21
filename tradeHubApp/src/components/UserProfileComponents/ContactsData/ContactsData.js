import React from 'react';
import {connect} from 'react-redux';
import {Text, TextInput, View} from 'react-native';

import {Formik} from 'formik';

import {styles} from '../style';
import {
  GET_AUTH_TAB,
  SET_COMPANY_PROFILE,
  SET_USER_PROFILE,
} from '../../../store/reduxConstants';
import validationSchema from '../validation';

const ContactsData = (props) => {

  // console.log(props.userProfile, '----------PROPS FROM ContactsData---------');

  const {
    additional_phone,
    email,
    phone,
  } = props.userProfile;

  return (
      <View>
        <Formik
            initialValues={{
              email: email,
              phoneOfCompany: phone ? phone : '',
              extraPhoneOfCompany: additional_phone ? additional_phone : '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, {setSubmitting}) => {
              // setSubmitting(true);
              // alert(JSON.stringify(values));
              // setTimeout(() => {
              //   setSubmitting(false);
              // }, 500);
            }}
        >
          {({
              values, handleBlur, errors, touched, setFieldValue,
            }) =>
              (<View style={styles.formContainer}>

                <Text style={styles.registrationInputLabel}>Email</Text>
                <TextInput
                    style={styles.registrationInput}
                    name="email"
                    onBlur={handleBlur('email')}
                    value={values.email}
                    editable={false}
                />
                <Text style={styles.errorsStyle}>{touched.email && errors.email}</Text>

                <Text style={styles.registrationInputLabel}>Номер телефону</Text>
                <TextInput
                    name="phoneOfCompany"
                    onBlur={handleBlur('phoneOfCompany')}
                    onChangeText={(value) => {
                      setFieldValue('phoneOfCompany', value);
                      props.setUserProfile({phone: value});
                      props.setIsChanged(true);
                    }}
                    style={styles.registrationInput}
                    keyboardType={'numeric'}
                    value={values.phoneOfCompany}

                />
                <Text style={styles.errorsStyle}>{touched.phoneOfCompany && errors.phoneOfCompany}</Text>

                <Text style={styles.registrationInputLabel}>Додатковий номер телефону</Text>
                <TextInput
                    name="extraPhoneOfCompany"
                    onBlur={handleBlur('extraPhoneOfCompany')}
                    onChangeText={(value) => {
                      props.setUserProfile({additional_phone: value});
                      setFieldValue('extraPhoneOfCompany', value);
                      props.setIsChanged(true);
                    }}
                    style={styles.registrationInput}
                    keyboardType={'numeric'}
                    value={values.extraPhoneOfCompany}
                />

                <Text style={styles.errorsStyle}>{touched.extraPhoneOfCompany && errors.extraPhoneOfCompany}</Text>

              </View>)}
        </Formik>
      </View>);
};

const mapDispatchToProps = dispatch => ({
  getAuthTab: number => dispatch({type: GET_AUTH_TAB, authTabNumber: number}),
  setUserProfile: payload => dispatch({type: SET_USER_PROFILE, payload}),
  setCompanyProfile: payload => dispatch({type: SET_COMPANY_PROFILE, payload}),

});

const mapStateToProps = state => ({
  authTabNumber: state.reducerOne.authTabNumber,
  userData: state.userData.userData,
  userProfile: state.userProfile.profile.profile,
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsData);
