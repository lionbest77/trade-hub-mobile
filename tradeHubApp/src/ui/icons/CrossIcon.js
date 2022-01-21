import React from "react";
import Svg, { Path } from "react-native-svg";

const CrossIcon = ({ color = "grey" }) => {
  return (
    <Svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M17.1061 2.71749L17.2121 2.61143L17.1061 2.50536L15.4946 0.893934L15.3886 0.787868L15.2825 0.893934L9 7.17644L2.71749 0.893934L2.61143 0.787868L2.50536 0.893934L0.893934 2.50536L0.787868 2.61143L0.893934 2.71749L7.17644 9L0.893934 15.2825L0.787868 15.3886L0.893934 15.4946L2.50536 17.1061L2.61143 17.2121L2.71749 17.1061L9 10.8236L15.2825 17.1061L15.3886 17.2121L15.4946 17.1061L17.1061 15.4946L17.2121 15.3886L17.1061 15.2825L10.8236 9L17.1061 2.71749Z"
        fill="#C2C2C2"
        stroke="#C2C2C2"
        stroke-width="0.3"
      />
    </Svg>
  );
};

export default CrossIcon;
