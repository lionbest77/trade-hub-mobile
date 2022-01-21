import React from "react";
import Svg, { Path } from "react-native-svg";

const SendContractIcon = () => {
  return (
    <Svg
      height="24"
      viewBox="0 0 48 48"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path d="M0 0h48v48h-48z" fill="none" />
      <Path d="M18 32h12v-12h8l-14-14-14 14h8zm-8 4h28v4h-28z" />
    </Svg>
  );
};

export default SendContractIcon;
