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

    const onChangeBuilding = (text) => {

      const bNo = text.replace(/[^\d]/g, '');

      if (bNo === text){
        setBuildingNo(bNo)
        setBuildingNoError('')
      }
      else {
        setBuildingNoError('Building No. must be a number')
      }
    }

    const onChangeStreet = (text) => {

      const SNo = text.replace(/[^\d]/g, '');

      if (SNo === text){
        setStreet(SNo)
        setStreetError('')
      }
      else {
        setStreetError('Street must be a number')
      }
    }

    const onChangeZone = (text) => {
      const ZNo = text.replace(/[^\d]/g, '');

      if (ZNo === '' || (parseInt(ZNo) >= 1 && parseInt(ZNo) <= 98)){
        setZone(ZNo)
        setZoneError('')
      }
      else {
        setZoneError('Zone must be a number between 1 and 98')
      }
    }

    const isContinueDisabled = buildingNo === '' || street === '' || zone === '' || !(parseInt(zone) >= 1 && !parseInt(zone) <= 98);

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
                onChangeText={onChangeBuilding}
                numberOfLines={7}
                value={buildingNo}
                placeholder="Enter building number"
                keyboardType="numeric"
                />
                <Text style={styles.error}>{buildingNoError}</Text>
            
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{alignItems: 'center' , width: '50%'}}>
                  <Text style={styles.adressText}>Street</Text>
                  <TextInput
                  style={styles.input2}
                  onChangeText={onChangeStreet}
                  value={street}
                  placeholder="Enter street number"
                  keyboardType="numeric"
                  />
                  <Text style={styles.error}>{streetError}</Text>
                  </View>
            

                  <View style={{alignItems: 'center', width: '50%'}}>
                    <Text style={styles.adressText}>Zone</Text>
                    <TextInput
                    style={styles.input2}
                    onChangeText={onChangeZone}
                    value={zone}
                    placeholder="Enter zone number"
                    keyboardType="numeric"
                    />
                    <Text style={styles.error}>{zoneError}</Text>
                  </View>

                </View>
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
        backgroundColor: '#021D67',
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
        width: '100%',
        height:width/3
      },

      input2: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 10,
        width: '95%',
        height:width/5
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