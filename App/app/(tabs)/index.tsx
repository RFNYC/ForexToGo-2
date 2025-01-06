import { Link, router } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import * as NavigationBar from 'expo-navigation-bar';
import { Image, ImageBackground } from "react-native";

const backgroundImage = require("../../assets/images/frame-1.jpg")
const welcomeImage = require("../../assets/images/title-disclaimer.png")

export default function Index() {
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
      <View style={styles.textContainer}>
        <Text style={styles.titleTextTop}>Welcome To</Text>
        <Text style={styles.titleTextBottom}>ForexToGo!</Text>
        <Text style={styles.SloganText}>Know the news before the moves.</Text>
        <Text style={styles.DisclaimerHeader}>DISCLAIMER:</Text>
        <Text style={styles.DisclaimerText}>This project is solely for practice and educational purposes. All data displayed within the app is sourced from ForexFactory.com. This app is not intended for cloning or distribution for profit. I do not intend to make any financial gain from this project in any form.</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/Home")}>
            <Text style={styles.buttonText}>CONTINUE</Text>
          </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#042547",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  textContainer: {
    paddingTop:"90%",
    marginLeft:"-10%",
    alignItems:"flex-start",
    width:"80%"
  },
  Links: {
    textDecorationLine: "underline",
    color: "#F0F8FF"
  },
  background: {
    flex:1,
    height: 100,
    width: 100,
    resizeMode: 'contain'
  },
  image: {
    alignItems: "center",
    height: 300,
    width: 400,
  },
  titleTextTop: {
    alignItems: "flex-start",
    color:"white",
    fontSize:36,
    fontWeight: "bold",
    fontStyle:"italic"
  },
  titleTextBottom: {
    alignItems: "flex-start",
    color:"white",
    fontSize:42,
    fontWeight: "bold",
    fontStyle:"italic"
  },
  SloganText: {
    paddingTop:10,
    textAlign: "left",
    color:"white",
    fontSize:18,
    fontWeight: "bold",
    fontStyle:"italic"
  },
  DisclaimerHeader: {
    paddingTop:"10%",
    fontWeight:"bold",
    fontSize: 15,
    color: "white"
  },
  DisclaimerText: {
    fontSize:14,
    fontWeight:"bold",
    color:"grey",
    width:"114%"
  },
  button: { 
    backgroundColor: '#e0e0e0', // Light gray button
    justifyContent: "center",
    paddingVertical: 12,
    marginTop:"10%",
    marginLeft:"7%",
    paddingHorizontal: 40,
    borderRadius: 8,
    shadowColor: '#000',
    width:"100%",
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
