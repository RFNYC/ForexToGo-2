import { router, useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, } from "react-native";
import React, { useEffect, useState } from "react";
import * as NavigationBar from 'expo-navigation-bar';
import { ImageBackground } from "react-native";

const backgroundImage = require("../../assets/images/frame-1.jpg")

export default function Page1() {

  const {id, id2} = useLocalSearchParams();  // Accessing params directly

  const [userName, changePlaceholder] = useState("First name")
  const [prefPair, changePair] = useState("Ex: GBP/JPY")
  const [nextPage, changeNextPage] = useState("Home")

  //Possible currencies that can be entered...
  const currencies = ['AUD','CAD','CHF','CNY','EUR','GBP','JPY','NZD','USD']
  let properName;
  let properCurrencies;

  // Creates variable to be passed by router.
  let myInfo: (string | string[])[] = [];
  let myCurrencies = [];
  // Edits variable based on user Input.
  function finishedTypingUser() {
    myInfo.push(userName)
    // If user submitted preview text or blank space they will not be routed further.
    return console.log(myInfo)
  }

  function finishedTypingPair() {

    console.log(prefPair.toUpperCase())
    let input = prefPair.toUpperCase()
    let prefferedCurrencies = input.split("/")
    myCurrencies = prefferedCurrencies

    myInfo.push(prefferedCurrencies)

    return (
      console.log(myInfo)
    ) 
  }

  console.log(myInfo)

  useEffect(() => {
    // Set the system navigation bar background color to match the app's background color
    NavigationBar.setBackgroundColorAsync('#042547'); // Replace with your background color
    NavigationBar.setButtonStyleAsync('light'); // Set light buttons for visibility

    return () => {
      // Reset to default when leaving the screen
      NavigationBar.setBackgroundColorAsync('transparent'); // Reset system nav bar to default
      NavigationBar.setButtonStyleAsync('light'); // Reset button style to default
    };
  }, []);



  return (
    <ImageBackground 
    source={backgroundImage} style={styles.container}>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
            <View style={styles.nameheader}>
                <Text style={{color:"white", fontSize:37, fontWeight:"bold", textAlign:"center"}}>What's your{"\n"} name?</Text>
            </View>

            <Text style={{textAlign:"center",fontSize:11, color:"grey", marginBottom:10, marginLeft:8, opacity:.3}}>Please press Done/Enter on your keyboard after typing.</Text>

            <View style={styles.userInputs}>
                {/* 
                React component "TextInput" has a default prop onchange text built in.
                This keeps an eye on whether or not the text is being changed. the change userName
                function allows you to edit the variable userName.

                https://reactnative.dev/docs/textinput --> scroll down for more info.
                */}
                <TextInput placeholder={userName} placeholderTextColor={"#00468B"} onChangeText={changePlaceholder}  onSubmitEditing={finishedTypingUser} style={styles.inputBox1}></TextInput>
            </View>
            <View style={{margin:15}}>
                <Text style={{color:"white", fontSize:20, fontWeight:"bold", textAlign:"center"}}>Favorite pair?</Text>
            </View>
            <View style={styles.userInputs}>
                <TextInput placeholder={prefPair} placeholderTextColor={"#00468B"} onChangeText={changePair}  onSubmitEditing={finishedTypingPair} style={styles.inputBox1}></TextInput>
            </View>
            <View style={styles.nameheader}>
                <Text style={{color:"white", fontSize:16, fontWeight:"bold", textAlign:"center"}}>What currencies do you trade?</Text>
            </View>
            <View>

            </View>
            {/* 
            On press user is routed to path.
            data is also passed with it inside of params in the form of {id: value} value can be a string or var. 
            */}
            <TouchableOpacity style={styles.button} onPress={() => router.push({pathname:`${nextPage}`, params:{id:myInfo, id2:`${userName}`}})}>
                <Text style={styles.buttonText}>CONTINUE</Text>
            </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#042547",
    flex: 1,
    width:"auto",
    height:"99%"
  },
  outerContainer: {
    display:"flex",
    width:"auto",
    height:"auto",
    top:"10%",
    padding:30
  },
  innerContainer: {
    display:"flex",
    justifyContent:"center"
  },
  nameheader: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center", // Add this to horizontally center
    marginVertical: 20, // Optional, for spacing around the text
  },
  userInputs:{
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    width:"100%",
  },
  inputBox1: {
    paddingLeft:10,
    color:"white",
    backgroundColor:"#003161",
    width:"80%",
    borderColor:"#0053A7",
    borderWidth:1,
    borderRadius:8
  },
  button: { 
    backgroundColor: '#e0e0e0', // Light gray button
    justifyContent: "center",
    borderRadius: 8,
    shadowColor: '#000',
    width:"auto",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Android shadow
  },
  buttonText: {
    alignSelf:"center",
    color: '#00254d', // Dark blue text
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
})
