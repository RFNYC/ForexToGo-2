import React, { useContext, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { DataContext } from './app';

function Dynamic({value}) {
  return(
    <View>
      <Text>{value}</Text>
    </View>
  )
}

export default function Settings2() {  
 
    const [userName, changePlaceholder] =  useContext(DataContext)
    changePlaceholder("mystuff")

    const [prefPair, changePair] = useState("Ex: GBP/JPY")
  
    function finishedTypingUser() {
      return console.log(userName)
    }
  
    function finishedTypingPair() {
      console.log(prefPair)
      let prefferedCurrencies = prefPair.split("/")
      return console.log(prefferedCurrencies)
    }

  return(
    <View style={styles.userInputs}>
      <TextInput placeholder={userName} placeholderTextColor={"#00468B"} onChangeText={changePlaceholder}  onSubmitEditing={finishedTypingUser} style={styles.inputBox1}></TextInput>
    </View>
  )
};

const styles = StyleSheet.create({
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
})
