import React from 'react';
import Svg, { Path } from 'react-native-svg';

const MicrophoneIcon = ({ color = "#333333" }) => {
  return (
      <Svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M7 12C8.66 12 10 10.66 10 9V3C10 1.34 8.66 0 7 0C5.34 0 4 1.34 4 3V9C4 10.66 5.34 12 7 12ZM6 3C6 2.45 6.45 2 7 2C7.55 2 8 2.45 8 3V9C8 9.56 7.56 10 7 10C6.45 10 6 9.55 6 9V3ZM14 9H12.3C12.3 12 9.76 14.1 7 14.1C4.24 14.1 1.7 12 1.7 9H0C0 12.41 2.72 15.23 6 15.72V19H8V15.72C11.28 15.23 14 12.41 14 9Z" fill={color}/>
      </Svg>


  );
};

export default MicrophoneIcon;