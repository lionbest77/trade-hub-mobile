import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ArrowLeftIcon = ({ color = 'white' }) => {
  return (
      <Svg width="20" height="9" viewBox="0 0 20 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M5.9848 6.05906H19.4643C19.7601 6.05906 20 5.84218 20 5.57468V3.31425C20 3.04675 19.7601 2.82987 19.4643 2.82987H5.9848V0.97071C5.9848 0.10763 4.83074 -0.324596 4.15574 0.285679L0.313828 3.75943C-0.104609 4.13777 -0.104609 4.75116 0.313828 5.12946L4.15574 8.60321C4.83069 9.21348 5.9848 8.78126 5.9848 7.91818V6.05906Z" fill={color}/>
      </Svg>
  );
};

export default ArrowLeftIcon;