import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

//creates a component function using const 
const MyComponent = ({text}) => (
  <View>
    <Text>{text}</Text>
  </View>
);

function NewComponent({text}) {
  return <Text>{text}</Text>
}

// Creates a list of items, adds a custom entry, then renders each entry as a component.
const App = () => {

  // The only way we can get the info we fetch later to render onto the page we need to have a useState.
  // useStates track changes to the array and if changed the page re-renders with those changes.
  // We're gonna create a state outside the useEffect which happens after the page loads to prepare.
  // creates a var "prepArray" sets it equal to an array.
  const [prepArray, setPrepArray] = useState([])

  useEffect(() => {
    // See https://reactnative.dev/docs/network the template.
    // anytime fetch() is used the output is returned in a "promise" called a "response" object.
    // in order to get the data from the object you need to do something to the response.
    fetch('api')
    // after we recieve that response we returned it in a JSON format
    // then with the data we can choose to return number of things within the brackets {}.
      .then(response => response.json())
      .then((data) => {
          console.log(data)
          // JS object containing news titles (dict in python)
          const newsEvents = data[0]
          const currenciesImpacted = data[1]
          const impactLevels = data[2]
          const calendarTimes = data[3]
          const content = []
          // THANK YOU W3SCHOOLS !!! --> Creates an array [] of the possible object keys. Makes it easy to grab each one with an iterator
          // I used counter as my iterator and then once I had the required key I passed it to the newsEvents object.
          let eventKeys = Object.keys(newsEvents)
          let currencyKeys = Object.keys(currenciesImpacted)
          let impactKeys = Object.keys(impactLevels)
          let calenderKeys = Object.keys(calendarTimes)
          for (let counter = 0; counter < eventKeys.length; counter++) {
            var eventCell = eventKeys[counter]
            var currencyCell = currencyKeys[counter]
            var impactCell = impactKeys[counter]
            var calenderCell = calenderKeys[counter]
            
            // `${}` essentially works in the same way as f"{}" in python does.
            // content.push(x) appends x to the array.
            content.push(newsEvents[`${eventCell}`])
            content.push(currenciesImpacted[`${currencyCell}`])
            content.push(impactLevels[`${impactCell}`])
            content.push(calendarTimes[`${calenderCell}`])
          }    
          setPrepArray(content)
          console.log(content)
  
    })
    .catch(error => {
            console.error('Error fetching data:', error);
        });
  }, [])

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
      {prepArray.map((content, index_num) => (
        <MyComponent key={index_num} text={content} />
        
      ))}
      <NewComponent text={"check console."}/>      
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  item: { margin: 10, padding: 20, backgroundColor: '#ccc', borderRadius: 10 },
});

export default App;
