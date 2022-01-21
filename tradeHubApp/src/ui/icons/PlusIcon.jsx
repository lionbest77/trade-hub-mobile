import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PlusIcon = () => {
  return (
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M23.5 10H14V0.5C14 0.225 13.775 0 13.5 0H10.5C10.225 0 10 0.225 10 0.5V10H0.5C0.225 10 0 10.225 0 10.5V13.5C0 13.775 0.225 14 0.5 14H10V23.5C10 23.775 10.225 24 10.5 24H13.5C13.775 24 14 23.775 14 23.5V14H23.5C23.775 14 24 13.775 24 13.5V10.5C24 10.225 23.775 10 23.5 10Z" fill="white"/>
      </Svg>

  );
};

export default PlusIcon;