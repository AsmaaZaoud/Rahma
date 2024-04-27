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

const DateTimeScreen = () => {

    //todays date
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // add 1 to get the correct month (0-indexed)
    const year = currentDate.getFullYear();
    console.log("currentdate: ", currentDate);

    // Format the date as a string
    const dateString = `${day}/${month}/${year}`;
    console.log("date string: ", dateString);

    //first date range
    const first2 = new Date();
    first2.setDate(currentDate.getDate() + 3);
    console.log("first2", first2);
    const first2day = first2.getDate();
    const first2month = first2.getMonth() + 1; // add 1 to get the correct month (0-indexed)
    const first2year = first2.getFullYear();
    const first2date = `${first2day}/${first2month}/${first2year}`;
    console.log("first2date: ", first2date);

    //second date range
    const sec1 = new Date();
    sec1.setDate(currentDate.getDate() + 4);
    const sec1day = sec1.getDate();
    const sec1month = sec1.getMonth() + 1;
    const sec1year = sec1.getFullYear();
    const sec1date = `${sec1day}/${sec1month}/${sec1year}`;
    console.log("sec1date: ", sec1date);
  
    const sec2 = new Date();
    sec2.setDate(currentDate.getDate() + 7);
    const sec2day = sec2.getDate();
    const sec2month = sec2.getMonth() + 1;
    const sec2year = sec2.getFullYear();
    const sec2date = `${sec2day}/${sec2month}/${sec2year}`;
    console.log("sec2date: ", sec2date);

    //third date range
    const third1 = new Date();
    third1.setDate(currentDate.getDate() + 8);
    const third1day = third1.getDate();
    const third1month = third1.getMonth() + 1;
    const third1year = third1.getFullYear();
    const third1date = `${third1day}/${third1month}/${third1year}`;
    console.log("third1date: ", third1date);
  
    const third2 = new Date();
    third2.setDate(currentDate.getDate() + 11);
    const third2day = third2.getDate();
    const third2month = third2.getMonth() + 1;
    const third2year = third2.getFullYear();
    const third2date = `${third2day}/${third2month}/${third2year}`;
    console.log("third2date: ", third2date);

    //checkboxes
    const [selectedDateRange, setSelectedDateRange] = useState(null);
    const [selectedTimeOfDay, setSelectedTimeOfDay] = useState(null);

    const handleDateRangeChange = (optionValue) => {
      setSelectedDateRange(optionValue);
    };

    const handleTimeOfDayChange = (optionValue) => {
      setSelectedTimeOfDay(optionValue);
    };

    const isContinueDisabled = selectedDateRange === null || selectedTimeOfDay === null;

    // Array of time of day options
    const timeOfDayOptions = [
      { label: 'Morning', timeRange: '8AM - 12PM' },
      { label: 'Afternoon', timeRange: '12PM - 6PM' },
      { label: 'Evening', timeRange: '6PM - 10PM' },
    ];
    // Array of option values
    const DateRangeOptions = [
      { label: 'option1', value: `${dateString} - ${first2date}`},
      { label: 'option2', value: `${sec1date} - ${sec2date}`},
      { label: 'option3', value: `${third1date} - ${third2date}`},
    ];


    return (
      <View style={styles.container}>

        {/* progress bar */}

        <Text style={{fontWeight: 'bold', fontSize: normalize(22)}}>Select a date interval</Text>
          <View style={styles.bar}>
              <View style={[styles.circle, { backgroundColor: '#19CCA2' }]} />
              <View style={styles.line} />
              <View style={[styles.circle, { backgroundColor: '#19CCA2' }]} />
              <View style={styles.line} />
              <View style={styles.circle} />
              <View style={styles.line} />
              <View style={styles.circle} />
              <View style={styles.line} />
              <View style={styles.circle} />
          </View>

        {/* checkboxes + date + calendar images */}

        <View style={styles.dateImage}> 

          {
            DateRangeOptions.map((option, index) => (
              <View key={index} style={styles.dateBox}>

              {/* {console.log('index: ' , index)} */}
              <View style={{width: '50%', alignItems: 'flex-start'}}>
              <TouchableOpacity
              // key={index}
              style={styles.checkboxContainer}
              onPress={() => handleDateRangeChange(option.label)}
              >
                <View style={[styles.checkbox, selectedDateRange === option.label && styles.checked]}></View>
                <Text style={styles.dateText}>{option.value}</Text>
              </TouchableOpacity>
              </View>

              <View style={{width: '50%', alignItems: 'flex-end'}}>
                <Image
                  source={require('./images/calendar.jpg')}
                  style={styles.image}
                ></Image>
              </View>

              </View>
            ))
          }

          {/* <View style={styles.dateBox}>
          <View style={{width: '50%', alignItems: 'flex-start'}}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => handleOptionChange('option1')}
          >
            <View style={[styles.checkbox, selectedOption === 'option1' && styles.checked]} />
            <Text style={styles.dateText}>{dateString} - {first2date}</Text>
          </TouchableOpacity>
          </View>

          <View style={{width: '50%', alignItems: 'flex-end'}}>
          <Image
            source={require('./images/calendar.jpg')}
            style={styles.image}
          ></Image>
          </View>
          </View> */}

          {/* <View style={styles.dateBox}>
          <View style={{width: '50%', alignItems: 'flex-start'}}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => handleOptionChange('option2')}
          >
            <View style={[styles.checkbox, selectedOption === 'option2' && styles.checked]} />
            <Text>{sec1date} - {sec2date}</Text>
          </TouchableOpacity>
          </View>

          <View style={{width: '50%', alignItems: 'flex-end'}}>
          <Image
            source={require('./images/calendar.jpg')}
            style={styles.image}
          ></Image>
          </View>
          </View>

          <View style={styles.dateBox}>
          <View style={{width: '50%', alignItems: 'flex-start'}}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => handleOptionChange('option3')}
          >
            <View style={[styles.checkbox, selectedOption === 'option3' && styles.checked]} />
            <Text>{third1date} - {third2date}</Text>
          </TouchableOpacity>
          </View>

          <View style={{width: '50%', alignItems: 'flex-end'}}>
          <Image
            source={require('./images/calendar.jpg')}
            style={styles.image}
          ></Image>
          </View>
          </View> */}

        </View>

        {/* continue button */}

        <View style={{paddingTop: '15%'}}></View>
        <TouchableOpacity
        style={[styles.button, isContinueDisabled && styles.disabledButton]}
        disabled={isContinueDisabled}
        onPress={() => {
          // Handle continue button press
          console.log('Continue button pressed');
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
      // paddingTop: '25%',
      justifyContent: 'center'
    },

    //progress bar
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '10%',
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
      dateImage: {
        paddingTop: '15%',
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
        width: 20,
        height: 20,
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
        width: width*0.2,
        height: width*0.2,
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