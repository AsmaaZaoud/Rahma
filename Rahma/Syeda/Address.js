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

//diable button functionality
// const isDisabled = value === '' || !(parseInt(value) >= 1 && parseInt(value) <= 5);

const Address = ({route, navigation}) => {

    const [buildingNo, setBuildingNo] = useState('');
    const [street, setStreet] = useState('');
    const [zone, setZone] = useState('');
    const [buildingNoError, setBuildingNoError] = useState('');
    const [streetError, setStreetError] = useState('');
    const [zoneError, setZoneError] = useState('');
    const [isContinueDisabled, setIsContinueDisabled] = useState(true);
    
    const validateForm = () => {

        let valid = true;
    
        if (!buildingNo || isNaN(buildingNo)) {
          setBuildingNoError('Building No. must be a number');
          valid = false;
        } else {
          setBuildingNoError('');
        }
    
        if (!street || isNaN(street)) {
          setStreetError('Street must be a number');
          valid = false;
        } else {
          setStreetError('');
        }
    
        const zoneNumber = parseInt(zone);
        if (!zone || isNaN(zoneNumber) || zoneNumber < 1 || zoneNumber > 98) {
          setZoneError('Zone must be a number between 1 and 98');
          valid = false;
        } else {
          setZoneError('');
        }
    
        setIsContinueDisabled(!valid);
      };

    return (
        <View style={styles.container}>

        {/* progress bar */}
          <View style={styles.bar}>
              <View style={[styles.circle, { backgroundColor: '#19CCA2' }]} />
              <View style={styles.line} />
              <View style={[styles.circle, { backgroundColor: '#19CCA2' }]} />
              <View style={styles.line} />
              <View style={[styles.circle, { backgroundColor: '#19CCA2' }]} />
              <View style={styles.line} />
              <View style={styles.circle} />
          </View>

          <Text style={{fontWeight: 'bold', fontSize: normalize(22), paddingBottom: '10%'}}>Enter your address</Text>

          {/* Adress box */}

          <View style={styles.addressBox}>
                <Text style={styles.adressText}>Building No.</Text>
                <TextInput
                style={styles.input}
                onChangeText={setBuildingNo}
                value={buildingNo}
                placeholder="Enter building number"
                keyboardType="numeric"
                onBlur={validateForm}
                />
                <Text style={styles.error}>{buildingNoError}</Text>
            

                <Text style={styles.adressText}>Street</Text>
                <TextInput
                style={styles.input}
                onChangeText={setStreet}
                value={street}
                placeholder="Enter zone number"
                keyboardType="numeric"
                onBlur={validateForm}
                />
                <Text style={styles.error}>{streetError}</Text>
            

                <Text style={styles.adressText}>Zone</Text>
                <TextInput
                style={styles.input}
                onChangeText={setZone}
                value={zone}
                placeholder="Enter street number"
                keyboardType="numeric"
                onBlur={validateForm}
                />
                <Text style={styles.error}>{zoneError}</Text>
          </View>

          <View style={{paddingTop: "30%"}}>
          <TouchableOpacity
            style={[styles.button, isContinueDisabled ? styles.disabledButton : styles.enabledButton]}
            disabled={isContinueDisabled}
            onPress={() => {
              navigation.navigate('Confirm', 
              {
                selectedDateRange: route.params.selectedDateRange,
                selectedTimeOfDay: route.params.selectedTimeOfDay,
                amount: route.params.amount,
                buildingNo: buildingNo,
                street: street,
                zone: zone
              }
            )
            console.log("ADDRESS SCREEN : ")
            console.log(
              "date range params: ", route.params.selectedDateRange,
              "time range: ", route.params.selectedTimeOfDay,
              "amount: ",  route.params.amount,
            )
            }}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>


        </View>
    )
}

export default Address;

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

      addressBox: {
        width: '90%',
        alignItems: 'center',
        backgroundColor: '#227ADE',
        borderRadius: 15,
        padding: '5%'
      },

      adressText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: normalize(20),
        paddingBottom: '3%'
      },

      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '80%',
      },
      error: {
        color: 'red',
      },

      button: {
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
    })