import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import RemoveUserIcon from '../../../ui/icons/RemoveUserIcon';
import AddUserIcon from '../../../ui/icons/AddUserIcon';
import {styles} from './styles';

const UserControlButton = ({ removed = false, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
            {!removed ? <AddUserIcon/> : <RemoveUserIcon/>}
            <Text style={styles.buttonText}>
            {!removed ? 'Додати співробітника' : 'Видалити співробітника'}
            </Text>
        </View>
    </TouchableOpacity>
);

export default UserControlButton;