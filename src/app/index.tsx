import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Link href={"/image-1"}>Image 1</Link>
      <Link href={"/image-2"}>Image 2</Link>
      <Link href={"/image-3"}>Image 3</Link>
      <Link href={"/camera"} asChild>
        <Pressable style={styles.floatingButton}>
          <MaterialIcons name="photo-camera" size={30} color="white" />
        </Pressable>
      </Link>
    </View>
  );
};

export default HomeScreen;

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
  floatingButton: {
    backgroundColor: "royalblue",
    padding: 15,
    position: "absolute",
    right: 10,
    bottom: 10,
    borderRadius: 100,
  },
});
