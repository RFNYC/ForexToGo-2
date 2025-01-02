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
                    backgroundColor:"#003366",
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
                    headerLeft: null,
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? "newspaper": "newspaper-outline"} color={color} size={24} />
                      ),
                    headerTitle: "FOREX TO GO!",
                    headerTitleAlign:"center",
                    headerTitleStyle: {
                        fontSize:15,
                        color:"white",
                        fontWeight:"bold",
                        fontStyle:"italic"
                    }
                }}
             />
            <Tabs.Screen name="Settings" options={{
                headerTitle:"About1",
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? "settings" : "settings-outline"} color={color} size={24} />
                  )
                }}
            />
        </Tabs>
    )
 }

 /* If this ever breaks for some reason and wont show any pages ensure that return () hasnt been broken in anyway. Keep everything neat and on
    a single line so you dont have problems finding out where you messed up */