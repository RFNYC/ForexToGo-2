import { React } from 'react';
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, StyleSheet, Button } from "react-native";

// Export function sends this information to the app
// Returns a list of screens in which the app can display. 

const HeaderLogo = require("../../assets/images/Header-Text-Image.png");
  
export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor:"green",
                headerStyle:{
                    backgroundColor:"white",
                },
                headerShown: true,
                tabBarLabelPosition: "beside-icon",
                tabBarStyle: {
                    backgroundColor:"white"
                }
                        }}
        >
            <Tabs.Screen name="index"
                 options={{
                    headerShown: false, // Show header if needed
                    tabBarStyle: { display: 'none' }, // Hides the tab bar for this screen
                    tabBarButton: () => null, // Removes the tab icon/button completely
                 }}
            />
            <Tabs.Screen name="Home"
             options={{
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? "newspaper": "newspaper-outline"} color={color} size={24} />
                      ),
                    headerTitle: "News",
                    headerTitleAlign:"left",
                    headerStyle: {
                        borderBottomWidth: 1, // Add border width
                        borderBottomColor: '#DEDEDE', // Set border color
                        backgroundColor:"#003366"
                    },
                    headerTitleStyle: {
                        fontSize:20,
                        color:"white",
                        fontWeight:"bold",
                    }
                }}
             />
            <Tabs.Screen name="Settings" options={{
                headerTitle:"Settings",
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? "settings" : "settings-outline"} color={color} size={24} />
                  ),
                    headerTitleAlign:"left",
                    headerTitleStyle: {
                        fontSize:20,
                        color:"#003366",
                        fontWeight:"bold",
                    }
                }}
            />
        </Tabs>
    )
 }

 /* If this ever breaks for some reason and wont show any pages ensure that return () hasnt been broken in anyway. Keep everything neat and on
    a single line so you dont have problems finding out where you messed up */