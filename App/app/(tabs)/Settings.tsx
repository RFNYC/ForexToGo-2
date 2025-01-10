import { Link } from "expo-router";
import { Text, View, StyleSheet, Image, FlatList, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import * as NavigationBar from 'expo-navigation-bar';
import React from "react";

function MyComponent({prop1,prop2}) {
  return (
    <View>
      <Image source={prop1} style={{width:100,height:100}}/>
      <Text>{prop2}</Text>
    </View>
  )
}

function MarketOutlookComp({outlookImage, marketOutlook}) {
  return (
        <View style={styles.outlookHeader}>
          <Text>Market Outlook:</Text>
          <View style={{display:"flex",flexDirection:"row"}}>
            <Image source={outlookImage} style={{width:9,height:9, top:7, right:1}}/>
            <Text style={{fontSize:12, fontWeight:"500", top:2, left:4}}>{marketOutlook}</Text>
          </View>
        </View>
  )
};

let image = require('../../assets/images/AUD.png')
let test = "my text"
console.log(image)

export default function page() {
  return (
    <View>
        <Text>hi</Text>
        <MyComponent prop1={image} prop2={test}/>
        <MarketOutlookComp outlookImage={image} marketOutlook={test}/>
    </View>
  )
}

const styles = StyleSheet.create({
  PageContainer: {
    maxWidth:"auto",
    width:"auto",
    height:30,
    backgroundColor:"white",
    flex:1,
    paddingLeft:15,
    paddingRight:15,
  },
  ElementsContainer: {
    flex:1,
    justifyContent:"flex-start",
    paddingTop:19,
  },
  MainHeaders: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between"
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
  outlookHeader: {
    fontWeight:"bold",
    paddingTop:9,
    paddingRight:2
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
    paddingBottom:10,
    maxWidth:"auto"
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
    width:"auto",
    height:170,
    objectFit:"cover",
},
leftCurrency: {
    position:"absolute",
    fontSize:55,
    fontWeight:"500",
  
    color:"white",
    top:"23%",
    left:"10%",
},
rightCurrency: {
    position:"absolute",
    fontSize:55,
    fontWeight:"500",
    color:"white",
    top:"23%",
    left:"60%",
},
topCurrency: {
  position:"absolute",
  fontSize:55,
  fontWeight:"500",
  justifyContent:"center",
  color:"white",
  top:5,
  left:20
},
container: {
  flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
item: {
  minWidth:370,
  maxWidth:"100%",
  paddingBottom:10,
  borderRadius: 10 
},
row1:{
  flexDirection:"row",
  display:"flex"
},
row2:{
  flex:1,
  flexDirection:"row",
  gap:10,
  justifyContent:"flex-end",
  alignItems:"center"
},
row3: {
  flexDirection:"row",
  justifyContent:"flex-start"
},
row4: {
  flexDirection:"row",
  justifyContent:"space-evenly"
},
images2: {
  width:19,
  height:30,
  objectFit:"contain",
}

})
