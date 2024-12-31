import { Link } from "expo-router";
import { Text, View, StyleSheet,} from "react-native";
import { StatusBar } from "expo-status-bar"

export default function not_found() {
  return (
    <View
        style={styles.container}
    >
    <StatusBar style={'dark'} backgroundColor={"transparent"}/>
    <Text style={styles.text}>404 - Page not found</Text>

    {/* In href={""} links the Index path does not need to be specified. "/" will work just the same*/}
      <Link href={"/Home"} style={styles.Links}>Return to Homepage</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#DC143C",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color:"white",
    fontWeight:"bold",
    fontSize: 30,
    padding:"10px"
  },
  Links: {
    textDecorationLine: "underline",
    color: "#F0F8FF"
  }
})
