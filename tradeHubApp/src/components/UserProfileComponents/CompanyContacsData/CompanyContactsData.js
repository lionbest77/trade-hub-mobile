import React from 'react';
import {connect} from 'react-redux';
import {Text, TextInput, View} from 'react-native';

import {Formik} from 'formik';

import {styles} from '../style';
import validationSchema from '../validation';
import {GET_AUTH_TAB, SET_COMPANY_PROFILE, SET_USER_PROFILE} from '../../../store/reduxConstants';

import i18n from '../../../services/localization'

const CompanyContactsData = (props) => {

  // console.log(props.companyProfile, '----------PROPS FROM CompanyContactsData---------');

  const {
    additional_phone,
    documents_delivery_address,
    email,
    goods_delivery_address,
    phone,
  } = props.companyProfile;

  return (<View>
  <Formik
      initialValues={{
        companyEmail: email,
        phoneOfCompany: phone,
        extraPhoneOfCompany: additional_phone,
        deliveryAddressOfDocuments: documents_delivery_address,
        deliveryAddressOfProducts: goods_delivery_address,

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
        values, handleChange, handleBlur, errors, touched, setFieldValue
      }) => (
        <View style={styles.formContainerSmall}>

          <Text style={styles.registrationInputLabel}>{i18n.t('email')}</Text>
          <TextInput
              style={styles.registrationInput}
              name="companyEmail"
              onBlur={handleBlur('companyEmail')}
              onChangeText={()=>{
                handleChange('companyEmail')
              }}
              value={values.companyEmail}
              editable={false}
          />
          <Text style={styles.errorsStyle}>{touched.companyEmail && errors.companyEmail}</Text>

          <Text style={styles.registrationInputLabel}>{i18n.t('phone_number')}</Text>
          <TextInput
              name="phoneOfCompany"
              onChangeText={(value)=>{
                props.setCompanyProfile({phone: value});
                setFieldValue('phoneOfCompany', value);
                props.setIsChanged(true);
              }}
              onBlur={handleBlur('phoneOfCompany')}
              style={styles.registrationInput}
              keyboardType='numeric'
              defaultValue={values.phoneOfCompany}
             />
          <Text style={styles.errorsStyle}>{touched.phoneOfCompany && errors.phoneOfCompany}</Text>

          <Text style={styles.registrationInputLabel}>{i18n.t('additional_phone_number')}</Text>
          <TextInput
              name="extraPhoneOfCompany"
              onChangeText={(value)=>{
                props.setCompanyProfile({additional_phone: value});
                setFieldValue('extraPhoneOfCompany', value);
                props.setIsChanged(true);
              }}
              onBlur={handleBlur('extraPhoneOfCompany')}
              style={styles.registrationInput}
              keyboardType='numeric'
              defaultValue={values.extraPhoneOfCompany}

          />
          <Text style={styles.errorsStyle}>{touched.extraPhoneOfCompany && errors.extraPhoneOfCompany}</Text>

          <Text style={styles.registrationInputLabel}>{i18n.t('docs_delivery_address')}</Text>
          <TextInput
              name="deliveryAddressOfDocuments"
              onChangeText={(value)=>{
                props.setCompanyProfile({documents_delivery_address: value});
                setFieldValue('deliveryAddressOfDocuments', value);
                props.setIsChanged(true);
              }}
              onBlur={handleBlur('deliveryAddressOfDocuments')}
              style={styles.registrationInput}
              defaultValue={values.deliveryAddressOfDocuments}

          />
          <Text style={styles.errorsStyle}>{touched.deliveryAddressOfDocuments && errors.deliveryAddressOfDocuments}</Text>

          <Text style={styles.registrationInputLabel}>{i18n.t('gods_delivery_address')}</Text>
          <TextInput
              name="deliveryAddressOfProducts"
              onChangeText={(value)=>{
                props.setCompanyProfile({goods_delivery_address: value});
                setFieldValue('deliveryAddressOfProducts', value);
                props.setIsChanged(true);
              }}
              onBlur={handleBlur('deliveryAddressOfProducts')}
              style={styles.registrationInput}
              defaultValue={values.deliveryAddressOfProducts}
          />
          <Text style={styles.errorsStyle}>{touched.deliveryAddressOfProducts && errors.deliveryAddressOfProducts}</Text>
        </View>)}
  </Formik>
</View>)
};

const mapDispatchToProps = dispatch => ({
  getAuthTab: number => dispatch({type: GET_AUTH_TAB, authTabNumber: number}),
  setUserProfile: payload => dispatch({type: SET_USER_PROFILE, payload}),
  setCompanyProfile: payload => dispatch({type: SET_COMPANY_PROFILE, payload}),

});

const mapStateToProps = state => ({
  authTabNumber: state.reducerOne.authTabNumber,
  userData: state.userData.userData,
  companyProfile: state.userProfile.profile.company,
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyContactsData);

