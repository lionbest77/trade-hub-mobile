import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import i18n from '../../../services/localization';

import CheckMarkRedIcon from '../../../ui/icons/CheckMarkRedIcon';
import { styles } from './styles';

const LanguageButton = ({ locale, name, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
            {i18n.currentLocale() == locale ? <CheckMarkRedIcon/> : null}
            <Text style={styles.buttonText}>
                {name}
            </Text>
        </View>
    </TouchableOpacity>
);

export default LanguageButton;