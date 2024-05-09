import React, { useEffect, useState } from "react";
import 
{ 
  Button, View, TextInput, StyleSheet, Text, Image, TouchableOpacity, 
  Dimensions, PixelRatio, Platform
} 
from 'react-native';

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

const Done = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Image
            source={require('./images/verified.gif')}
            style={styles.gif}
            ></Image>
            <View style={{margin: 20}}></View>
            <Text style={styles.text}>
                Thank you! {`\n`}
                You just saved a life with your donation!
            </Text>
            <Text style={{fontSize: normalize(20), marginTop: '15%', marginBottom: '5%'}}>
                You can view your history from below: 
            </Text>

            
          {/* <View style={{paddingTop: "15%"}}> */}
            <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('History');
           }}
          >
            <Text style={styles.buttonText}>History</Text>
          </TouchableOpacity>
        </View>

        <View style={{paddingTop: '10%'}}></View>
           
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Amount');
            }}
          >
            <Text style={styles.buttonText}>Make another donation</Text>
          </TouchableOpacity>
        </View>

        </View>
    )
}

export default Done;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
      },

    gif: {
        width: width * 0.5,
        height: width * 0.5
    },

    text : {
        fontStyle: 'italic',
        textAlign: 'center',
        fontSize: normalize(20)
    },

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
    })