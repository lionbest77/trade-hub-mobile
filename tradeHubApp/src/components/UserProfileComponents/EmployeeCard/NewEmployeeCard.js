import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';

import {Picker} from 'react-native-woodpicker';
import {Formik} from 'formik';

import {styles} from './style';
import WoodpickerArrow from '../../../ui/icons/WoodpickerArrow';
import validationSchema from '../validation.js';
import UserControlButton from '../../buttons/UserControlButton/UserControlButton';

export const NewEmployeeCard =(props) => {

  // console.log('Props from New Employee CArd -----------', props);

  const data = [
    { label: "Повна", value: 1 },
    { label: "Неповна", value: 0 }
  ];
 const [roleData, setRoleData] = useState();

 const handlerPicker = async (data) => {
   setRoleData(data);
   props.setNewUsers(props.item.key, 'role', data.value)
 };

  return (
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
              handleChange, handleBlur, errors, touched, setFieldValue
            }) => (
              <View style={styles.formContainerSmall}>
                <Text style={styles.registrationInputLabel}>ПІБ співробітника</Text>
                <TextInput
                    defaultValue=''
                    autoCapitalize='words'
                    style={styles.registrationInput}
                    name="employeeNames"
                    onBlur={handleBlur('employeeNames')}
                    onChangeText={(value)=>{
                      setFieldValue('employeeNames', value);
                      props.setNewUsers(props.item.key, 'fullName', value);
                      handleChange('employeeNames');
                      props.setIsChanged(true);
                    }}
                />
                <Text style={styles.errorsStyle}>{touched.employeeNames && errors.employeeNames}</Text>
                <Text style={styles.registrationInputLabel}>Email співробітника</Text>
                <TextInput
                    defaultValue=''
                    name="employeeEmail"
                    onChangeText={(value)=>{
                      setFieldValue('employeeEmail', value);
                      props.setNewUsers(props.item.key, 'email', value);
                      handleChange('employeeEmail');
                      props.setIsChanged(true);
                    }}
                    onBlur={handleBlur('employeeEmail')}
                    style={styles.registrationInput}
                />
                <Text style={styles.errorsStyle}>{touched.employeeEmail && errors.employeeEmail}</Text>
              <View style={{ marginBottom: 20 }}>

                <View>
                  <Text style={styles.labelStyle}>Роль співробітника</Text>
                </View>
             {/*   <View style={styles.arrowStyle}>
                  <WoodpickerArrow />
                </View>*/}
                <Picker
                    androidPickerMode="dialog"
                    style={styles.pickerStyle}
                    onItemChange={(data) => handlerPicker(data)}
                    items={data}
                    title="Роль співробітника"
                    item={roleData}
                    containerStyle={styles.containerStylePicker}
                    placeholderStyle={styles.placeholderStylePicker}
                    isNullable={true}
                />
              </View>

             <View style={{
                  alignItems: 'flex-end',
                  marginTop: '2%'
                }}>
                  <UserControlButton
                      onPress={() => props.onPress(props.item)}
                      removed={true} />
                </View>

              </View>)}
        </Formik>
      </View>
  )};