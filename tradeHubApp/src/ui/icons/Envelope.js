import React from "react";
import Svg, { Path } from "react-native-svg";

const Envelope = () => {
  return (
    <Svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path fillRule="evenodd" clipRule="evenodd" d="M5 1.5H13.375C14.4205 1.5 15.3589 1.95839 16.0002 2.68516L9.1875 6.98794L2.37477 2.68516C3.0161 1.95839 3.95452 1.5 5 1.5ZM1.64536 3.9986C1.55079 4.31587 1.5 4.652 1.5 5V9C1.5 10.933 3.067 12.5 5 12.5H13.375C15.308 12.5 16.875 10.933 16.875 9V5C16.875 4.652 16.8242 4.31587 16.7296 3.9986L9.58799 8.50912L9.1875 8.76206L8.78701 8.50912L1.64536 3.9986ZM0 5C0 2.23858 2.23858 0 5 0H13.375C16.1364 0 18.375 2.23858 18.375 5V9C18.375 11.7614 16.1364 14 13.375 14H5C2.23858 14 0 11.7614 0 9V5Z" fill="#333333"/>
    </Svg>
  );
};

export default Envelope;
