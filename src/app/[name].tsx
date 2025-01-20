import { StyleSheet, Text, View } from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";

const ImageDetailsScreen = () => {
  const { name } = useLocalSearchParams<{ name: string }>();
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Image " + name }}></Stack.Screen>
      <Text style={styles.title}>Image Details Screen for:{name} </Text>
      <Link href="/">Home</Link>
    </View>
  );
};

export default ImageDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    color: "green",
  },
});
