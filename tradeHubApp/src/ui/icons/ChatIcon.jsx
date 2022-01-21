import React from "react";
import Svg, { Path } from "react-native-svg";

const ChatIcon = ({ color = "white" }) => {
  return (
    <Svg
      width="27"
      height="24"
      viewBox="0 0 27 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.714355 10.6667C0.714355 4.77333 6.62864 0 13.8572 0C21.0858 0 27.0001 4.77333 27.0001 10.6667C27.0001 16.56 21.0858 21.3333 13.8572 21.3333C12.2932 21.3333 10.7161 21.1067 9.21778 20.6667C6.81264 22.6667 3.82921 23.8533 0.714355 24C3.77664 20.8933 4.32864 18.8 4.32864 18C3.23109 17.1231 2.33802 16.011 1.71323 14.7433C1.08844 13.4756 0.747355 12.0836 0.714355 10.6667Z"
        fill="#E51A4B"
      />
    </Svg>
  );
};

export default ChatIcon;
