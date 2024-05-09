import React, { useEffect, useState } from "react";
import 
{ 
  Button, View, TextInput, StyleSheet, Text, Image, TouchableOpacity, 
  Dimensions, PixelRatio, Platform, ScrollView
} 
from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

//firebase
import {
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
  where,
  collection,
} from "firebase/firestore";
import { db } from "../config";

import { useIsFocused } from "@react-navigation/native";

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

const History = ({route, navigation}) => {

  const [donationArray, setDonationArray] = useState([])

  const isFocused = useIsFocused();    

  const readAll = async () => {
    const docs = await getDocs(collection(db, "donationDetails"));
    docs.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    });

    let temp = [];

    docs.forEach((doc) => {
      temp.push({
        dateRange: doc.data().dateRange,
        timeRange: doc.data().timeRange,
        amount: doc.data().amount,
        buildingNo: doc.data().buildingNo,
        street: doc.data().street,
        zone: doc.data().zone,
        trackID: doc.data().trackID
      })
    })
    setDonationArray(temp)
    }
    
    useEffect(() => {
      if (isFocused) {
        readAll();
      }
    }, [isFocused]);

    console.log("donation array: ", donationArray)

    return (
        <View style={styles.container}>

            <View style={{width: '90%'}}>
            <Text style={{fontSize: normalize(30), fontWeight: 'bold', textDecorationLine: 'underline'}}>
                Your donations
            </Text>
            </View>

           <SafeAreaView style={styles.container}>
           <ScrollView
            showsVerticalScrollIndicator={false}
            // contentContainerStyle={styles.articles}
          >
            <View style={{ width: width * 0.9 }}>
              {donationArray.flat().map((donationItem, index) => (
                <View key={index} style={styles.donationCard}
                >
                  <View style={{width: '30%'}}>
                    <Image
                        source={require('./images/clothing.png')}
                        style={styles.image}
                    ></Image>
                </View>
                <View style={{width: '80%', justifyContent: 'center'}}>
                  <Text style={{fontSize: normalize(22), textDecorationLine: 'underline', fontWeight: 'bold'}}>TrackId : {donationItem.trackID} </Text>
                  <Text style={{fontSize: normalize(20)}}>
                  {"\n"} Amount : {donationItem.amount} {"\n"}
                  Time Range : {donationItem.timeRange} {"\n"}
                  Date Range : {donationItem.dateRange} {"\n"}
                  Building No. : {donationItem.buildingNo} {"\n"}
                  Street : {donationItem.street} {"\n"}
                  Zone : {donationItem.zone} {"\n"}
                  </Text>
                  </View>
                  </View>
                  
              ))}
            </View>
            
          </ScrollView>
           </SafeAreaView>

        </View>
    )
}

export default History;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: '20%'
        // justifyContent: 'center'
      },

    image:{
        width: width*0.2,
        height: width*0.2,
      },

    donationCard: {
      width: '100%', 
      paddingTop: '5%', 
      flexDirection: 'row',
      // borderWidth: 4,
      borderColor: '#009c78',
      // borderRadius: 20,
      marginBottom: '5%',
      // backgroundColor: '#8ebef5'
      borderBottomWidth: 3
    }
})