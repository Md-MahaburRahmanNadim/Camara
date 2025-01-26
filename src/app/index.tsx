import { FlatList, Pressable, StyleSheet, View, Image } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import { getMediaType } from "./utils/Media";
import { Video } from "expo-av";

const HomeScreen = () => {
  type Media = { name: string; uri: string; type: string };
  const [images, setImages] = useState<Media[]>();
  useFocusEffect(
    useCallback(() => {
      loadFiles();
    }, [])
  );
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
        type: getMediaType(file),
      }))
    );
  };
  // console.log(JSON.stringify(images, null, 2));
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        numColumns={3}
        // refreshing={false}
        // onRefresh={loadFiles}
        contentContainerStyle={{ gap: 2 }}
        columnWrapperStyle={{ gap: 2 }}
        renderItem={({ item }) => (
          <Link href={`/${item.name}`} asChild>
            <Pressable>
              {item.type === "image" && (
                <Image source={{ uri: item.uri }} style={styles.image}></Image>
              )}
              {item.type === "video" && (
                <>
                  <Video
                    source={{ uri: item.uri }}
                    style={styles.image}
                    shouldPlay
                    isLooping
                    useNativeControls
                    isMuted
                  ></Video>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: "rgba(0, 0, 0, 0.5)" },
                    ]}
                  >
                    <MaterialIcons
                      name="play-circle-outline"
                      size={24}
                      color="white"
                    />
                  </View>
                </>
              )}
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
  iconContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
