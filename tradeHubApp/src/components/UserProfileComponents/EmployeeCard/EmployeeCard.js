import React from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import {styles} from './style';
import validationSchema from '../../Registration/Validation';
import UserControlButton from '../../buttons/UserControlButton/UserControlButton';

export const EmployeeCard =(props) => {

  // console.log('Props from Employee CArd -----------', props);

  const { fullName, email, role, id, remove = false } = props.item;

  const users = props.array;
  const userRole = role.role ? "Повна" : "Неповна";

  const deleteUser = () => {

    Alert.alert(` ${fullName} буде видалений із списка співробітників.`, 'Продовжити?', [
      {
        text: 'Ні',
      }, {
        text: 'Так', onPress: () => {
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
    Alert.alert('На жаль у Вас недостатньо прав.', '', [
      {
        text: 'Зрозуміло'
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
          <Text style={styles.registrationInputLabel}>ПІБ співробітника</Text>
          <TextInput
              style={styles.registrationInput}
              name="employeeNames"
              onBlur={handleBlur('employeeNames')}
              onChangeText={handleChange('employeeNames')}
              value={fullName}
              editable={false}
           />

          <Text style={styles.registrationInputLabel}>Email співробітника</Text>
          <TextInput
              name="employeeEmail"
              onChangeText={handleChange('employeeEmail')}
              onBlur={handleBlur('employeeEmail')}
              style={styles.registrationInput}
              value={email}
              editable={false}
           />

          <Text style={styles.registrationInputLabel}>Роль співробітника</Text>
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