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

//firebase keep
import { db } from "../config";
import { addDoc, collection } from "firebase/firestore";

const Confirm = ({route, navigation}) => {

  let trackId = Math.floor(Math.random() * 10000);

    const add = async () => {
      const docRef = await addDoc(collection(db, "donationDetails"), {
        dateRange: route.params.selectedDateRange,
        timeRange: route.params.selectedTimeOfDay,
        amount: route.params.amount,
        buildingNo: route.params.buildingNo,
        street: route.params.street,
        zone: route.params.zone,
        trackID: trackId
      });
      console.log("Document written with ID: ", docRef.id);
    };

    return (
        <View style={styles.container}>
            <View style={styles.bar}>
              <View style={[styles.circle, { backgroundColor: '#19CCA2' }]} />
              <View style={styles.line} />
              <View style={[styles.circle, { backgroundColor: '#19CCA2' }]} />
              <View style={styles.line} />
              <View style={[styles.circle, { backgroundColor: '#19CCA2' }]} />
              <View style={styles.line} />
              <View style={[styles.circle, { backgroundColor: '#19CCA2' }]} />
          </View>

          <Text style={{fontWeight: 'bold', fontSize: normalize(22), paddingBottom: '10%', textDecorationLine: 'underline'}}>Review Instant Request</Text>

          <View style={styles.DateTimeBox}>
            <View style={styles.date}>
                <Text style={styles.text}>When</Text>
                <View style={{paddingTop: '10%'}}></View>
                <Image
                  source={require('./images/schedule.png')}
                  style={styles.image}
                ></Image>
                    <View style={{marginTop: '5%'}}>
                    <Text style={{fontSize: normalize(18)}}>Date Range: {"\n"}{route.params.selectedDateRange}</Text>
                    <Text style={{fontSize: normalize(18)}}>Time Range: {"\n"}{route.params.selectedTimeOfDay}</Text>
                    </View>
            </View>

            <View style={styles.amount}>
                <Text style={styles.text}>Amount</Text>
                <View style={{paddingTop: '10%'}}></View>
                <Image
                  source={require('./images/clothing.png')}
                  style={styles.image}
                ></Image>
                <View style={{marginTop: '5%'}}></View>
                <Text style={{fontSize: normalize(18)}}>{route.params.amount} boxes/bags</Text>
            </View>
          </View>

          <View style={styles.locationBox}>
            <Text style={styles.text}>Location</Text>
            {/* <View style={{paddingTop: '10%'}}></View> */}
            <Image
                source={require('./images/map.png')}
                style={styles.image}
            ></Image>
            <Text style={{fontSize: normalize(18)}}>
                Building: {route.params.buildingNo} {" "}
                Street: {route.params.street} {" "}
                Zone: {route.params.zone}
            </Text>
          </View>

          <View style={{paddingTop: "15%", flexDirection: 'row', width: '90%', alignItems: 'center'}}>
          
          <View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#227ADE' }]}
            onPress={() =>
              // navigation.goBack()
              navigation.navigate('Amount', {
                amount: route.params.amount,
              } )
            }
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              add();
              navigation.navigate('Done');
            }}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>

        </View>

        </View>
    )
}

export default Confirm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // paddingTop: '25%',
        justifyContent: 'center'
      },
  
      //progress bar
      bar: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: '10%',
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

        DateTimeBox: {
            width: '90%',
            flexDirection: 'row',
            // borderWidth: 1,
            // borderColor: 'red'
        },

        date: {
            width: '50%',
            alignItems: 'center',
        },

        amount: {
            width: '50%',
            alignItems: 'center',
        },

        text :{
            fontSize: normalize (22),
            fontWeight: 'bold'
        },

        image:{
            width: width*0.15,
            height: width*0.15,
          },

        locationBox: {
            // borderWidth: 1,
            // borderColor: 'green',
            marginTop: '10%',
            alignItems: 'center'
        },

        button: {
            backgroundColor: '#19CCA2',
            paddingVertical: "6%",
            borderRadius: 8,
            width: width * 0.4,
            marginHorizontal: '4%'
          },
          buttonText: {
            color: '#fff',
            fontSize: normalize(20),
            fontWeight: 'bold',
            textAlign: 'center',
          },
})
