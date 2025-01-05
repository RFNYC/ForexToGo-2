import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import * as NavigationBar from 'expo-navigation-bar';

const NewComponent = () => {
  return <Text>This is a const component</Text>
}

export default function Index() {

  // This creates a custom component called <Custom/> that we can reuse. It renders everything after return
  // Helps avoid long messy duplicated code. See "Component-Explanation.txt" for your notes on this.
  function CustomComponent() {
    return <Text>custom content</Text>
  }

  function MyComponent({text}) {
    return <Text>{text}</Text>
  }

  // placeholder values until I fetch the data.
  let event_name = "German Bank Holiday"
  let currency = "EUR"
  let impact = "Non-Economic"
  let time = "All Day"
  const items = [];

  let counter = 0
  let num_events = 6
  // Forloop that will be linked to the number of events in fetched data.
  // Not sure why but the comparitor against the array length must be 4x the number of events for the day.
  for (counter = 0; items.length < num_events*4; counter++ ){
    items.push(event_name)
    items.push(currency)
    items.push(impact)
    items.push(time)
  }

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
    <View id="container"
        style={styles.container}
    >
      <Text style={styles.subheader}>Todays News:</Text>
      <Text id="line">⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</Text>
      <Link href={"/about"} style={styles.Links}>DATA.</Link>   
      {items.map((content, index_num) => (
        <MyComponent key={index_num} text={content} />
      ))}

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
