import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import RemoveUserIcon from '../../../ui/icons/RemoveUserIcon';
import AddUserIcon from '../../../ui/icons/AddUserIcon';
import {styles} from './styles';

import i18n from '../../../services/localization'

const UserControlButton = ({ removed = false, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
            {!removed ? <AddUserIcon/> : <RemoveUserIcon/>}
            <Text style={styles.buttonText}>
            {!removed ? i18n.t('add_employee') : i18n.t('delete_employee')}
            </Text>
        </View>
    </TouchableOpacity>
);

export default UserControlButton;