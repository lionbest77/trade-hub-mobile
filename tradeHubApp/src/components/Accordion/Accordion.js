import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";

const Accordion = ({
  header = null,
  content = null,
  headerStatus = null,
  initActiveState = false
}) => {
  const [active, setActive] = useState(initActiveState);
  const [expanded, setExpanded] = useState(initActiveState);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          setExpanded(!expanded);
          setActive(!active);
        }}
      >
        {headerStatus}
        {header}
      </TouchableOpacity>
      {expanded && content}
    </View>
  );
};

export default Accordion;
