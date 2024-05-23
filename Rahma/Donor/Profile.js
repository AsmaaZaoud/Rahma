import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TextInput,
  Modal,
  TouchableOpacity,
  View,
  Alert,
  Pressable,
  Text
} from "react-native";
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

//icon
import Icon from 'react-native-vector-icons/AntDesign';

//responsiveness
const { width, height } = Dimensions.get("screen");

const Profile = ({ route, navigation }) => {

  let user = auth?.currentUser?.email;

  const isFocused = useIsFocused();

  const [userName, setUserName] = useState('')
  const [zone, setZone] = useState(null)
  const [street, setStreet] = useState(null)
  const [building, setBuilding] = useState(null)

  useEffect(() => {
    if (isFocused) {
      readAllWhere()
    }
  }, [isFocused]);


  const readAllWhere = async () => {
    const q = query(collection(db, "donors"), where("email", "==", user));
    const docs = await getDocs(q);
    docs.forEach((doc) => {
    setUserName(doc.data().userName)
    setBuilding(doc.data().buildingNo)
    setStreet(doc.data().street)
    setZone(doc.data().zone)
    });
    } 

  const update = async () => {
    let user = auth?.currentUser?.email;
    const docRef = doc(db, "donors", user);
    await setDoc(
      docRef,
      {
        userName: userName,
        zone: zone,
        street: street,
        buildingNo: building
      },
      { merge: true }
    )
      .then(() => {
        console.log("data updated");
        Alert.alert("Your new profile information has been updated.");
      })
      .catch((error) => {
        console.log("ERROR: ", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{ paddingTop: '30%', fontSize: 22, fontWeight: 'bold' }}>Hello, {userName}!</Text>
      <Text style={{ paddingTop: '5%', fontSize: 18 }}>{user}</Text>
      <View style={{paddingTop: '10%' }}>
        <Text style={{marginLeft: '2%'}}>Username</Text>
        <View width={width*0.8}>
        <TextInput
          style={styles.input}
          borderless
          value={userName}
          onChangeText={setUserName}
          autoCapitalize="words"
          placeholder="Enter Username"
        />
        <Text style={styles.inputText}>Building No.</Text>
        <TextInput
          style={styles.input}
          borderless
          keyboardType="numeric"
          value={building}
          onChangeText={setBuilding}
          placeholder="Enter Building No."
        />
        <Text style={styles.inputText}>Street</Text>
        <TextInput
          style={styles.input}
          borderless
          keyboardType="numeric"
          value={street}
          onChangeText={setStreet}
          placeholder="Enter Street"
        />
        <Text style={styles.inputText}>Zone</Text>
        <TextInput
          style={styles.input}
          borderless
          keyboardType="numeric"
          value={zone}
          onChangeText={setZone}
          placeholder="Enter Zone"
        />
        </View>

        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={update}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "purple",
    margin: 15,
    alignContent: 'flex-start'
  },
  inputText: {
    marginLeft: '2%',
    paddingTop: '5%'
  },
  button: {
    backgroundColor: '#19CCA2',
    paddingVertical: "4%",
    borderRadius: 8,
    width: width * 0.75,
    marginTop: '10%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});