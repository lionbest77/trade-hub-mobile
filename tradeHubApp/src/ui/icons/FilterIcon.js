import React from "react";
import Svg, { Path } from "react-native-svg";

const FilterIcon = () => {
  return (
    <Svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        opacity="0.3"
        d="M9.24272 16.9014V11.216C9.24272 11.2159 9.24272 11.2159 9.24272 11.2159C9.24291 10.7726 9.09096 10.3427 8.81211 9.99676L8.81208 9.99672L3.12804 2.95H16.872L11.1879 9.99672L11.1879 9.99676C10.9092 10.3424 10.7573 10.772 10.7573 11.215V15.7746L9.24272 16.9014ZM2.81434 0.85H2.81432C2.44447 0.850046 2.08207 0.953721 1.76885 1.1492C1.45563 1.34468 1.20427 1.62407 1.04388 1.95531C0.883493 2.28656 0.82066 2.6561 0.862697 3.02134C0.904732 3.38655 1.0499 3.73243 1.28132 4.01917C1.28133 4.01919 1.28134 4.0192 1.28135 4.01921L7.12816 11.268V17.2C7.12816 17.5624 7.22989 17.9175 7.42185 18.2256C7.6138 18.5337 7.88834 18.7825 8.21457 18.9443C8.5408 19.1062 8.90591 19.1746 9.26904 19.1421C9.63217 19.1096 9.97911 18.9775 10.271 18.7603L12.0856 17.4103C12.3296 17.2288 12.5277 16.9933 12.6642 16.7225C12.8007 16.4517 12.8718 16.1529 12.8718 15.85V11.268L18.7187 4.01921C18.7187 4.0192 18.7187 4.01919 18.7187 4.01917C18.9501 3.73243 19.0953 3.38655 19.1373 3.02134C19.1793 2.6561 19.1165 2.28656 18.9561 1.95531C18.7957 1.62407 18.5444 1.34468 18.2311 1.1492C17.9179 0.953721 17.5555 0.850046 17.1857 0.85H2.81434Z"
        fill="#333333"
        stroke="#333333"
        stroke-width="0.3"
      />
    </Svg>
  );
};

export default FilterIcon;
