import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";

const HomeScreen = () => {
  type Media = { name: string; uri: string };
  const [images, setImages] = useState<Media[]>();
  useEffect(() => {
    loadFiles();
  }, []);
  const loadFiles = async () => {
    if (!FileSystem.documentDirectory) {
      return;
    }
    const res = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory
    );
    setImages(
      res.map((file) => ({
        name: file,
        uri: FileSystem.documentDirectory + file,
      }))
    );
  };
  // console.log(JSON.stringify(images, null, 2));
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        numColumns={3}
        contentContainerStyle={{ gap: 2 }}
        columnWrapperStyle={{ gap: 2 }}
        renderItem={({ item }) => (
          <Link href={`/${item.name}`} asChild>
            <Pressable>
              <Image source={{ uri: item.uri }} style={styles.image}></Image>
            </Pressable>
          </Link>
        )}
      />

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
  image: {
    aspectRatio: 3 / 4,
    width: 100,
    borderBlockColor: "yellow",
    borderWidth: 2,
  },
});
