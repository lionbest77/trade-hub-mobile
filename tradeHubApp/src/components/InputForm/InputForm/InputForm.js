import React, { useState } from "react";
import { TouchableOpacity} from "react-native";
import { Input } from "react-native-elements";

import RequiredLabel from "../../../ui/RequiredLabel/RequiredLabel";
import styles from "./style";

const InputForm = ({
                     secur,
                     value,
                     warning,
                     required,
                     editable,
                     iconVisible,
                     label = null,
                     onChangeText,
                     keyboardType,
                     onTouchStart,
                     iconNonVisible,
                     autoCapitalize,
                     onSubmitEditing,
                   }) => {

  const [touch, setTouch] = useState(secur);

    return (
        <Input
            value={value}
            editable={editable}
            secureTextEntry={touch}
            selectTextOnFocus={true}
            onTouchStart={onTouchStart}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            autoCapitalize={autoCapitalize}
            errorStyle={styles.errorStyle}
            onSubmitEditing={onSubmitEditing}
            containerStyle={{paddingHorizontal: 0, borderWidth: 0}}
            label={<RequiredLabel text={label} required={required}/>}
            inputStyle={warning ? styles.textInputError : styles.textInput}
            inputContainerStyle={warning ? styles.inputContainerError : styles.inputContainer}
            // errorMessage={warning}
            rightIcon={
              <TouchableOpacity
                  onPress={() => setTouch(!touch)}
              >
                {touch ? iconVisible : iconNonVisible}
              </TouchableOpacity>}
        />);
};

export default InputForm;
