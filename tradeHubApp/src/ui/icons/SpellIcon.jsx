import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SpellIcon = ({ color = "#333333" }) => {
  return (
      <Svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M0 13.8667V16H14.9333V13.8667H0ZM4.8 9.38667H10.1333L11.0933 11.7333H13.3333L8.26667 0H6.66667L1.6 11.7333H3.84L4.8 9.38667ZM7.46667 2.112L9.46133 7.46667H5.472L7.46667 2.112Z" fill={color}/>
      </Svg>

  );
};

export default SpellIcon;