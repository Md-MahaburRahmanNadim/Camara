import { StyleSheet, Text, View, Image } from "react-native";
import { Link, Stack, useLocalSearchParams, router } from "expo-router";
import * as FileSystem from "expo-file-system";
import { MaterialIcons } from "@expo/vector-icons";
import { getMediaType } from "./utils/Media";
import { useVideoPlayer, VideoView } from "expo-video";
const ImageDetailsScreen = () => {
  const { name } = useLocalSearchParams<{ name: string }>();
  const fullUri = FileSystem.documentDirectory + name;
  const type = getMediaType(fullUri);
  const player = useVideoPlayer(fullUri, (player) => {
    player.loop = true;
    player.play();
  });
  const onDelete = async () => {
    await FileSystem.deleteAsync(fullUri);
    router.back();
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: type === "video" ? "video" : "image",
          headerRight: () => (
            <View style={{ gap: 10, flexDirection: "row" }}>
              <MaterialIcons
                onPress={onDelete}
                name="delete"
                size={26}
                color="crimson"
              />
              <MaterialIcons
                onPress={() => {}}
                name="save"
                size={26}
                color="dimgray"
              />
            </View>
          ),
        }}
      ></Stack.Screen>
      {type === "image" && (
        <Image source={{ uri: fullUri }} style={styles.image}></Image>
      )}
      {type === "video" && (
        <VideoView player={player} style={styles.image}></VideoView>
      )}
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
