import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image } from 'react-native';

//creates a component function using const 
const MyComponent = ({text}) => (
  <View>
    <Text>{text}</Text>
  </View>
);

const Line = require("../../assets/images/Line1.png")

// Creates a list of items, adds a custom entry, then renders each entry as a component.
export default function App() {

  // The only way we can get the info we fetch later to render onto the page we need to have a useState.
  // useStates track changes to the array and if changed the page re-renders with those changes.
  // We're gonna create a state outside the useEffect which happens after the page loads to prepare.
  // creates a var "content" sets it equal to an array.
  const [content, setArray] = useState([])

  useEffect(() => {
    // See https://reactnative.dev/docs/network the template.
    // anytime fetch() is used the output is returned in a "promise" called a "response" object.
    // in order to get the data from the object you need to do something to the response.
    fetch('http://192.168.1.152:5000/data')
    // after we recieve that response we returned it in a JSON format
    // then with the data we can choose to return number of things within the brackets {}.
      .then(response => response.json())
      .then((data) => {
          console.log(data)

          /*
            Heres whats happening inside this useEffect:
            We have an array of objects (6) --> [{...},{...},{...}] and we need to pull data from each one.

            Step 1: Define each object as its own variable. Here we just index through the parent array and define each object in its own variable
            ex: const myInfo = data[x]

            Step 2: To index through an object we need an actual key, not just number.
            So each one is ALSO defined making use of Object.keys(my_object) function
            Object.keys() returns an array of that object's keys which is useful. Since each key in each object has a number
            I used a for-loop to get the key I wanted in the order that I needed it.

            Step 3: It wouldn't be feasible to hardcode each key on its own for an everchanging data set. so I looped through each object to gather information.
            In JavaScript the code in a for-loop runs once per iteration. So in essence all i needed to do was get the ALL the data for a full event once then
            it will duplicate as many times as I need it to.

            Step 4: Because of how react native FlatLists work I needed to put all this information BACK into an objects then push them all into an array.
            see more on FlatList --> https://reactnative.dev/docs/flatlist?language=typescript

            Step 5: Save all of that array of objects to the useState variable defined above.
            Now all data from the API can be accessed in the app without being hardcoded.
          */

          // Step 1
          // JS object containing news titles (dict in python)
          const newsEvents = data[0]
          const currenciesImpacted = data[1]
          const impactLevels = data[2]
          const calendarTimes = data[3]
          const actualStat = data[4]
          const forecastedStat = data[5]
          const previousStat = data[6]
          const content = []
          
          // Step 2
          // THANK YOU W3SCHOOLS !!! --> Creates an array [] of the possible object keys. Makes it easy to grab each one with an iterator
          // I used counter as my iterator and then once I had the required key I passed it to the newsEvents object.
          let eventKeys = Object.keys(newsEvents)
          let currencyKeys = Object.keys(currenciesImpacted)
          let impactKeys = Object.keys(impactLevels)
          let calenderKeys = Object.keys(calendarTimes)
          let actualStatKeys = Object.keys(actualStat)
          let forecastedStatKeys = Object.keys(forecastedStat)
          let previousStatKeys = Object.keys(previousStat)
          
          // Step 3
          for (let counter = 0; counter < 1; counter++) {
            var eventCell = eventKeys[counter]
            var currencyCell = currencyKeys[counter]
            var impactCell = impactKeys[counter]
            var calendarCell = calenderKeys[counter]
            var actualCell = actualStatKeys[counter]
            var forecastedCell = forecastedStatKeys[counter]
            var previousCell = previousStatKeys[counter]

            // Step 4
             // `${}` essentially works in the same way as f"{}" in python does.
            const myOBJ = {}
            myOBJ[ `SectionID`] = `Object${counter}`
            myOBJ[`key1`] = newsEvents[`${eventCell}`]
            myOBJ[ `key2`] = currenciesImpacted[`${currencyCell}`]
            myOBJ[`key3`] = impactLevels[`${impactCell}`]
            myOBJ[`key4`] = calendarTimes[`${calendarCell}`]
            myOBJ[`key5`] = actualStat[`${actualCell}`]
            myOBJ[`key6`] = forecastedStat[`${forecastedCell}`]
            myOBJ[`key7`] = previousStat[`${previousCell}`]

            let impact = impactLevels[`${impactCell}`]
            let imgImpact;
            let impactHeader
            console.log(impact)
            if (impact == "Low Impact Expected") {
              imgImpact = require("../../assets/images/lowImpact.png")
              impactHeader = "Low Impact"
            } else if (impact == "Medium Impact Expected") {
              imgImpact = require("../../assets/images/mediumImpact.png")
              impactHeader = "Medium Impact"
            } else if (impact == "High Impact Expected") {
              imgImpact = require("../../assets/images/highImpact.png")
              impactHeader = "High Impact"
            } else if (impact == "Non-Economic") {
              imgImpact = require("../../assets/images/noImpact.png")
            }
          
            myOBJ[`key8`] = imgImpact
            myOBJ[`key9`] = impactHeader
            myOBJ[`key10`] = "Actual"
            myOBJ[`key11`] = "Forecasted"
            myOBJ[`key12`] = "Previous"
            // content.push(x) appends x to the array.
            content.push(myOBJ)
      
          }    
          setArray(content)
    })
    .catch(error => {
            console.error('Error fetching data:', error);
        });
  }, [])

  console.log(content)

  const Item = ({eventName, currencyName, impactName, eventTime, actual, forecasted, previous, img, impactTitle, actualTitle, forecastTitle, previousTitle}) => (
    <View style={styles.item}>
      <View style={{justifyContent:"flex-end",flexDirection:"row",}}>
          <Text style={{fontSize:11, top:4}}>{eventTime}</Text>
        </View>
      <View style={{flexDirection:"row"}}>
        <View style={styles.row1}>
          <Image style={styles.images2} source={img}/>
          <Text style={{padding:5, fontFamily:"sans-serif-thai", fontWeight:"bold", fontSize:15}}>{currencyName}: {impactTitle}</Text>
        </View>
        <View style={styles.row2}>
          <View>
            <Text style={{fontSize:12}}>{actualTitle}</Text>
          </View>
          <View>
            <Text style={{fontSize:12}}>{forecastTitle}</Text>
          </View>
          <View>
            <Text style={{fontSize:12}}>{previousTitle}</Text>
          </View>
        </View>
      </View>
      <View style={styles.row3}>
        <View>
          <Text style={{fontSize:11}}>{eventName}</Text>
        </View>
        <View style={styles.row2}>
          <View>
            <Text style={{fontSize:12}}>{actual},</Text>
          </View>
          <View>
            <Text style={{fontSize:12}}>{forecasted},</Text>
          </View>
          <View>
            <Text style={{fontSize:12}}>{previous}</Text>
          </View>
        </View>  
      </View>
      <Image source={Line} style={{top:10, width:"auto"}}/>
    </View>
  );

  // https://reactnative.dev/docs/flatlist?language=typescript -- copied this structure for the sake of time  
  return ( 
    <View style={styles.container}>
      <ScrollView>
        <FlatList
          data={content}
          renderItem={({item}) => <Item eventName={item.key1} currencyName={item.key2} impactName={item.key3} eventTime={item.key4} actual={item.key5} forecasted={item.key6} previous={item.key7} img={item.key8} impactTitle={item.key9} actualTitle={item.key10} forecastTitle={item.key11} previousTitle={item.key12}/>}
          keyExtractor={item => item.id}
          />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    minWidth:400,
    padding: 0,
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

});
