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

import {
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
  where,
  collection,
} from "firebase/firestore";
import { db, auth } from "../Rahma/config";

const History = ({route, navigation}) => {
    return (
        <View style={styles.container}>

            <View style={{width: '90%'}}>
            <Text style={{fontSize: normalize(30), fontWeight: 'bold', textDecorationLine: 'underline'}}>
                Your donations
            </Text>
            </View>

            {/* map function for donations */}
            <View style={{width: '90%', marginTop: '10%', flexDirection: 'row'}}>
                <View style={{width: '30%'}}>
                    <Image
                        source={require('./images/clothing.png')}
                        style={styles.image}
                    ></Image>
                </View>
                <View style={{width: '70%', justifyContent: 'center'}}>
                    <Text style={{fontSize: normalize(22)}}>
                        Order no. #
                    </Text>
                </View>
            </View>

        </View>
    )
}

export default History;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: '40%'
        // justifyContent: 'center'
      },

    image:{
        width: width*0.2,
        height: width*0.2,
      },
})