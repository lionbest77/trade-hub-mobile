import React from 'react';
import {View} from 'react-native';

import Logo from '../../../ui/icons/Logo';
import { styles } from './styles';

const MainHeader = ({
                      leftComponent = null,
                      rightComponent = null
}) => {
  return (
      <View style={styles.headerContainer}>
        <View style={styles.leftComponent}>
          <View>
            {leftComponent}
          </View>
        </View>
        <View>
          <Logo/>
        </View>
        <View style={styles.rightComponent}>
          <View>
            {rightComponent}
          </View>
        </View>
      </View>
  );
};

export default MainHeader;