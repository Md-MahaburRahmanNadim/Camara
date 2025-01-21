import { StyleSheet, Text, View } from "react-native";
import { Link, Slot, Stack } from "expo-router";
const CameraScreen = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }}></Stack.Screen>
      <Stack.Screen
        name="camera"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "tomato",
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    color: "green",
  },
});
