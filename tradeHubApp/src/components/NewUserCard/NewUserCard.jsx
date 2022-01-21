import React, { Component } from "react";
import {
  Text,
  TextInput,
  View } from "react-native";
import { Picker } from "react-native-woodpicker";

import { Formik } from "formik";
import { styles } from "../Registration/Styles";
import validationSchema from "./Validation.js";

import WoodpickerArrow from "../../ui/icons/WoodpickerArrow";
import UserControlButton from "../buttons/UserControlButton/UserControlButton";

class NewUserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickedData: 0,
      companyName: props.companyName,
      email: "",
      full_name: "",
      id: props.id
    };
  }

  data = [
    { label: " ", value: null },
    { label: "Повна", value: 1 },
    { label: "Неповна", value: 0 }
  ];

  handlePicker = async data => {
    await this.setState({ pickedData: data });
    this.props.grabUser(this.state, this.state.id)
  };

  handleName = async value => {
    await this.setState({ full_name: value});
    this.props.grabUser(this.state, this.state.id)
  };

  handleEmail = async value => {
    await this.setState({ email: value});
    this.props.grabUser(this.state, this.state.id)
  };

  render() {
    let user = this.state;
    const index = this.state.id;

    return (
      <View
        style={{
          backgroundColor: "#fff"
        }}
      >
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "rgba(142, 142, 142, 0.55)",
            marginBottom: 30
          }}
        />
        <View style={{ marginBottom: 30 }}>
          <UserControlButton removed onPress={this.props.onPress} />
        </View>
        <Formik
          initialValues={{
            employeeNames: "",
            employeeEmail: ""
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            alert(JSON.stringify(values));
            setTimeout(() => {
              setSubmitting(false);
            }, 500);
          }}
        >
          {({
            handleChange,
            handleBlur,
            errors,
            setFieldValue
          }) => (
            <View>
              <View style={{ marginBottom: 20 }}>
                <View>
                  <Text style={styles.labelStyle}>Роль співробітника</Text>
                </View>
           {/*     <View style={styles.arrowStyle}>
                  <WoodpickerArrow />
                </View>*/}
                <Picker
                    items={this.data}
                    style={styles.pikerInput}
                    title="Роль співробітника"
                    item={this.state.pickedData}
                    onItemChange={this.handlePicker}
                    containerStyle={styles.containerStyle}
                    placeholderStyle={styles.placeholderStyle}
                    onDateChange={(data) => this.handlePicker(data)}
                />
              </View>
              <Text style={styles.registrationInputLabel}>
                ПІБ співробітника
              </Text>
              <TextInput
                name="employeeNames"
                style={styles.registrationInput}
                onChangeText={handleChange("employeeNames")}
                onChangeText={(value) => {
                  setFieldValue("employeeNames", value);
                  this.handleName(value);
                }}
                onBlur={() => this.props.grabUser(user, index)}

              />
              <Text style={styles.errorsStyle}>{errors.employeeNames}</Text>
              <Text style={styles.registrationInputLabel}>
                Email співробітника
              </Text>
              <TextInput
                name="employeeEmail"
                onBlur={handleBlur("email")}
                style={styles.registrationInput}
                onChangeText={handleChange("employeeEmail")}
                onChangeText={(value) => {
                  setFieldValue("employeeEmail", value);
                  this.handleEmail(value);
                }}
                onBlur={() => this.props.grabUser(user, index)}
                autoCapitalize={'none'}
              />
              <Text style={styles.errorsStyle}>{errors.employeeEmail}</Text>
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

export default NewUserCard;
