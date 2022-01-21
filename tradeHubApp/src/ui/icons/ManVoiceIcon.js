import React from "react";
import Svg, { Path } from "react-native-svg";

const ClipIcon = ({ color = "black" }) => {
  return (
    <Svg
      width="18"
      height="15"
      viewBox="0 0 18 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M6.31561 8.6842C8.05967 8.6842 9.4735 7.27036 9.4735 5.5263C9.4735 3.78225 8.05967 2.36841 6.31561 2.36841C4.57155 2.36841 3.15771 3.78225 3.15771 5.5263C3.15771 7.27036 4.57155 8.6842 6.31561 8.6842Z"
        fill="#333333"
      />
      <Path
        d="M6.31579 10.2632C4.20789 10.2632 0 11.3211 0 13.4211V15H12.6316V13.4211C12.6316 11.3211 8.42368 10.2632 6.31579 10.2632ZM12.4421 2.65263L11.1158 3.98684C11.7789 4.91842 11.7789 6.12632 11.1158 7.05789L12.4421 8.39211C14.0368 6.79737 14.0368 4.38947 12.4421 2.65263ZM15.0553 0L13.7684 1.28684C15.9553 3.67105 15.9553 7.25526 13.7684 9.76579L15.0553 11.0526C18.1342 7.98158 18.1421 3.19737 15.0553 0Z"
        fill="#333333"
      />
    </Svg>
  );
};

export default ClipIcon;
