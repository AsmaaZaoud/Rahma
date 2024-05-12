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

// import validator from "validator";

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

const SignUp = ( {navigation} ) => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpEnabled, setIsSignUpEnabled] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  // Function to handle input changes
  const handleUsernameChange = (text) => {
    setUsername(text);
    setIsUsernameValid(true);
    validateSignUp();
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsEmailValid(true);
    validateSignUp();
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setIsPasswordValid(true);
    validateSignUp();
  };

  // Function to validate signup button
  const validateSignUp = () => {
    console.log('password lenght VALIDATESIGNUP: ', password.length)
    if (username.trim() !== '' && email.trim() !== '' && email.includes('@') && email.endsWith('.com') && password.trim() !== '' && password.length >= 5) {
      setIsSignUpEnabled(true);
    } else {
      setIsSignUpEnabled(false);
    }
  };
  // const validateSignUp = () => {
  //   setIsSignUpEnabled(isUsernameValid && isEmailValid && isPasswordValid);
  // };

  // Function to handle signup button press
  const handleSignUp = () => {
    // Perform signup logic here
    console.log('Signing up...');
    console.log("in regstr...");
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("registend done");
        alert("Done!, Now log in please");
        // navigation.navigate("Login");
        add();
      })
      .catch((error) => {
        console.log(error.message);
        setRegisteerError("Email is already in use");
      });
  };

  const add = async () => {
    const docRef = doc(db, "donors", email.toLowerCase());
    await setDoc(docRef, {
      userName: username,
      email: email.toLowerCase(),
    })
      .then(() => {
        console.log("data submitted");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Function to validate username
  const validateUsername = () => {
    if (username.trim() === '') {
      setIsUsernameValid(false);
    }
  };

  // Function to validate email
  const validateEmail = () => {
    if (email.trim() === '' || !email.includes('@') || !email.endsWith('.com')) {
      setIsEmailValid(false);
    }
  };

  // Function to validate password
  const validatePassword = () => {
    console.log('password lenght VALIDATEPASSWORD: ', password.length)
    if (password.trim() === '' || password.length < 6) {
      setIsPasswordValid(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('./images/rahma_purple.png')}
      />
      {/* <View style={[styles.hexagon, { width: 60, height: 0 * 0.866 }]}>
        <Image source={require('./images/rahma_purple.png')} style={{ width: 200, height: 200 * 0.866 }} resizeMode="cover" />
      </View> */}
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: normalize(22), fontWeight: 'bold' }}>
          Let's get you {""}
        </Text>
        <Text style={{ fontSize: normalize(22), color: '#19CCA2', fontWeight: 'bold' }}>
          started!
        </Text>
      </View>
      <Text style={{ fontSize: normalize(18), color: 'grey' }}>Create an account</Text>

      {/* username */}
      <TextInput
        style={[styles.input, !isUsernameValid && styles.inputError]}
        placeholder='Enter Username'
        value={username}
        onChangeText={handleUsernameChange}
        onBlur={validateUsername}
      >
      </TextInput>
      {!isUsernameValid && <Text style={styles.errorText}>Username is required</Text>}

      {/* email */}
      <TextInput
        style={[styles.input, !isEmailValid && styles.inputError]}
        placeholder='Enter Email Address'
        value={email}
        onChangeText={handleEmailChange}
        onBlur={validateEmail}
      >
      </TextInput>
      {!isEmailValid && <Text style={styles.errorText}>Please enter a valid email address</Text>}

      {/* password */}
      <TextInput
        style={[styles.input, !isPasswordValid && styles.inputError]}
        placeholder='Enter Password'
        secureTextEntry={true}
        value={password}
        onChangeText={handlePasswordChange}
        onBlur={validatePassword}
      >
      </TextInput>
      {!isPasswordValid && <Text style={styles.errorText}>Password must be at least 6 characters long</Text>}


      <TouchableOpacity
        style={[styles.signup, { backgroundColor: isSignUpEnabled ? '#227ADE' : 'gray' }]}
        onPress={handleSignUp}
        disabled={!isSignUpEnabled}
      >
        <Text style={{ textAlign: 'center', color: 'white' }}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.line}></View>

      <View style={styles.text}>
        <View style={{ flexDirection: 'row' }}>
          <Text>Have an Account? {''}</Text>
          <Text style={{ color: '#19CCA2', fontWeight: 'bold' }}>Login Here</Text>
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

export default SignUp;

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
  signup: {
    backgroundColor: '#227ADE',
    borderRadius: 10,
    marginVertical: '6%',
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