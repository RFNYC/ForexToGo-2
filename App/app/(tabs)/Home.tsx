import { Link, useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, Image, FlatList, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import * as NavigationBar from 'expo-navigation-bar';
import React from "react";

const Line = require("../../assets/images/Line1.png")


export default function Index() {
    const {id, id2} = useLocalSearchParams();  // Accessing params directly
    const currencies = ['AUD','CAD','CHF','CNY','EUR','GBP','JPY','NZD','USD']

    const currencyImages = {
      AUD: require('../../assets/images/AUD.png'),
      CAD: require('../../assets/images/CAD.png'),
      CHF: require('../../assets/images/CHF.png'),
      CNY: require('../../assets/images/CNY.png'),
      EUR: require('../../assets/images/EUR.png'),
      GBP: require('../../assets/images/GBP.png'),
      JPY: require('../../assets/images/JPY.png'),
      NZD: require('../../assets/images/NZD.png'),
      USD: require('../../assets/images/USD.png'),
    };


    let arrayID = id.split(",")
    let imageMap1 = `${arrayID[0]}`
    let imageMap2 = `${arrayID[1]}`
    let pic1 = "USD"
  
  // These creates a custom components called <ComponentNameHere/> that we can reuse. It renders everything after return
  // Helps avoid long messy duplicated code. See "Component-Explanation.txt" for your notes on this.
  
  function TopCurrencyComponent() {
    return (
      <View>
        <View style={styles.SquareContainer}>
            <View style={styles.images}>
                <Image style={[styles.img, {borderRadius:8}]} source={require(`../../assets/images/${pic1}.png`)} /> 
                <Text style={styles.topCurrency}>{pic1}</Text>
            </View>
        </View>
      </View>
    );
  }

  function TopCurrencyPairComp({currencyCode, currencyCode2}) {
      return (
          <View>
              <View style={styles.SquareContainer}>
                  <View style={styles.images}>
                      <Image style={[styles.img, {borderTopLeftRadius:8,borderBottomLeftRadius:8}]} source={currencyImages[currencyCode]} /> 
                      <Image style={[styles.img, {borderTopRightRadius:8,borderBottomRightRadius:8}]} source={currencyImages[currencyCode2]} />
                      <Text style={styles.leftCurrency}>{arrayID[0]}</Text>
                      <Text style={styles.rightCurrency}>{arrayID[1]}</Text>
                  </View>
              </View>
          </View>
      );
  }

  function MarketOutlookComp({outlookImage, marketOutlook}) {
    return (
          <View style={styles.outlookHeader}>
            <Text>Market Outlook:</Text>
            <View style={{display:"flex",flexDirection:"row"}}>
              <Image source={outlookImage} style={{width:9,height:9, top:7, right:1}}/>
              <Text style={{fontSize:12, fontWeight:"500", top:2, left:4}}>{marketOutlook}</Text>
            </View>
          </View>
    )
  };

  // The only way we can get the info we fetch later to render onto the page we need to have a useState.
  // useStates track changes to the array and if changed the page re-renders with those changes.
  // We're gonna create a state outside the useEffect which happens after the page loads to prepare.
  // creates a var "content" sets it equal to an array.
  const [content, setArray] = useState([])
  const [headerText, setHeader] = useState([])
  const [headerImage , setInner] = useState(null)

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

          // Keeps track of currencies impacted by each event.
          const events = data[1]
          const eventsArray = Object.values(events)
          // Creates a place to store the objects from "data" we want displayed.
           const filteredData = []
           // Keeps track of what the user is looking for.
           const trackedCurrencies = []

           trackedCurrencies.push("JPY","AUD","CNY")

           console.log(events)

          for (let counter = 0; counter < eventsArray.length; counter++) {
            // When logged should print individual currency. ex: "JPY"
            let currentCurrency = trackedCurrencies[counter]
            console.log(currentCurrency)
            console.log(eventsArray.indexOf(currentCurrency))
          }
     

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
          const header = []
          let volatileCount = 0
          let headerOutLookImg;
          let headerOutlookText;
          
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
          for (let counter = 0; counter < eventKeys.length - 2; counter++) {
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
            myOBJ[ `id`] = `${counter}`
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
              impactHeader = "Non Economic"
              imgImpact = require("../../assets/images/noImpact.png")
            }

            if (impactLevels[`${impactCell}`] == "High Impact Expected") {
              volatileCount++
              
            } else {
              volatileCount+0
            }
          
            myOBJ[`key8`] = imgImpact
            myOBJ[`key9`] = impactHeader
            myOBJ[`key10`] = "Actual"
            myOBJ[`key11`] = "Forecasted"
            myOBJ[`key12`] = "Previous"
            myOBJ[`key13`] = headerOutLookImg
            myOBJ[`key14`] = headerOutlookText
            // content.push(x) appends x to the array.
            content.push(myOBJ)
          }    
          //for loop ends

          let myImgObj = []

          if (volatileCount >= 2) {
            headerOutLookImg = require('../../assets/images/riskHigh.png')
            headerOutlookText = "High Volatility"
          } else if (volatileCount < 2 ) {
            headerOutLookImg = require('../../assets/images/riskLow.png')
            headerOutlookText = "Low Volatility"
          }
          
          myImgObj.push(headerOutLookImg)
          myImgObj.push(headerOutlookText)

          header.push(myImgObj)
          setArray(content)
          console.log(content)

          let inner_Array = header[0]
          setHeader(inner_Array[1])
          setInner(inner_Array[0])
          
    })
    .catch(error => {
            console.error('Error fetching data:', error);
        });
  }, [])

  
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
        style={styles.PageContainer}
    >
      <View style={styles.ElementsContainer}>
        <View style={styles.MainHeaders}>
          <View>
            <Text style={styles.userText}>Hi, {id2}.</Text>
            <Text style={styles.userSubText}>Welcome back!</Text>
          </View>
          <MarketOutlookComp outlookImage={headerImage} marketOutlook={headerText}/>
        </View>
        <Text style={styles.currencyHeader}>Currencies you're watching</Text>
          <View style={styles.SquareComponent}>
            <TopCurrencyPairComp currencyCode={`${imageMap1}`} currencyCode2={`${imageMap2}`}/>
          </View>
         <Text style={{fontWeight:"500"}}>Today's Forecast: </Text> 
         <View style={styles.container}>
        <ScrollView style={{padding:0}}>
          <FlatList
            data={content}
            renderItem={({item}) => <Item eventName={item.key1} currencyName={item.key2} impactName={item.key3} eventTime={item.key4} actual={item.key5} forecasted={item.key6} previous={item.key7} img={item.key8} impactTitle={item.key9} actualTitle={item.key10} forecastTitle={item.key11} previousTitle={item.key12}/>}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            />
        </ScrollView>
    </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  PageContainer: {
    maxWidth:"auto",
    width:"auto",
    height:30,
    backgroundColor:"white",
    flex:1,
    paddingLeft:15,
    paddingRight:15,
  },
  ElementsContainer: {
    flex:1,
    justifyContent:"flex-start",
    paddingTop:19,
  },
  MainHeaders: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between"
  },
  userText: {
    color:"#393939",
    fontSize:24,
    fontFamily:"sans-serif-thai"
  },
  userSubText: {
    paddingTop:4,
    color:"#6C6C6C",
    fontSize:15,
    fontWeight:"regular",
    fontFamily:"sans-serif-thai",
    paddingBottom:10
  },
  outlookHeader: {
    fontWeight:"bold",
    paddingTop:9,
    paddingRight:2
  },
  currencyHeader: {
    paddingTop:10,
    color:"black",
    fontSize:15,
    fontWeight:"condensed",
    fontFamily:"sans-serif-thai"
  },
  Links: {
    textDecorationLine: "underline",
    color: "blue"
  },
  SquareComponent: {
    paddingTop:10,
    paddingBottom:10,
    maxWidth:"auto"
  },
  SquareContainer: {
    width:"auto",
    height:"auto",
    position:"relative",
    textAlign:"center",
    paddingBottom:30

},
images: {
    display:"flex",
    flexWrap:"wrap",
    flexDirection:"row",
    gap:3,
},
img: {
    flexGrow:1,
    width:"auto",
    height:170,
    objectFit:"cover",
},
leftCurrency: {
    position:"absolute",
    fontSize:55,
    fontWeight:"500",
  
    color:"white",
    top:"23%",
    left:"10%",
},
rightCurrency: {
    position:"absolute",
    fontSize:55,
    fontWeight:"500",
    color:"white",
    top:"23%",
    left:"60%",
},
topCurrency: {
  position:"absolute",
  fontSize:55,
  fontWeight:"500",
  justifyContent:"center",
  color:"white",
  top:5,
  left:20
},
container: {
  flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
item: {
  minWidth:370,
  maxWidth:"100%",
  paddingBottom:10,
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

})
