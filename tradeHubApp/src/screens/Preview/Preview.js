import React from 'react';
import {View} from 'react-native';

import MainHeader from '../../components/headers/MainHeader/MainHeader';
import MainButton from '../../components/buttons/MainButton/MainButton';
import PreviewBlock from '../../components/Preview/Preview';
import ArrowLeftIcon from '../../ui/icons/ArrowLeftIcon';

const Preview =(props) => {

  const path = props.navigation.state.params.path;
  // console.log(path);

  return (
      <View style={{flex: 1}}>
        <MainHeader
            leftComponent={
              <MainButton
                  width={80}
                  leftBorderNone
                  backgroundColor='#fff'
                  icon={<ArrowLeftIcon color='#333'/>}
                  onPress={() => props.navigation.goBack()}
              />
            }
        />

        <View style={{backgroundColor: '#fff', width: '100%', flex:1}}>
         <PreviewBlock path={path}
         />
       </View>

      </View>

  )
};

export default Preview;