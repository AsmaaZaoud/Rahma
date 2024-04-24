import { Alert, StatusBar, Image, View, Text } from 'react-native';
import React from 'react';

import { Button, Icon } from 'react-native-elements';
import Onboarding from 'react-native-onboarding-swiper';
import MaterialIcons from 'react-native-vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Amount from './Amount';

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
        title: 'Request for Donation',
        subtitle: 'Easily request for items that you need.',
        backgroundColor: '#19CCA2',
        image: (
          <Image
          style={{width: 150, height: 140}}
          source={require('./images/request.png')}
        />
        ),
      },
      {
        title: 'Help the Needy',
        subtitle: 'Help the needy by donating items easily.',
        backgroundColor: '#227ADE',
        image: (
          <Image
          style={{width: 150, height: 140}}
          source={require('./images/donate.png')}
        />
        ),
      },
      {
        title: 'Be anonymous',
        subtitle: 'Request or donate easily without a trace of your presence.',
        backgroundColor: '#061826',
        image: (
          <Image
          style={{width: 150, height: 140}}
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
        backgroundColor: '#227ADE',
        image: (
          <Icon name="heart" type="font-awesome" size={100} color="white" />
        ),
      
      },
    ]}
  />
  )
  };

export default Onboard;
