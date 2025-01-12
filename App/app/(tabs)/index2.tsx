import { router, useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, } from "react-native";
import React, { useEffect, useState } from "react";
import * as NavigationBar from 'expo-navigation-bar';
import { ImageBackground } from "react-native";

const backgroundImage = require("../../assets/images/frame-1.jpg")

export default function Page1() {

  const {id} = useLocalSearchParams();  // Accessing params directly

  const [userName, changePlaceholder] = useState("First name")
  const [prefPair, changePair] = useState("Ex: GBP/JPY")

  // Creates variable to be passed by router.
  let myUser;
  // Edits variable based on user Input.
  function finishedTypingUser() {
    myUser = userName
    return console.log(userName)
  }

  function finishedTypingPair() {
    console.log(prefPair)
    let prefferedCurrencies = prefPair.split("/")
    return console.log(prefferedCurrencies)
  }

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
            <TouchableOpacity style={styles.button} onPress={() => router.push({pathname:"/Home", params:{id:`${myUser}`, id2:"bob"}})}>
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
  }
})
