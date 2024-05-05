import { Alert, StatusBar, Image, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';

import { Button, Icon } from 'react-native-elements';
import Onboarding from 'react-native-onboarding-swiper';
import MaterialIcons from 'react-native-vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Amount, { normalize } from './Amount';
const { width, height } = Dimensions.get("screen");


//Amount for test purpose
// import Amount from Amount;

//onboarding page to welcome first time users and give them a introduction of what the app is for
const Onboard = ({navigation}) => {
  // const navigation = NavigationContainer()
  return(
   // <View><Text>Onboards sceren</Text></View>
  <Onboarding
    showDone={false}
    onSkip={() => navigation.navigate('Amount')
      
      // this is where you will redirect the user to the login page
    }
    //stores the data in pages array, and each object is for a different page
    //the properties are title, subtitile, background color, and an image
    pages={[
      {
        title: (
          <Text style={styles.heading}>
            Request for Donation
          </Text>
        ),
        subtitle: (
          <Text style={styles.subheading}>
            Easily request for items that you need.
          </Text>
        ),
        image: (
          <Image
          style={styles.image}
          source={require('./images/request.png')}
        />
        ),
        backgroundColor: '#19CCA2',
      },
      {
        title: (
          <Text style={styles.heading}>
            Help the Needy
          </Text>
        ),
        subtitle: (
          <Text style={styles.subheading}>
            Help the needy by donating items easily.
          </Text>
        )
        ,
        backgroundColor: '#227ADE',
        image: (
          <Image
          style={styles.image}
          source={require('./images/donate.png')}
        />
        ),
      },
      {
        title: (
          <Text style={styles.heading}>
            Be anonymous
          </Text>
        ),
        subtitle: (
          <Text style={styles.subheading}>
            Request or donate easily without a trace of your presence.
          </Text>
        ),
        backgroundColor: '#061826',
        //this image will be changed to the logo later
        image: (
          <Image
          style={styles.image}
          source={require('./images/anonymous.png')}
        />
        ),
      },
      {
        //this button takes you to the login page 
        title: "Are You Ready?",
        subtitle: (
          <Button
            title={'Get Started'}
            containerViewStyle={{ marginTop: 20 }}
            backgroundColor={'white'}
            borderRadius={5}
            textStyle={{ color: '#19CCA2' }}
            onPress={() => {
              // This is where you will  redirect the user if they click this button
              navigation.navigate('Amount');
              StatusBar.setBarStyle('default');
            }}
          />
        ),
        backgroundColor: '#19CCA2',
        image: (
          <Image
          style={styles.image}
          source={require('./images/WhiteLogo.png')}
        />
        ),
      
      },
    ]}
  />
  )
  };

export default Onboard;

const styles = StyleSheet.create({
  heading: {
    fontSize: normalize(30), 
    fontWeight: 'bold', 
    color: 'white',
    paddingBottom: '3%',
    textAlign: 'center',
  },
  subheading: {
    fontSize: normalize(20), 
    color: 'white',
    textAlign: 'center',
  },
  image:{
    width: '40%',
    height: width/2.5,
  }
})