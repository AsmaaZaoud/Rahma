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
import { Block } from "galio-framework";


import {
  Feather,
  FontAwesome,
  Ionicons,
  EvilIcons
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
    try {
      if (type === "deliv") {
        setType("deliv");
        if (orders.length > 0) {
          setOrders(
            orders.filter(
              (x) => x.data.type === "deliver" && x.data.status === "pending"
            )
          );
        } else {
          setType("pick"); // Set the type back to "pick" when orders array is empty
        }
      } else {
        setType("pick");
        if (orders.length > 0) {
          setOrders(
            orders.filter(
              (x) => x.data.type === "pickup" && x.data.status === "pending"
            )
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  const map = async (lat, long, userId, type) => {
    console.log(type);
    
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${lat},${long}`
    );
  };


  return (
    <View  style={{
      backgroundColor: "white",
      height:height*0.9, 
    }}>
   
      <Block style={styles.nav}>
        <Pressable 
        // onPress={() => change("pick")}
        >
          <Text style={type == "pick" ? styles.selected : styles.unselected}>
            Pickup
          </Text>
        </Pressable>

        <Text style={styles.unselected}>|</Text>
        <Pressable 
        // onPress={() => change("deliv")}
        >
          <Text style={type == "deliv" ? styles.selected : styles.unselected}>
            Deliver
          </Text>
        </Pressable>
      </Block>
      <SafeAreaView style={{ height: "85%", width: width }}>
        <ScrollView>
          <View style={styles.home}>
            {orders.length > 0 ? (
              console.log(orders.length) &&
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
                      <Feather
                        name="user"
                        size={50}
                        // color="#fffff"
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
                        <EvilIcons
                          name="calendar"
                          size={45}
                          // color="#fffff"
                        />
                        <Text style={styles.dataTitles}>{x.data.date}</Text>
                      </View>
                      <View style={[styles.dataView, { flexDirection: "row" }]}>
                        <Ionicons
                          name="time-outline"
                          size={35}
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
                          size={37}
                          // color="#fffff"
                        />
                        <Text style={styles.dataTitles}>{x.data.location}</Text>
                      </View>
                      <View style={[styles.dataView, { flexDirection: "row" }]}>
                        <Ionicons
                          name="map-outline"
                          size={35}
                          // color="#fffff"
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
                          Open
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
    // backgroundColor: "#1BDDAF",
    marginTop: "7%",
  },
  comp: {
    //width: width,
    // height: height * 0.2,
    backgroundColor: "white",
  },
  nav: {
    marginVertical: "5%",
    marginHorizontal: width * 0.25,
    width: width * 0.5,
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
    color: "#4169E1",
    fontSize: normalize(19),
    fontWeight: "bold",
  },
  home: {
    marginHorizontal: "5%",
    height: height,
  },
  card: {
    marginVertical: "2%",
    padding: "5%",
    borderWidth: 1,
    borderColor: "#cbc",
    borderRadius: 20,
  },
  cardTitle: {
    fontSize: normalize(20),
    marginBottom: "6%",
    // color:"#fffff"
  },
  userCard: {
    borderWidth: 1,
    borderColor: "lightgrey",
    // margin: "1%",
    borderRadius: 15,
    flexDirection: "row",
    padding: "5%",
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
    backgroundColor: "#4169E1",
    borderRadius: 10,
    width: width * 0.4,
    margin: "6%",
  },
  pickupButton: {
    textAlign: "center",
    fontSize: normalize(20),
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