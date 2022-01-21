import React from "react";
import Svg, { Path } from "react-native-svg";

const ArrowLeftIcon = ({ color = "white" }) => {
  return (
    <Svg
      width="20"
      height="9"
      viewBox="0 0 20 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M14.0152 2.82986L0.535713 2.82986C0.239866 2.82986 -5.10739e-07 3.04674 -4.87354e-07 3.31424L-2.89741e-07 5.57467C-2.66356e-07 5.84216 0.239866 6.05904 0.535713 6.05904L14.0152 6.05904L14.0152 7.91821C14.0152 8.78129 15.1693 9.21351 15.8443 8.60324L19.6862 5.12948C20.1046 4.75114 20.1046 4.13776 19.6862 3.75946L15.8443 0.285707C15.1693 -0.324568 14.0152 0.107657 14.0152 0.970737L14.0152 2.82986Z"
        fill="#000"
      />
    </Svg>
  );
};

export default ArrowLeftIcon;
