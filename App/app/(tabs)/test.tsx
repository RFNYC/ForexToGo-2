import { Link } from "expo-router";
import { Text, View, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import * as NavigationBar from 'expo-navigation-bar';
import React from "react";

const NoImpact = require("../../assets/images/noImpact.png")

export default function CellComponent() {
    return (
        <View style={{width:"auto",display:"flex",padding:15}}>
            <Image source={NoImpact} style={{display:"flex",width:20,height:20, flexGrow:1, objectFit:"contain"}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    // SquareContainer: {
    //     width:"auto",
    //     height:"auto",
    //     position:"relative",
    //     textAlign:"center",
    //     paddingBottom:30

    // },
    // images: {
    //     display:"flex",
    //     flexWrap:"wrap",
    //     flexDirection:"row",
    //     gap:3,
    // },
    // img: {
    //     flexGrow:1,
    //     width:132,
    //     height:170,
    //     objectFit:"cover",
    // },
    // leftCurrency: {
    //     position:"absolute",
    //     fontSize:55,
    //     fontWeight:"500",
    //     color:"white",
    //     top:"23%",
    //     left:"10%"
    // },
    // rightCurrency: {
    //     position:"absolute",
    //     fontSize:55,
    //     fontWeight:"500",
    //     color:"white",
    //     top:"23%",
    //     left:"60%"
    // } 
})
