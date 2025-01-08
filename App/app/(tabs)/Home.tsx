import { Link } from "expo-router";
import { Text, View, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import * as NavigationBar from 'expo-navigation-bar';
import React from "react";
import "./test"

const Line = require("../../assets/images/Line1.png")
const AUD = require("../../assets/images/AUD.png")
const CHF = require("../../assets/images/CHF.png")
const CNY = require("../../assets/images/CNY.png")
const EUR = require("../../assets/images/EUR.png")
const GBP = require("../../assets/images/GBP.png")
const JPY = require("../../assets/images/JPY.png")
const NZD = require("../../assets/images/NZD.png")
const USD = require("../../assets/images/USD.png")

const pic1 = "JPY"
const pic2 = "USD"

export default function Index() {

  // This creates a custom component called <Custom/> that we can reuse. It renders everything after return
  // Helps avoid long messy duplicated code. See "Component-Explanation.txt" for your notes on this.
  function CustomComponent() {
    return <Text>custom content</Text>
  }

  function TopCurrencyPairComp() {
      return (
          <View>
              <View style={styles.SquareContainer}>
                  <View style={styles.images}>
                      <Image style={[styles.img, {borderTopLeftRadius:8,borderBottomLeftRadius:8}]} source={require(`../../assets/images/${pic1}.png`)} /> 
                      <Image style={[styles.img, {borderTopRightRadius:8,borderBottomRightRadius:8}]} source={require(`../../assets/images/${pic2}.png`)} />
                      <Text style={styles.leftCurrency}>JPY</Text>
                      <Text style={styles.rightCurrency}>USD</Text>
                  </View>
              </View>
          </View>
      );
  }

  // placeholder values until I fetch the data.
  let event_name = "German Bank Holiday"
  let currency = "EUR"
  let impact = "Non-Economic"
  let time = "All Day"
  const items = [];

  let counter = 0
  let num_events = 6
  // Forloop that will be linked to the number of events in fetched data.
  // Not sure why but the comparitor against the array length must be 4x the number of events for the day.
  // Every iteration the loop appends information about that event to the list.
  for (counter = 0; items.length < num_events*4; counter++ ){
    items.push(event_name)
    items.push(currency)
    items.push(impact)
    items.push(time)
  }

  useEffect(() => {
    // Set the system navigation bar background color to match the app's background color
    NavigationBar.setBackgroundColorAsync('white'); // Replace with your background color
    NavigationBar.setButtonStyleAsync('dark'); // Set light buttons for visibility

    return () => {
      // Reset to default when leaving the screen
      NavigationBar.setBackgroundColorAsync('transparent'); // Reset system nav bar to default
      NavigationBar.setButtonStyleAsync('dark'); // Reset button style to default
    };
  }, []);

  return (
    <View id="container"
        style={styles.container}
    >
      <View style={styles.userTextContainer}>
        <Text style={styles.userText}>Hi, Ishmam.</Text>
        <Text style={styles.userSubText}>Welcome back!</Text>
        <Text style={styles.currencyHeader}>Currencies you're watching</Text>
          <View style={styles.SquareComponent}>
            <TopCurrencyPairComp/>
          </View>
         <Text style={{fontWeight:"500"}}>Today's Forecast: </Text> 
        {/* <Image source={Line} style={{width:"auto",height:1,marginRight:16,marginLeft:1}}/> */}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth:"auto",
    width:"auto",
    height:30,
    backgroundColor:"white",
    flex:1
  },
  userTextContainer: {
    flex:1,
    maxWidth:"auto",
    justifyContent:"flex-start",
    paddingLeft:15,
    paddingTop:19,
  },
  userText: {
    color:"#393939",
    fontSize:24,
    fontFamily:"sans-serif-thai"
  },
  userSubText: {
    paddingTop:4,
    color:"#6C6C6C",
    fontSize:15,
    fontWeight:"regular",
    fontFamily:"sans-serif-thai",
    paddingBottom:10
  },
  currencyHeader: {
    paddingTop:10,
    color:"black",
    fontSize:15,
    fontWeight:"condensed",
    fontFamily:"sans-serif-thai"
  },
  Links: {
    textDecorationLine: "underline",
    color: "blue"
  },
  SquareComponent: {
    paddingTop:10,
    paddingBottom:30,
    maxWidth:"96%"
  },
  SquareContainer: {
    width:"auto",
    height:"auto",
    position:"relative",
    textAlign:"center",
    paddingBottom:30

},
images: {
    display:"flex",
    flexWrap:"wrap",
    flexDirection:"row",
    gap:3,
},
img: {
    flexGrow:1,
    width:132,
    height:170,
    objectFit:"cover",
},
leftCurrency: {
    position:"absolute",
    fontSize:55,
    fontWeight:"500",
    color:"white",
    top:"23%",
    left:"10%"
},
rightCurrency: {
    position:"absolute",
    fontSize:55,
    fontWeight:"500",
    color:"white",
    top:"23%",
    left:"60%"
} 
})
