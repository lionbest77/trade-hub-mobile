import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions} from 'react-native';

import COLORS from '../../../constants/Colors';

let {width} = Dimensions.get('window');

const AccordionButton = ({
                           text = null,
                           content = null,
                           initActiveState = false,
                           iconUp,
                           iconDown,
                           small=false,
                           style}) => {

  const [active, setActive] = useState(initActiveState);

  return (
      <View>
        <TouchableOpacity
            onPress={() => {setActive(!active)}}
            style={styles.container}
        >
          {!small && (
              <View style={[
                {...styles.lineContainer},
                !active && {backgroundColor: COLORS.informText}
              ]} />
          )}
<View style={styles.iconContainer}>

  <Text
      style={[
          {...styles.text, ...style},
        !active && {color: COLORS.informText}
      ]}
  >
    {text}
  </Text>
  {active ? iconUp : iconDown}

</View>
        </TouchableOpacity>
        {active && content}
       </View>
  );
};

export default AccordionButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  lineContainer: {
    height: 2,
    width: 22,
    marginRight: 6,
    marginLeft: 30,
    backgroundColor: COLORS.main,
  },
  text: {
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingRight: 30,
    color: '#000'
  },
  smallText: {
    fontSize: width >= 600 ? 20 : 13,
    color: COLORS.informText,
    fontWeight: "bold"
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  }

});
