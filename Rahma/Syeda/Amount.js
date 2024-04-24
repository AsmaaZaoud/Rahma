import React, { useEffect, useState } from "react";
import { Button, View, TextInput, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
      <Text style={{fontWeight: 'bold', fontSize: 20}}>How many bags/ boxes do you have?</Text>
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
          placeholder="Enter how many bags/boxes"
          value={value}
          onChangeText={onChangeText}
          />
        </View>

        {/* error text */}
        {error !== '' && <Text style={styles.error}>{error}</Text>}

        <View style={{paddingTop: 50}}>
          <Image
          source={require('./images/amount.png')}
          style={styles.image}
        />
        </View>

        <View style={{paddingTop: 150}}>
          <TouchableOpacity
            style={[styles.button, isDisabled ? styles.disabledButton : styles.enabledButton]}
            // onPress={onPressContinue}
            disabled={isDisabled}
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
      paddingTop: 100
      // justifyContent: 'center',
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
      },
      circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#19CCA2',
      },
      line: {
        width: 50,
        height: 2,
        backgroundColor: '#19CCA2',
      },
      amount: {
        borderWidth: 1,
        borderColor: '#19CCA2',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 8,
        fontSize: 16,
        width: 300
      },
      input:{
        paddingTop: 40
      },
      image:{
        width: 200,
        height: 200,
      },
      button: {
        backgroundColor: '#19CCA2',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: 300
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      enabledButton: {
        backgroundColor: '#19CCA2',
      },
      disabledButton: {
        backgroundColor: 'gray',
      },
      error: {
        color: 'red',
        paddingTop: 15,
      },
  });
  