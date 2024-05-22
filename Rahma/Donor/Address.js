import React, { useEffect, useState } from "react";
import {
  Button, View, TextInput, StyleSheet, Text, Image, TouchableOpacity,
  Dimensions, PixelRatio, Platform
}
  from 'react-native';
import {
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
  where,
  collection,
} from "firebase/firestore";
import { db, auth } from "../config";

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

// import { useIsFocused } from "@react-navigation/native";

const Address = ({ route, navigation }) => {

  let user = auth?.currentUser?.email;

  // const isFocused = useIsFocused();

  const [donationArray, setDonationArray] = useState([])
  const [buildingNo, setBuildingNo] = useState('');
  const [street, setStreet] = useState('');
  const [zone, setZone] = useState('');
  const [buildingNoError, setBuildingNoError] = useState('');
  const [streetError, setStreetError] = useState('');
  const [zoneError, setZoneError] = useState('');
  const [markB, setMarkB] = useState(null)
  const [markS, setMarkS] = useState(null)
  const [markZ, setMarkZ] = useState(null)

  // confirm (edit) -> amount -> dateTime -> address (this page)
  useEffect(() => {
    if (route.params && route.params.Routebuilding && route.params.Routestreet && route.params.Routezone) {
      // Set input field values from route params if available
      setBuildingNo(route.params.Routebuilding || '');
      setStreet(route.params.Routestreet || '');
      setZone(route.params.Routezone || '');
    } else {
      // If route params are not available, leave input fields empty
      setBuildingNo('');
      setStreet('');
      setZone('');
    }
  }, [route.params]);

  //for this screen

  const onChangeBuilding = (text) => {

    const bNo = text.replace(/[^\d]/g, '');

    if (bNo === text && (parseInt(bNo) >= 1 && parseInt(bNo) <= 9999)) {
      setBuildingNo(bNo)
      setBuildingNoError('')
      setMarkB(null)
    }
    else {
      setBuildingNoError('Building No. must be a number between 1 and 9999')
      setMarkB(require('./images/warning.png'))
    }
  }

  const onChangeStreet = (text) => {

    const SNo = text.replace(/[^\d]/g, '');

    if (SNo === text && (parseInt(SNo) >= 1 && parseInt(SNo) <= 999)) {
      setStreet(SNo)
      setStreetError('')
      setMarkS(null)
    }
    else {
      setStreetError('Street must be a number between 1 and 999')
      setMarkS(require('./images/warning.png'))
    }
  }

  const onChangeZone = (text) => {
    const ZNo = text.replace(/[^\d]/g, '');

    if (ZNo === text && (parseInt(ZNo) >= 1 && parseInt(ZNo) <= 98)) {
      setZone(ZNo)
      setZoneError('')
      setMarkZ(null)
    }
    else {
      setZoneError('Zone must be a number between 1 and 98')
      setMarkZ(require('./images/warning.png'))
    }
  }

  const isContinueDisabled = buildingNo === '' || street === '' || zone === '' || !(parseInt(zone) >= 1 && !parseInt(zone) <= 98);

  return (
    <View style={styles.container}>

      {/* Progress bar */}

      <View style={styles.bar}>
        <View style={[styles.circle, { backgroundColor: '#19CCA2' }]} />
        <View style={styles.line} />
        <View style={[styles.circle, { backgroundColor: '#19CCA2' }]} />
        <View style={styles.line} />
        <View style={[styles.circle, { backgroundColor: '#19CCA2' }]} />
        <View style={styles.line} />
        <View style={styles.circle} />
      </View>

      <Text style={{ fontWeight: 'bold', fontSize: normalize(22), paddingBottom: '10%' }}>Enter your address</Text>

      {/* Address box */}

      <View style={styles.addressBox}>
        <Text style={styles.adressText}>Building No.</Text>
        <TextInput
          style={[styles.input, buildingNoError ? styles.borderError : null]}
          onChangeText={onChangeBuilding}
          numberOfLines={7}
          value={buildingNo}
          placeholder="Enter building number"
          keyboardType="numeric"
        />
        <View style={{ flexDirection: 'row', paddingBottom: '3%' }}>
          <Image
            style={styles.mark}
            source={markB}
          ></Image>
          <Text style={styles.error}>{buildingNoError}</Text>
        </View>

        <View style={{ flexDirection: 'row', width: '100%' }}>
          <View style={{ alignItems: 'center', width: '50%' }}>
            <Text style={styles.adressText}>Street</Text>
            <TextInput
              style={[styles.input2, streetError ? styles.borderError : null]}
              onChangeText={onChangeStreet}
              value={street}
              placeholder="Enter street number"
              keyboardType="numeric"
            />
            <View style={{ flexDirection: 'row', paddingBottom: '3%' }}>
              <Image
                style={styles.mark}
                source={markS}
              ></Image>
              <Text style={[styles.error, { width: '90%' }]}>{streetError}</Text>
            </View>
          </View>

          <View style={{ alignItems: 'center', width: '50%' }}>
            <Text style={[styles.adressText]}>Zone</Text>
            <TextInput
              style={[styles.input2, zoneError ? styles.borderError : null]}
              onChangeText={onChangeZone}
              value={zone}
              placeholder="Enter zone number"
              keyboardType="numeric"
            />
            <View style={{ flexDirection: 'row', paddingBottom: '3%' }}>
              <Image
                style={styles.mark}
                source={markZ}
              ></Image>
              <Text style={styles.error}>{zoneError}</Text>
            </View>
          </View>

        </View>
      </View>

      <View style={{ paddingTop: "30%" }}>
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
                zone: zone,
              }
            )
            console.log("ADDRESS SCREEN : ")
            console.log(
              "date range params: ", route.params.selectedDateRange,
              "time range: ", route.params.selectedTimeOfDay,
              "amount: ", route.params.amount,
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
    height: width / 3
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
    height: width / 5
  },


  error: {
    color: 'white',
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

  borderError: {
    borderColor: 'red',
    borderWidth: 3
  },

  mark: {
    width: 20,
    height: 20,
    marginRight: '3%'
  }
})