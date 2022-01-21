import React from 'react';
import {ScrollView, Text, View, StyleSheet, Dimensions} from 'react-native';

import MainHeader from '../../components/headers/MainHeader/MainHeader';
import MainButton from '../../components/buttons/MainButton/MainButton';
import ArrowLeftIcon from '../../ui/icons/ArrowLeftIcon';
import AccordionButton  from '../../components/buttons/AccordionButton/AccordionButton';

let {height, width} = Dimensions.get('window');
const content = [
  {
    title: 'як BuyPro проводить тендерну процедуру?',
    text: 'Після Вашого погодження заказу, менеджер BuyPro супроводжує поставки до моменту закриття його, вирішуючи всі питання стосовно Якості та кількості товарів та послуг, комплектності документів та інших питань.',
  },
  {
    title: 'Як передають  заяву на поставку?',
    text: 'Після Вашого погодження заказу, менеджер BuyPro супроводжує поставки до моменту закриття його, вирішуючи всі питання стосовно Якості та кількості товарів та послуг, комплектності документів та інших питань.',
  },
  {
    title: 'Як проходить Отримання тендерного рішення?',
    text: 'Після Вашого погодження заказу, менеджер BuyPro супроводжує поставки до моменту закриття його, вирішуючи всі питання стосовно Якості та кількості товарів та послуг, комплектності документів та інших питань.',
  },
  {
    title: 'Як передається заявка на поставку?',
    text: 'Після Вашого погодження заказу, менеджер BuyPro супроводжує поставки до моменту закриття його, вирішуючи всі питання стосовно Якості та кількості товарів та послуг, комплектності документів та інших питань.',
  },
  {
    title: 'Як проходить Отримання тендерного рішення?',
    text: 'Після Вашого погодження заказу, менеджер BuyPro супроводжує поставки до моменту закриття його, вирішуючи всі питання стосовно Якості та кількості товарів та послуг, комплектності документів та інших питань.',
  },
  {
    title: 'Як передається заявка на поставку?',
    text: 'Після Вашого погодження заказу, менеджер BuyPro супроводжує поставки до моменту закриття його, вирішуючи всі питання стосовно Якості та кількості товарів та послуг, комплектності документів та інших питань.',
  },
];

const FaqScreen = ({navigation}) => {
  return (
      <View style={styles.wrapper}>
        <MainHeader
            leftComponent={
              <MainButton
                width={80}
                icon={<ArrowLeftIcon color='#333'/>}
                backgroundColor='#fff'
                leftBorderNone
                onPress={() => navigation.goBack()}
              />
            }
        />
        <ScrollView style={{backgroundColor: '#fff'}}>
          <View style={styles.container}>
            {content.map((item, index) => (
                <AccordionButton
                    style={(width >= 600) && {fontSize: 20} }
                    initActiveState={index === 0 && true}
                    key={index}
                    content={
                      <Text style={styles.text}>
                        {item.text}
                      </Text>
                    }
                    text={item.title}
                />
                )
              )
            }
          </View>
        </ScrollView>
      </View>
  );
};

export default FaqScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginRight: 34,
    paddingBottom: 30,
  },
  text: {
    color: '#333',
    lineHeight: 22,
    paddingTop: '2%',
    paddingLeft: 60,
    fontSize: (width >= 600) ?  20 : 15,
  },
});
