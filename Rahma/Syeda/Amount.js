import React, { useEffect, useState } from "react";
import 
{ Button, View, TextInput, StyleSheet, Text, Image, TouchableOpacity, 
  Dimensions, PixelRatio, Platform } 
  from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//responsiveness
const { width, height } = Dimensions.get("screen");
const scale = width / 428;
export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

const Amount = ({navigation}) => {

  //numerical field code

  const [value, setValue] = useState('');
  //error message if value in input field is not between 1-5
  const [error, setError] = useState('');

  const onChangeText = (text) => {
    // Remove non-numeric characters from input
    const numericValue = text.replace(/[^0-9]/g, '');
    console.log("Number entered: ", text)
    // Check if numericValue is within the range 1-5
    if (numericValue === '' || (parseInt(numericValue) >= 1 && parseInt(numericValue) <= 5)) {
      setValue(numericValue);
      setError('');
      console.log('Value is between 1 and 5:', text);
    } 
    else {
      setError('Value must be between 1 and 5');
      console.log('Error Message: ', error)
    }
  };

  //check value and dis/enable button
  const isDisabled = value === '' || !(parseInt(value) >= 1 && parseInt(value) <= 5);

  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: normalize(22)}}>How many bags/ boxes do you have?</Text>
        <View style={styles.bar}>
            <View style={[styles.circle, { backgroundColor: '#19CCA2' }]} />
            <View style={styles.line} />
            <View style={styles.circle} />
            <View style={styles.line} />
            <View style={styles.circle} />
            <View style={styles.line} />
            <View style={styles.circle} />
            <View style={styles.line} />
            <View style={styles.circle} />
        </View>

        <View style={styles.input}>
          <TextInput
          style={styles.amount}
          keyboardType="numeric"
          placeholder="Enter number of bags/ boxes"
          value={value}
          onChangeText={onChangeText}
          />
        </View>

        {/* error text */}
        {error !== '' && <Text style={styles.error}>{error}</Text>}

        <View style={{paddingTop: '20%', alignItems:'center'}}>
          <Image
          source={require('./images/amount.png')}
          style={styles.image}
        />
        </View> 

        <View style={{paddingTop: '30%'}}>
          <TouchableOpacity
            style={[styles.button, isDisabled ? styles.disabledButton : styles.enabledButton]}
            disabled={isDisabled}
            onPress={() => {
              navigation.navigate('DateTimeScreen');
            }}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>

    </View>
  )
}

export default Amount;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      // paddingTop: '25%',
      justifyContent: 'center',
    },

    //progress bar
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '10%',
      },
      circle: {
        width: width * 0.045,
        height: width * 0.045,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#19CCA2',
      },
      line: {
        width: width * 0.15,
        height: width * 0.005,
        backgroundColor: '#19CCA2',
      }, 

      //amount input field
      input:{
        paddingTop: "10%"
      },
      amount: {
        borderWidth: 1,
        borderColor: '#19CCA2',
        borderRadius: 10,
        paddingVertical: "3%",
        fontSize: normalize(20),
        textAlign: 'center',
        width: width * 0.8
      },

      //error message
      error: {
        color: 'red',
        paddingTop: "5%",
      },

      //image
      image:{
        width: width*0.4,
        height: width*0.4,
      },

      //continue button
      button: {
        backgroundColor: '#19CCA2',
        paddingVertical: "4%",
        borderRadius: 8,
        width: width * 0.75
      },
      buttonText: {
        color: '#fff',
        fontSize: normalize(20),
        fontWeight: 'bold',
        textAlign: 'center',
      },
      enabledButton: {
        backgroundColor: '#19CCA2',
      },
      disabledButton: {
        backgroundColor: 'gray',
      },

  });
  