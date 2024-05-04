import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  Platform,
  PixelRatio,
  ScrollView,
  Text,
  View,
  Image,
  Pressable,
  Linking,
  SafeAreaView,
} from "react-native";
import { Block, theme } from "galio-framework";
// import { Feather } from "@expo/vector-icons";
// //Firebase
// import { auth, db } from "../../config";
// import {
//   doc,
//   query,
//   collection,
//   onSnapshot,
//   setDoc,
//   addDoc,
// } from "firebase/firestore";
// import * as Notifications from "expo-notifications";

import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "react-native-vector-icons";

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

const DriverHome = (props) => {
  const [deviceType, setDeviceType] = useState("");
  useEffect(() => {
    width < 500 ? setDeviceType("mobile") : setDeviceType("ipad");
  }, []);
  
  const [orders, setOrders] = useState( [
    {num:20,data:{userName:"Asmaa", phome:55009900, userId:"asma@asma.com", date:"20-2-2024", timeSlot:"12:23", location:"Doha", lat:23940596, long:373663738, type:"pickup", status:"pending"}},
    {num:10,data:{userName:"Sara", phome:66776677, userId:"sara@ss.com", date:"27-7-2024", timeSlot:"12:03", location:"Alkhor", lat:23940596, long:373663738, type:"deliver", status:"pending"}}
  
  ])

  const [type, setType] = useState("pick");

  const change = (type) => {
    console.log("changeeee", orders.length);
    if (type == "deliv") {
      setType("deliv");

      setOrders(
        orders.filter(
          (x) => x.data.type == "deliver" && x.data.status == "pending"
        )
      );
    } else {
      setType("pick");
      setOrders(
        orders.filter(
          (x) => x.data.type == "pickup" && x.data.status == "pending"
        )
      );
    }
  };


  return (
    <View>
       <View
        style={{
          backgroundColor: "#3C4DBD",
          width: width,
          height: height * 0.1,
        }}
      >
        <View style={styles.topl}>
          <Image
            source={require("../assets/white.png")}
            style={{ width: 150, height: 50 }}
            width={width * 0.35}
            height={height * 0.062}
          />
          <Pressable >
            <Feather
              name="log-out"
              size={deviceType == "mobile" ? 35 : 45}
              color="white"
            />
          </Pressable>
        </View>
      </View>



      <Block style={styles.nav}>
        <Pressable onPress={() => change("pick")}>
          <Text style={type == "pick" ? styles.selected : styles.unselected}>
            Pickup
          </Text>
        </Pressable>

        <Text style={styles.unselected}>|</Text>
        <Pressable onPress={() => change("deliv")}>
          <Text style={type == "deliv" ? styles.selected : styles.unselected}>
            Deliver
          </Text>
        </Pressable>
      </Block>
      <SafeAreaView style={{ height: "85%", width: width }}>
        <ScrollView>
          <View style={styles.home}>
            {orders.length != 0 ? (
              orders.map((x, i) =>
                x != undefined ? (
                  <View key={i + 2} style={styles.card}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.cardTitle}>Order No</Text>

                      <Text style={styles.cardTitle}>#{x.num}</Text>
                    </View>
                    <View style={styles.userCard}>
                      <FontAwesome
                        name="user-circle-o"
                        size={50}
                        color="#1a1f87"
                      />
                      <View style={{ marginLeft: 10 }}>
                        <Text
                          style={{
                            fontSize: normalize(15),
                            fontWeight: "bold",
                          }}
                        >
                          Name
                        </Text>
                        <Text
                          style={{
                            fontSize: normalize(15),
                            fontWeight: "bold",
                          }}
                        >
                          Phone
                        </Text>
                        <Text
                          style={{
                            fontSize: normalize(15),
                            fontWeight: "bold",
                          }}
                        >
                          Email
                        </Text>
                      </View>
                      <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: normalize(15) }}>
                          {x.data.userName}
                        </Text>
                        <Text style={{ fontSize: normalize(15) }}>
                          {x.data.phone}
                        </Text>
                        <Text style={{ fontSize: normalize(15) }}>
                          {x.data.userId}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 15,
                      }}
                    >
                      <View style={[styles.dataView, { flexDirection: "row" }]}>
                        <Ionicons
                          name="today"
                          size={30}
                          color="#3C4DBD"
                        />
                        <Text style={styles.dataTitles}>{x.data.date}</Text>
                      </View>
                      <View style={[styles.dataView, { flexDirection: "row" }]}>
                        <Ionicons
                          name="time-outline"
                          size={30}
                          color="#3C4DBD"
                        />
                        <Text style={styles.dataTitles}>{x.data.timeSlot}</Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 15,
                      }}
                    >
                      <View style={[styles.dataView, { flexDirection: "row" }]}>
                        <Ionicons
                          name="location-outline"
                          size={30}
                          color="#3C4DBD"
                        />
                        <Text style={styles.dataTitles}>{x.data.location}</Text>
                      </View>
                      <View style={[styles.dataView, { flexDirection: "row" }]}>
                        <Ionicons
                          name="map-outline"
                          size={30}
                          color="#3C4DBD"
                        />
                        <Text
                          style={[
                            styles.dataTitles,
                            { textDecorationLine: "underline", color: "blue" },
                          ]}
                          onPress={() =>
                            map(
                              x.data.lat,
                              x.data.long,
                              x.data.userId,
                              x.data.type
                            )
                          }
                        >
                          Open Map
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Pressable
                        onPress={() =>
                          navigation.navigate("OrderDetails", {
                            id: x.id,
                            userName: x.data.userName,
                            phone: x.data.phone,
                            zone: x.data.location,
                          })
                        }
                        style={styles.pickupButtonContainer}
                      >
                        {type == "pick" ? (
                          <Text style={styles.pickupButton}>Pick</Text>
                        ) : (
                          <Text style={styles.pickupButton}>Drop</Text>
                        )}
                      </Pressable>
                      {/* <Pressable style={styles.cancelButtonContainer}>
            <Text style={styles.cancelButton}>c</Text>
          </Pressable> */}
                    </View>
                  </View>
                ) : null
              )
            ) : (
              <Text style={styles.noOrder}> No Orders yet</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
    // </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  topl: {
    width: width * 0.97,
    padding: "4%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#3C4DBD",
    marginTop: "3%",
  },
  comp: {
    //width: width,
    // height: height * 0.2,
    backgroundColor: "white",
  },
  nav: {
    marginVertical: "7%",
    marginHorizontal: "19%",
    width: width * 0.6,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  noOrder: {
    fontSize: normalize(25),
    marginTop: "50%",
    marginLeft: "25%",
  },
  unselected: {
    fontSize: normalize(19),
  },
  selected: {
    color: "#3C4DBD",
    fontSize: normalize(19),
    fontWeight: "bold",
  },
  home: {
    marginHorizontal: "10%",
    height: height,
  },
  card: {
    marginVertical: "2%",
    padding: "7%",
    borderWidth: 1,
    borderColor: "#cbc",
    borderRadius: 20,
  },
  cardTitle: {
    fontSize: normalize(20),
    marginBottom: "6%",
    // color:"#3C4DBD"
  },
  userCard: {
    borderWidth: 1,
    borderColor: "lightgrey",
    margin: "2%",
    borderRadius: 15,
    flexDirection: "row",
    padding: "3%",
    marginBottom: "9%",
    shadowColor: "#666",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.49,
    elevation: 2,
  },

  dataView: {
    marginBottom: "10%",
  },
  dataTitles: {
    fontSize: normalize(19),
    // color: '#999',
    marginTop: "2%",
    marginLeft: "5%",
  },
  pickupButtonContainer: {
    backgroundColor: "#1a1f87",
    borderRadius: 35,
    width: width * 0.4,
    margin: "6%",
  },
  pickupButton: {
    textAlign: "center",
    fontSize: normalize(15),
    color: "#fff",
    padding: "7%",
  },

  cancelButtonContainer: {
    backgroundColor: "lightgrey",
    color: "black",
    textAlign: "center",
  },

  cancelButton: {
    color: "black",
    textAlign: "center",
    fontSize: normalize(15),
    padding: "7%",
  },
});

export default DriverHome;