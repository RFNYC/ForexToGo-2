import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';


function Mycall(){
  return <Text>this will be deleted.</Text>
}

export default function mypage() {
  // If set to false everything created via this variable disappears.
  const [showComponent, setShowComponent] = useState(true);

  // To keep track of whether or not the button has been clicked:
  let isActive = "true"

  // Calls show function and replaces it with false, when clicked. Causing the components created via variable to disappear.
  const handleDelete = () => {
    setShowComponent(false)  
  };
  return(
    <View>
        <View>
      {showComponent && (
        <View>
          <Mycall/>
        </View>
      )}
      <Button title="Delete" onPress={handleDelete}  />
    </View>
    </View>
  )
}