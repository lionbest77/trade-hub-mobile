import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SearchIcon = () => {
  return (
      <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M17.8607 15.714C17.3693 15.2433 16.891 14.7591 16.4264 14.2619C16.0361 13.8653 15.8011 13.5767 15.8011 13.5767L12.8633 12.174C14.0394 10.84 14.6886 9.12285 14.6889 7.34445C14.6889 3.29556 11.3944 0 7.34445 0C3.29451 0 0 3.29556 0 7.34445C0 11.3933 3.29451 14.6889 7.34445 14.6889C9.19421 14.6889 10.8803 13.9964 12.174 12.8643L13.5767 15.8021C13.5767 15.8021 13.8653 16.0371 14.2619 16.4274C14.6679 16.8083 15.202 17.3235 15.714 17.8617L17.1388 19.3222L17.7725 20L19.9979 17.7746L19.3201 17.1409C18.9225 16.7506 18.3916 16.2323 17.8607 15.714ZM7.34445 12.5905C4.45179 12.5905 2.09842 10.2371 2.09842 7.34445C2.09842 4.45179 4.45179 2.09842 7.34445 2.09842C10.2371 2.09842 12.5905 4.45179 12.5905 7.34445C12.5905 10.2371 10.2371 12.5905 7.34445 12.5905Z" fill="black"/>
      </Svg>
  );
};

export default SearchIcon;