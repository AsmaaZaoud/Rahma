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

const DateTimeScreen = ({ route, navigation }) => {

    //date and time from confirm (edit) -> amount -> DateTimeScreen (this page)
  
    useEffect(() => {
      if (route.params) {
        // Set selected dates and times from route params if available
        setSelectedDateRange(route.params.date || null);
        console.log('route date from confirm: ', selectedDateRange)
        setSelectedTimeOfDay(route.params.time || null);
        console.log('route date from confirm: ', selectedTimeOfDay)
      } else {
        // If route params are not available, set all checkboxes to unchecked
        setSelectedDateRange(null);
        setSelectedTimeOfDay(null);
      }
    }, [route.params]);

    //value from  previous screen
    const amount = route.params.amount
    console.log('date time screen : ', amount);
    const Routebuilding = route.params.Routebuilding
    console.log('building from amount: ', Routebuilding)
    const Routestreet = route.params.Routestreet
    console.log('street from amount: ', Routestreet)
    const Routezone = route.params.Routezone
    console.log('zone from amount: ', Routezone)

    //todays date
    const currentDate = new Date();
    console.log("NEW DATE: ", currentDate)
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // add 1 to get the correct month (0-indexed)
    const year = currentDate.getFullYear();

    // Format the date as a string
    const dateString = `${day}/${month}/${year}`;

    //first date range
    const first2 = new Date();
    first2.setDate(currentDate.getDate() + 3);
    const first2day = first2.getDate();
    const first2month = first2.getMonth() + 1; // add 1 to get the correct month (0-indexed)
    const first2year = first2.getFullYear();
    const first2date = `${first2day}/${first2month}/${first2year}`;

    //second date range
    const sec1 = new Date();
    sec1.setDate(currentDate.getDate() + 4);
    const sec1day = sec1.getDate();
    const sec1month = sec1.getMonth() + 1;
    const sec1year = sec1.getFullYear();
    const sec1date = `${sec1day}/${sec1month}/${sec1year}`;
  
    const sec2 = new Date();
    sec2.setDate(currentDate.getDate() + 7);
    const sec2day = sec2.getDate();
    const sec2month = sec2.getMonth() + 1;
    const sec2year = sec2.getFullYear();
    const sec2date = `${sec2day}/${sec2month}/${sec2year}`;

    //third date range
    const third1 = new Date();
    third1.setDate(currentDate.getDate() + 8);
    const third1day = third1.getDate();
    const third1month = third1.getMonth() + 1;
    const third1year = third1.getFullYear();
    const third1date = `${third1day}/${third1month}/${third1year}`;
  
    const third2 = new Date();
    third2.setDate(currentDate.getDate() + 11);
    const third2day = third2.getDate();
    const third2month = third2.getMonth() + 1;
    const third2year = third2.getFullYear();
    const third2date = `${third2day}/${third2month}/${third2year}`;

        // Array of time of day options
        const timeOfDayOptions = [
          { label: 'Morning', timeRange: '8AM - 12PM', image: require('./images/Morning.png') },
          { label: 'Afternoon', timeRange: '12PM - 6PM', image: require('./images/Afternoon.png') },
          { label: 'Evening', timeRange: '6PM - 10PM', image: require('./images/Evening.png') },
        ];
        // Array of option values
        const DateRangeOptions = [
          { label: 'option1', value: `${dateString} - ${first2date}`},
          { label: 'option2', value: `${sec1date} - ${sec2date}`},
          { label: 'option3', value: `${third1date} - ${third2date}`},
        ];

    //checkboxes
    const [selectedDateRange, setSelectedDateRange] = useState(null);

    const [selectedTimeOfDay, setSelectedTimeOfDay] = useState(null);

    const handleDateRangeChange = (optionValue) => {
      setSelectedDateRange(optionValue);
      console.log("date value: ", optionValue)
    };

    const handleTimeOfDayChange = (optionValue) => {
      // Set the selected time range based on what was chosen
      setSelectedTimeOfDay(optionValue);
      console.log("time value, :", optionValue)
    };

    const isContinueDisabled = selectedDateRange === null || selectedTimeOfDay === null;

    return (
      <View style={styles.container}>

        {/* progress bar */}
          <View style={styles.bar}>
              <View style={[styles.circle, { backgroundColor: '#19CCA2' }]} />
              <View style={styles.line} />
              <View style={[styles.circle, { backgroundColor: '#19CCA2' }]} />
              <View style={styles.line} />
              <View style={styles.circle} />
              <View style={styles.line} />
              <View style={styles.circle} />
          </View>

          <Text style={{fontWeight: 'bold', fontSize: normalize(22), paddingBottom: '10%'}}>Select a date interval</Text>

        {/* checkboxes + date + calendar images */}

        <View style={styles.dateTimeContainer}> 

          {
            DateRangeOptions.map((option, index) => (
              <View key={index} style={styles.dateBox}>
              <View style={{width: '50%', alignItems: 'flex-start'}}>
              <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => handleDateRangeChange(option.value)}
              >
                <View style={[styles.checkbox, selectedDateRange === option.value && styles.checked]}></View>
                <Text style={{fontSize:normalize(20)}}>{option.value}</Text>
              </TouchableOpacity>
              </View>

              <View style={{width: '50%', alignItems: 'flex-end'}}>
                <Image
                  source={require('./images/calendar.png')}
                  style={styles.image}
                ></Image>
              </View>
              </View>
            ))
          }

        </View>

        {/* time of the day */}

        <Text style={{fontWeight: 'bold', fontSize: normalize(22), paddingBottom: '10%'}}>Select a time interval</Text>
        <View style={styles.dateTimeContainer}>
        {/* Loop through time of day options */}
        {timeOfDayOptions.map((timeOfDay, index) => (
          <View key={index} style={styles.dateBox}>

          <View style={{width: '50%', alignItems: 'flex-start'}}>
          <TouchableOpacity
            key={index}
            style={styles.checkboxContainer}
            onPress={() => handleTimeOfDayChange(timeOfDay.timeRange)}
          >
            <View style={[styles.checkbox, selectedTimeOfDay === timeOfDay.timeRange && styles.checked]} />
            <Text style={{fontSize:normalize(20)}}>
            {timeOfDay.label}
            {"\n"}
            {timeOfDay.timeRange}
            </Text>
          </TouchableOpacity>
          </View>

          <View style={{width: '50%', alignItems: 'flex-end'}}>
            <Image source={timeOfDay.image} style={styles.image} />
          </View>

          </View>
          
        ))}
        </View>

        {/* continue button */}

        <View style={{paddingTop: '10%'}}></View>
        <TouchableOpacity
        style={[styles.button, isContinueDisabled && styles.disabledButton]}
        disabled={isContinueDisabled}
        onPress={() => {
          navigation.navigate('Address', {
            selectedDateRange: selectedDateRange,
            selectedTimeOfDay: selectedTimeOfDay,
            amount: amount,
            Routebuilding: Routebuilding,
            Routestreet: Routestreet,
            Routezone: Routezone
          })
          console.log('DATETIMESCREEN ROUTE PARAMS amount: ', amount);
          console.log('ROUTE PARAMS: ', route.params.amount)
        }}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      </View>
    )
}

export default DateTimeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
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

      //ALL dates & calendar images BOXES
      dateTimeContainer: {
        // paddingTop: '15%',
        width: '90%'
      },

      //date + calendar image BOX
      dateBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },

      //checkbox
      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
      },

      checkbox: {
        width: width >500 ? 50: 25,
        height: width >500 ? 50: 25,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'black',
        marginRight: 10,
      },
      checked: {
        backgroundColor: 'black',
      },

      //calendar image
      image:{
        width: width*0.15,
        height: width*0.15,
      },

      //continue button
      button: {
        backgroundColor: '#19CCA2',
        paddingVertical: "4%",
        borderRadius: 8,
        width: width * 0.75,
      },
      buttonText: {
        color: '#fff',
        fontSize: normalize(20),
        fontWeight: 'bold',
        textAlign: 'center',
      },
      disabledButton: {
        backgroundColor: 'lightgray',
      },
})