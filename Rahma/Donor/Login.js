import React, { useEffect, useState } from "react";
import 
{ Button, View, TextInput, StyleSheet, Text, Image, TouchableOpacity, 
  Dimensions, PixelRatio, Platform } 
  from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//reload
import { useIsFocused } from "@react-navigation/native";

//responsiveness
const { width, height } = Dimensions.get("screen");
const scale = width / 435;
export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

const Login = () => {
  return (
    <View style={styles.container}>
      <Image
          style={styles.image}
          source={require('./images/rahma_purple.png')}
        />
        {/* <View style={[styles.hexagonContainer, { width: 100, height: 100 * Math.sqrt(3) }]}>
      <Image  source={require('./images/rahma_purple.png')} style={[styles.image, { width: width * 2, height: width * Math.sqrt(3) }]} resizeMode="cover" />
    </View> */}
        <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: normalize(22), fontWeight: 'bold'}}>
          Let's get you {""} 
        </Text>
        <Text style={{fontSize: normalize(22), color: '#19CCA2', fontWeight: 'bold'}}>
           started!
        </Text>
        </View>
        <Text style={{fontSize: normalize(18), color: 'grey'}}>Create an account</Text>
        <TextInput
          style={styles.input}
          placeholder = 'Enter Fullname'
        >
        </TextInput>
        <TextInput
          style={styles.input}
          placeholder = 'Enter Email Address'
        >
        </TextInput>
        <TextInput
          style={styles.input}
          placeholder = 'Enter Password'
          secureTextEntry={true}
        >
        </TextInput>
        <TouchableOpacity style={styles.signup}>
          <Text style={{textAlign: 'center', color: 'white'}}>Sign Up</Text>
        </TouchableOpacity>

    <View style={styles.line}></View>

    <View style={{}}>
    <Text>Have an Account?</Text>
    <Text>Login Here</Text>
    </View>

    <View>
    <Text>Or continue as</Text>
    <Text>Guest</Text>
    </View>

    </View>
  )
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // paddingTop: width> 500? '0%' : "0%",
    justifyContent: 'center',
  },
  image:{
    width: '40%',
    height: width/2.5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    width: '85%',
    padding: '3%',
    marginTop: '5%',
  },
  signup: {
    backgroundColor: '#227ADE',
    borderRadius : 10,
    marginVertical: '6%',
    width: '85%',
    paddingVertical: '3%'
  },
  line: {
    width: '80%',
    color : 'black'
  },
  // hexagonContainer: {
  //   overflow: 'hidden',
  //   transform: [{ rotate: '45deg' }, { scaleX: Math.sqrt(3) / 2 }, { scaleY: Math.sqrt(3) / 2 }],
  // },
  // image: {
  //   transform: [{ rotate: '-45deg' }, { scaleX: 2 / Math.sqrt(3) }, { scaleY: 2 / Math.sqrt(3) }],
  // },
})