import React, { useState, useRef } from "react";
import {Text, View, Image, Dimensions} from 'react-native';

import Swiper from "react-native-swiper";
import COLORS from "../../constants/Colors";
import MainHeader from "../../components/headers/MainHeader/MainHeader";
import OnboardingButton from "../../components/buttons/OnboardingButton/OnboardingButton";
import NextIcon from "../../ui/icons/NextIcon";
import { styles } from "./styles";
import CheckMarkIcon from "../../ui/icons/CheckMarkIcon";

const content = [
  {
    image: require("../../assets/images/OnboardingImg1.png"),
    text: "Делегування закупок"
  },
  {
    image: require("../../assets/images/OnboardingImg2.png"),
    text: "Економія коштів"
  },
  {
    image: require("../../assets/images/OnboardingImg3.png"),
    text: "Автоматизація процесів"
  }
];

const OnboardingScreen = props => {
  const [swiperIndex, setSwiperIndex] = useState(1);
  const swiper = useRef(null);

  let {height, width} = Dimensions.get('window');

  return (
    <View style={styles.pageContainer}>
      <MainHeader />
      <Swiper
        ref={swiper}
        onIndexChanged={i => setSwiperIndex(i + 1)}
        dotStyle={styles.dot}
        activeDotStyle={styles.dotActive}
        loop={false}
      >
        {content.map((item, index) => (
          <View key={index} style={styles.content}>
            <View style={styles.contentContainer}>
              <Image source={item.image} style={styles.contentImage} />
            </View>
            <Text style={styles.contentText}>{item.text}</Text>
          </View>
        ))}
      </Swiper>
      {swiperIndex !== 3 ? (
        <View
          style={{
            paddingLeft: (width >= 600 ) ? "60%" : "50%"
          }}
        >
          <OnboardingButton
            leftComponent={
              <Text
                style={{
                  textAlign: 'center',
                  color: "#fff",
                  fontSize: (width >= 600 ) ? 24 : 18,
                  fontWeight: "bold",
                  paddingBottom: 4,
                }}
              >
                Далі
              </Text>
            }
            rightComponent={<NextIcon />}
            backgroundColor={COLORS.main}
            rightBorderNone
            buttonLeveling
            onPress={() => swiper.current.scrollBy(1)}
          />
        </View>
      ) : (
        <View
          style={{
            alignItems: "center",
            marginHorizontal: (width >= 600 ) ? "20%" :'10%',
            justifyContent: 'center',
          }}
        >
          <OnboardingButton
            rightComponent={
              <Text
                style={{
                  textAlign: 'center',
                  color: "#fff",
                  fontSize: (width >= 600 ) ? 24 : 18,
                  fontWeight: "bold",
                  paddingHorizontal: '10%'
                }}
              >
                До реєстрації
              </Text>
            }
            leftComponent={
              <View >
                <CheckMarkIcon />
              </View>
            }
            backgroundColor={COLORS.main}
            shadowOpacity={1}
            onPress={() => props.navigation.navigate("Login")}
          />
        </View>
      )}
    </View>
  );
};

export default OnboardingScreen;
