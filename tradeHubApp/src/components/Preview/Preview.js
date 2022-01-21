import React from 'react';

import {WebView} from 'react-native-webview';
import {ActivityIndicator} from 'react-native';

import COLORS from '../../constants/Colors';

const PreviewBlock = ({path}) => {

  return (
        <WebView
            source={{ uri: path}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            renderError={((errorDomain, errorCode, errorDesc) => console.log(errorCode, errorDomain, errorDesc))}
            renderLoading ={ () => { return <ActivityIndicator
                color={COLORS.main}
                size="large"
                style = {{position: 'absolute',left: 0,right: 0, top: 0,bottom: 0,alignItems: 'center', justifyContent: 'center'}}

            /> }}
        />
  )
};

export default PreviewBlock;