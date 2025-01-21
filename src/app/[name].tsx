import { StyleSheet, Text, View, Image } from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import * as FileSystem from "expo-file-system";
const ImageDetailsScreen = () => {
  const { name } = useLocalSearchParams<{ name: string }>();
  const fullPath = FileSystem.documentDirectory + name;
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Image " }}></Stack.Screen>
      <Image source={{ uri: fullPath }} style={styles.image}></Image>
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
  image: { aspectRatio: 3 / 4, flex: 1 },
});
