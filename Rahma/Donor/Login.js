import React, { useEffect, useState } from "react";
import {
  Button, View, TextInput, StyleSheet, Text, Image, TouchableOpacity,
  Dimensions, PixelRatio, Platform
}
  from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//reload
import { useIsFocused } from "@react-navigation/native";

//firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  deleteDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { db } from "../config";

import { auth } from "../config";

//import validator from "validator";

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

const Login = ( {route, navigation} ) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const [error, setError] = useState({ satus: false, key: null, msg: "" });
    const [error, setError] = useState('')
    const [firebaseError, setFirebaseError] = useState("")

    const getUser = async () => {
        const donor = doc(db, "donors", email.toLowerCase());
        const donorSnap = await getDoc(donor);
        if (donorSnap.exists()) {
          console.log("exists");
          return true;
        } else {
          console.log("Not Found");
          setFirebaseError('This email is not registered.')
          return false;
        }
      };

    const handleLogin = async () => {
        if (
          (email == null || email == "") &&
          (password == null || password == "")
        )
          // setError({
          //   satus: true,
          //   key: "email&pass",
          //   msg: "Please Enter a Valid Email & Password",
          // });
          setError("Please Enter a Valid Email & Password");
        else if (!email.includes("@"))
          // setError({
          //   satus: true,
          //   key: "email",
          //   msg: "Please Enter a Valid Email",
          // });
          setError("Please Enter a Valid Email");
        else if (password == null || password == "")
          // setError({
          //   satus: true,
          //   key: "pass",
          //   msg: "Please Enter Password",
          // });
          setError("Please Enter Password")
        else if (await getUser()) {
          signInWithEmailAndPassword(auth, email, password)
            .then(async () => {
              navigation.navigate('Amount'); //change amount to home later
              // navigation.navigate('Address');
              // setError({ satus: false, key: null, msg: "" });
              setError('')
            })
            .catch((error) => {
              console.log(error.code);
              console.log(error.message);
              // setError({ satus: true, key: "db", msg: error.message });
              setError(error.message)
              setFirebaseError(error.message.split("/")[1].replace(/-/g, " ").replace(/\)/g, ""))
            });
        } else {
          // setError({
          //   satus: true,
          //   key: "email",
          //   msg: "Email is not registerd",
          // });
          setError("Email is not registerd")
        }
      };

    return (
        <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('./images/rahma_purple.png')}
        />
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: normalize(22), fontWeight: 'bold' }}>
            Let's get you {""}
          </Text>
          <Text style={{ fontSize: normalize(22), color: '#19CCA2', fontWeight: 'bold' }}>
            started!
          </Text>
        </View>
        <Text style={{ fontSize: normalize(18), color: 'grey' }}>Login</Text>
  
        {/* username */}
        <TextInput
          style={styles.input}
          placeholder='Enter Email'
          value={email}
          onChangeText={setEmail}
        >
        </TextInput>
  
        {/* password */}
        <TextInput
          style={styles.input}
          placeholder='Enter Password'
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        >
        </TextInput>  
  
        <TouchableOpacity
          style={styles.login}
           onPress={handleLogin}
        >
          <Text style={{ textAlign: 'center', color: 'white' }}>Login</Text>
        </TouchableOpacity>
        {/* <Text style={{paddingBottom: '2%', color: 'red'}}>{firebaseError}</Text> */}
        <Text style={{paddingBottom: '2%', color: 'red'}}>{error}</Text>
  
        <View style={styles.line}></View>
  
        <View style={styles.text}>
          <View style={{ flexDirection: 'row' }}>
            <Text>Don't an Account? {''}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
            >
            <Text style={{ color: '#19CCA2', fontWeight: 'bold' }}>Sign Up Here</Text>
            </TouchableOpacity>
          </View>
  
          <View style={{ paddingTop: "3%" }}>
          </View>
  
          <View style={{ flexDirection: 'row' }}>
            <Text>Or continue as {''}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Amount')}
            >
            <Text style={{ color: '#19CCA2', fontWeight: 'bold' }}>
              Guest
            </Text>
            </TouchableOpacity>
          </View>
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
    image: {
      width: '40%',
      height: width / 2.5,
      marginBottom: '5%'
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
    login: {
      backgroundColor: '#227ADE',
      borderRadius: 10,
      marginTop: '6%',
      width: '85%',
      paddingVertical: '3%'
    },
    line: {
      width: '80%',
      color: 'black'
    },
    // hexagon: {
    //   overflow: 'hidden',
    //   transform: [{ rotate: '45deg' }, { scaleX: 0.7071 }, { scaleY: 1.2247 }] // rotate and scale to make a hexagon
    // },
    text: {
      alignSelf: 'flex-start',
      marginLeft: '10%'
    },
    errorText: {
      color: 'red',
      marginBottom: 5,
    },
    inputError: {
      borderColor: 'red',
    },
  })