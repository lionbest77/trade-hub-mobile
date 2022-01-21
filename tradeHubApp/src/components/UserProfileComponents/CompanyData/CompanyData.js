import React, {useState} from 'react';
import {connect} from 'react-redux';

import {Dimensions, Text, TextInput, View} from 'react-native';
import {Divider, Overlay} from 'react-native-elements';
import {Formik} from 'formik';

import {styles} from '../style';
import COLORS from '../../../constants/Colors';

import CompanyContactsData from '../CompanyContacsData/CompanyContactsData';
import AccordionButton from '../../buttons/AccordionButton/AccordionButton';
import {EmployeeCard} from '../EmployeeCard/EmployeeCard';
import MainButton from '../../buttons/MainButton/MainButton';
import ArrowDown from '../../../ui/icons/ArrowDown';
import ArrowUp from '../../../ui/icons/ArrowUp';

import {GET_AUTH_TAB, SET_COMPANY_PROFILE, SET_EMPLOYEES, SET_USER_PROFILE} from '../../../store/reduxConstants';
import validationSchema from '../validation';

const CompanyData = (props) => {

  // console.log(props.companyProfile, '----------PROPS FROM CompanyData---------');

  const {width} = Dimensions.get('window');
  const {role} = props.userData;

  const {
    edrpou, mfi, name, payment_account, users, bank_name
  } = props.companyProfile;

  const [companyUsers, setCompanyUsers] = useState([]);
  const [activeOverlay, setActiveOverlay] = useState(false);

  const removeUser = (id) => {
    const users = companyUsers.filter(item => item !== id);
    setCompanyUsers(users);
    props.setIsChanged(true);
  };

  const closeOverlay = () => {
    setActiveOverlay(false);
  };

  return (<View>
    <Overlay
        isVisible={activeOverlay}
        overlayStyle={styles.overlayContainer}
        onBackdropPress={closeOverlay}
    >
      <Text style={styles.text}>
        Ви додали максимальну кількість співробітників
      </Text>
      <View style={styles.buttonsContainer}>
        <View>
          <MainButton
              width={100}
              label={'Ok'}
              onPress={closeOverlay}
          />
        </View>
      </View>
    </Overlay>
    <Formik
        initialValues={{
          MFO: mfi,
          EDRPOU: edrpou,
          companyName: name,
          accountOfCompany: payment_account,
          bank_name: bank_name,
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
          values, handleSubmit, handleChange, handleBlur, isSubmitting, errors, touched, setFieldValue
        }) => (<View style={styles.formContainer}>
        <Text style={styles.registrationInputLabel}>Назва компанії</Text>
        <TextInput
            style={styles.registrationInput}
            name="companyName"
            onBlur={handleBlur('companyName')}
            onChangeText={(value) => {
              setFieldValue('companyName', value);
              props.setCompanyProfile({name: value});
              props.setIsChanged(true);
            }}
            defaultValue={values.companyName}

        />
        <Text style={styles.errorsStyle}>{errors.companyName}</Text>

        <View>
          <View style={{
            flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between',
          }}>


            <View style={{width: '40%'}}>
              <Text style={styles.registrationInputLabel}>ЄДРПОУ</Text>
              <TextInput
                  name="EDRPOU"
                  onChangeText={(value) => {
                    setFieldValue('EDRPOU', value);
                    props.setCompanyProfile({edrpou: value});
                    props.setIsChanged(true);
                  }}
                  onBlur={handleBlur('EDRPOU')}
                  style={styles.registrationInput}
                  keyboardType={'numeric'}
                  defaultValue={values.EDRPOU && values.EDRPOU.toString()}
               />

            </View>
            <View style={{width: '55%'}}>
              <Text style={styles.registrationInputLabel}>IBAN номер</Text>
              <TextInput
                  maxLength={31}
                  name="accountOfCompany"
                  onChangeText={(value) => {
                    setFieldValue('accountOfCompany', value);
                    props.setCompanyProfile({payment_account: value});
                    props.setIsChanged(true);
                  }}
                  onBlur={handleBlur('accountOfCompany')}
                  style={styles.registrationInput}
                  defaultValue={values.accountOfCompany}
                 />

            </View>

          </View>
          <View style={{
            flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between',
          }}>

            <View style={{width: '40%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.errorsStyle}>{touched.EDRPOU &&errors.EDRPOU}</Text>
            </View>
            <View style={{width: '55%', justifyContent: 'center'}}>
              <Text style={styles.errorsStyle}>{touched.accountOfCompany && errors.accountOfCompany}</Text>
            </View>


          </View>
        </View>

        <Divider style={styles.line}/>

        <AccordionButton
            text={'Контакти компанії'}
            initActiveState
            small={true}
            content={<CompanyContactsData
                mainRole={role}
                setIsChanged={props.setIsChanged}/>}
            iconUp={<ArrowUp/>}
            iconDown={<ArrowDown/>}
            style={(width >= 600) ? {fontSize: 18, color: COLORS.informText} : {fontSize: 13, color: COLORS.informText}}

        />

        <Divider style={styles.line}/>

        <AccordionButton
            text={'Список співробітників компанії'}
            initActiveState
            small={true}
            content={<View>
              <View>
                {users.map(item => (<EmployeeCard
                    setIsChanged={props.setIsChanged}
                    array={users}
                    onPress={() => removeUser(item)}
                    key={item.id ? item.id : item.key}
                    item={item}
                    setEmployees={props.setEmployees}
                    mainRole={role}
                />))}
              </View>

            </View>}
            iconUp={<ArrowUp/>}
            iconDown={<ArrowDown/>}

            style={(width >= 600) ? {fontSize: 18, color: COLORS.informText} : {fontSize: 13, color: COLORS.informText}}
        />

      </View>)}
    </Formik>
  </View>);
};

const mapDispatchToProps = dispatch => ({
  setEmployees: payload => dispatch({type: SET_EMPLOYEES, payload}),
  setUserProfile: payload => dispatch({type: SET_USER_PROFILE, payload}),
  getAuthTab: number => dispatch({type: GET_AUTH_TAB, authTabNumber: number}),
  setCompanyProfile: payload => dispatch({type: SET_COMPANY_PROFILE, payload}),

});

const mapStateToProps = state => ({
  authTabNumber: state.reducerOne.authTabNumber,
  userData: state.userData.userData,
  companyProfile: state.userProfile.profile.company,
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyData);