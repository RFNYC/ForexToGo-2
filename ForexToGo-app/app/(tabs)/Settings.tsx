import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//creates a component function using const 
const MyComponent = ({text}) => (
  <View>
    <Text>{text}</Text>
  </View>
);


// Creates a list of items, adds a custom entry, then renders each entry as a component.
const App = () => {
  const items = [];

  let counter = 0
  let num_events = 1
  // Forloop that will be linked to the number of events in fetched data.
  // Not sure why but the comparitor against the array length must be 4x the number of events for the day.
  for (counter = 0; items.length < num_events*4; counter++ ){
    items.push("...")
    items.push("...")
    items.push("...")
    items.push("...")
  }

  return ( 
    <View style={styles.container}>
      {items.map((content, index_num) => (
        <MyComponent key={index_num} text={content} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  item: { margin: 10, padding: 20, backgroundColor: '#ccc', borderRadius: 10 },
});

export default App;
