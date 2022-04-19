import React from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import {styles} from './style';
import validationSchema from '../../Registration/Validation';
import UserControlButton from '../../buttons/UserControlButton/UserControlButton';

import i18n from '../../../services/localization'

export const EmployeeCard =(props) => {

  // console.log('Props from Employee CArd -----------', props);

  const { fullName, email, role, id, remove = false } = props.item;

  const users = props.array;
  const userRole = role.role ? i18n.t('full') : i18n.t('half');

  const deleteUser = () => {

    Alert.alert(fullName + ' ' + i18n.t('will_removed_from_employee_list'), i18n.t('continue'), [
      {
        text: i18n.t('no'),
      }, {
        text: i18n.t('yes'), onPress: () => {
          users.map((el) => {
            if (el.id === id) {
              el.remove = true;
              props.setIsChanged(true);
            }
            props.setEmployees(users);
          });
        },
      }]);

  };

 const roleHandler = () => {
    Alert.alert(i18n.t('not_enough_rights'), '', [
      {
        text: i18n.t('of_course')
      }])
 };

  return (
      !remove &&
  <View>
  <Formik
      initialValues={{
        employeeRole: '',
        employeeNames: '',
        employeeEmail: '',
      }}

      validationSchema={validationSchema}
      onSubmit={(values, {setSubmitting}) => {
        setSubmitting(true);
        alert(JSON.stringify(values));
        setTimeout(() => {
          setSubmitting(false);
        }, 500);
      }}
  >
    {({
        handleChange, handleBlur
    }) => (
        <View style={styles.formContainerSmall}>
          <Text style={styles.registrationInputLabel}>{i18n.t('employee_pib')}</Text>
          <TextInput
              style={styles.registrationInput}
              name="employeeNames"
              onBlur={handleBlur('employeeNames')}
              onChangeText={handleChange('employeeNames')}
              value={fullName}
              editable={false}
           />

          <Text style={styles.registrationInputLabel}>{i18n.t('employee_email')}</Text>
          <TextInput
              name="employeeEmail"
              onChangeText={handleChange('employeeEmail')}
              onBlur={handleBlur('employeeEmail')}
              style={styles.registrationInput}
              value={email}
              editable={false}
           />

          <Text style={styles.registrationInputLabel}>{i18n.t('employee_role')}</Text>
          <TextInput
              name="employeeRole"
              onChangeText={handleChange('employeeRole')}
              onBlur={handleBlur('employeeRole')}
              style={styles.registrationInput}
              value={userRole}
              editable={false}
          />
          <View style={{
            alignItems: 'flex-end',
            marginTop: '2%'
          }}>
            <UserControlButton
                onPress={!!props.mainRole ? deleteUser : roleHandler}
                removed={true} />
          </View>
        </View>)}
  </Formik>
</View>
  )};