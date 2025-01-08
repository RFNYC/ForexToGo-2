import { Link } from "expo-router";
import { Text, View, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import * as NavigationBar from 'expo-navigation-bar';
import React from "react";

const pic1 = "JPY"
const pic2 = "USD"
const pic3 = "CHF"
const pic4 = "GBP"

export default function FourSquareComp() {
    return (
        <View style={styles.container}>
            <View style={styles.images}>
                <Image style={[styles.img, {borderTopLeftRadius:9}]} source={require(`../../assets/images/${pic1}.png`)} /> 
                <Image style={[styles.img, {borderTopRightRadius:9}]} source={require(`../../assets/images/${pic2}.png`)} /> 
                <Image style={[styles.img, {borderBottomLeftRadius:9}]} source={require(`../../assets/images/${pic3}.png`)} /> 
                <Image style={[styles.img, {borderBottomRightRadius:9}]} source={require(`../../assets/images/${pic4}.png`)} /> 
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width:"auto",
        position:"relative",
    },
    images: {
        display:"flex",
        flexWrap:"wrap",
        flexDirection:"row"
    },
    img: {
        flexGrow:1,
        width:132,
        height:110,
        objectFit:"cover"
    }

})