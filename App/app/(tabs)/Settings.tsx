import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [isChecked, setChecked] = useState(false);


  let counter;
  function myFunct() {
    console.log("hello2")
    counter+1
    console.log(counter)
  }

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          onChange={myFunct()}
          color={isChecked ? '#4630EB' : undefined}
        />
        <Text style={styles.paragraph}>Custom colored checkbox</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});
