import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import MainHeader from '../../components/headers/MainHeader/MainHeader';
import MainButton from '../../components/buttons/MainButton/MainButton';
import ArrowLeftIcon from '../../ui/icons/ArrowLeftIcon';
import {styles} from './style';


const PolicyScreen =({navigation}) => {
  // console.log(navigation);

  const valueEmail = navigation.state.params.valueEmail;
  const valuePassword = navigation.state.params.valuePassword;

  return (
      <View style={{flex: 1}}>
        <MainHeader
            leftComponent={
              <MainButton
                  width={80}
                  icon={<ArrowLeftIcon color='#333'/>}
                  backgroundColor='#fff'
                  leftBorderNone
                  onPress={() => navigation.navigate('Login', {valueEmail, valuePassword})}
              />
            }
        />
        <ScrollView style={{backgroundColor: '#fff'}}>

          <View style={styles.mainContainer}>

            <Text style={styles.title}>Privacy Policy for Buy Pro</Text>
            <Text style={styles.mainText}>BUY PRO LLC built the BuyPro app as a Commercial app. This SERVICE is provided by BUY PRO LLC and is intended for use as is.</Text>
            <Text style={styles.mainText}>This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.      </Text>
            <Text style={styles.mainText}>  If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. </Text>
            <Text style={styles.mainText}> The Personal Information that we collect is used for providing and improving the Service. we will not use or share your information with anyone except as described in this Privacy Policy.
              The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at BuyPro unless otherwise defined in this Privacy Policy.</Text>


            <Text style={styles.subTitle}>Information Collection and Use</Text>
            <Text  style={styles.mainText}>For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information. The information that we request will be retained by us and used as described in this privacy policy.</Text>
            <Text  style={styles.mainText}>The app does use third party services that may collect information used to identify you.
            </Text>
            <Text  style={styles.mainText}>Link to privacy policy of third party service providers used by the app </Text>
            <Text  style={styles.mainText}>   [Google Play Services](https://www.google.com/policies/privacy/) </Text>

            <Text style={styles.subTitle}>ILog Data</Text>
            <Text  style={styles.mainText}>We want to inform you that whenever you use our Service, in a case of an error
              in the app we collect data and information (through third party products) on your phone called Log Data.
              This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version,
              the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.
            </Text>

            <Text style={styles.subTitle}>Cookies</Text>
            <Text  style={styles.mainText}>Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers.
              These are sent to your browser from the websites that you visit and are stored on your device's internal memory.
            </Text>
            <Text  style={styles.mainText}>This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device.
              If you choose to refuse our cookies, you may not be able to use some portions of this Service.
            </Text>

            <Text style={styles.subTitle}>Service Providers</Text>
            <Text  style={styles.mainText}>We may employ third-party companies and individuals due to the following reasons: </Text>

            <Text  style={styles.mainText}>*   To facilitate our Service;    </Text>
            <Text  style={styles.mainText}>*   To provide the Service on our behalf;      </Text>
            <Text  style={styles.mainText}>*   To perform Service-related services;  </Text>
            <Text  style={styles.mainText}>*   To assist us in analyzing how our Service is used.    </Text>
            <Text  style={styles.mainText}>we want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.   </Text>

            <Text style={styles.subTitle}>Security</Text>

            <Text  style={styles.mainText}>  we value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</Text>

            <Text style={styles.subTitle}>Links to Other Sites</Text>
            <Text  style={styles.mainText}>  This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. we have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</Text>

            <Text style={styles.subTitle}>Children’s Privacy</Text>
            <Text  style={styles.mainText}>  These Services do not address anyone under the age of 13. we do not knowingly collect personally identifiable information from children under 13\.
              In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers.
              If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.</Text>

            <Text style={styles.subTitle}>Changes to This Privacy Policy</Text>
            <Text  style={styles.mainText}>We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. we will notify you of any changes by posting the new Privacy Policy on this page.</Text>


          </View>
        </ScrollView>
      </View>

  )
};


export default PolicyScreen;
