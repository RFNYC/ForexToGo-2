import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

//creates a component function using const 
const MyComponent = ({text}) => (
  <View>
    <Text>{text}</Text>
  </View>
);

function NewComponent() {
  const [data , setData] = useState(null)

  useEffect(() => {
      // # anytime fetch() is used the output is returned in a "promise" called a "response" object.
      // # in order to get the data from the object you need to do something to the response
      fetch('http:localhost:5000')
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            console.log(data[0]);
            const newsEvents = data[0]
            const newID = newsEvents["MyID"]
            console.log(newsEvents["MyID"])
            setData(newID)
      })
      .catch(error => {
              console.error('Error fetching data:', error);
          });
  }, [])
 
  return <p>{data}</p>
}

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
      <NewComponent/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  item: { margin: 10, padding: 20, backgroundColor: '#ccc', borderRadius: 10 },
});

export default App;
