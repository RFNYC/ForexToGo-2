import { Stack } from "expo-router";

// Export function sends this information to the app
// Returns a list of screens in which the app can display. 
export default function RootLayout() {
  /*
  Each "Stack.Screen" is a page that can be visited inside the app if given a route to get there (a link or button of somekind).
  Likewise, to add another page all you need to do is add another <Stack.screen/> tag then define your target file. Ex: name="about_screen"

  Each <Stack.screen/>has individual properties which can be found in Expo's documentation. 
  When added they will change the look, feel, or content of the page. Alternatively, You can edit <Stack> and it will apply to them all.
  */
  return (
    <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerShown:false,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
    >
      <Stack.Screen
        name="(tabs)"
      />
      <Stack.Screen
        name="+not-found"
        options={{
          headerShown:false
        }} 
      />
    
    </Stack>
  )
}
