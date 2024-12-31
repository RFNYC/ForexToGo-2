import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { useEffect } from "react";
import * as NavigationBar from 'expo-navigation-bar';

export default function Index() {

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
    <View
        style={styles.container}
    >
      <Text style={styles.subheader}>Todays News:</Text>
      <Text>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</Text>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"white",
    justifyContent: "center",
    alignItems: "center",
    flex:1
  },
  subheader: {
    color:"#393939",
    fontSize:32,
    fontWeight:"bold",
  },
  Links: {
    textDecorationLine: "underline",
    color: "blue"
  }
})
