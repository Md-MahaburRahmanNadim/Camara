import {
  ActivityIndicator,
  StyleSheet,
  View,
  Button,
  Pressable,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import { Link, router } from "expo-router";
import {
  CameraCapturedPicture,
  CameraMode,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import path from "path";
import * as FileSystem from "expo-file-system";
const CameraScreen = () => {
  const [facing, setfacing] = useState<CameraType>("back");
  // video recording state
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState<string>();

  // catching camera
  const camera = useRef<CameraView>(null); // we are attatching to camera view thats will the type is cameraView
  const [picture, setPicture] = useState<CameraCapturedPicture>();
  const switingCamera = () => {
    setfacing((current) => (current === "back" ? "front" : "back"));
  };
  const [permission, requestPermission] = useCameraPermissions();
  if (permission && !permission.granted && permission.canAskAgain) {
    requestPermission();
  }
  if (!permission?.granted) {
    return <ActivityIndicator />;
  }
  const onPress = async () => {
    if (isRecording) {
      camera.current?.stopRecording();
    } else {
      console.log("comming to picture");
      takePicture();
    }
  };
  const takePicture = async () => {
    const pic = await camera.current?.takePictureAsync();
    setPicture(pic);
  };
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const startRecording = async () => {
    try {
      setIsRecording(true);
      // when switing the camera mode in that time if we access the instant recording then the (recordAnync) method is going to break. thats why we add a 30ms delay here (https://github.com/lodev09/expaw/blob/28672d5a37b4bb12e9e0ae5988b908c08709338b/App.tsx)
      await delay(30);
      const rec = await camera.current?.recordAsync({ maxDuration: 60 });
      console.log(rec);
      setVideo(rec?.uri);
      setIsRecording(false);
    } catch (error) {
      console.log(error, "jl lk ");
    }
  };
  const saveFile = async (uri: string) => {
    const fileName = path.parse(uri).base;
    const destination = FileSystem.documentDirectory + fileName;
    await FileSystem.copyAsync({
      from: uri,
      to: destination,
    });
    setPicture(undefined);
    Alert.alert("Success", `File saved to ${destination}`);
    router.push("/");
  };
  if (picture) {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: picture.uri }}
          style={{ width: "100%", flex: 1 }}
        ></Image>
        <MaterialIcons
          onPress={() => {
            setPicture(undefined);
          }}
          name="close"
          size={35}
          color="white"
          style={{ position: "absolute", top: 20, left: 20 }}
        />
        <View style={{ padding: 10 }}>
          <SafeAreaView edges={["bottom"]}>
            <Button title="Save" onPress={() => saveFile(picture.uri)} />
          </SafeAreaView>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <CameraView
        ref={camera}
        style={styles.camera}
        facing={facing}
        mode={isRecording ? "video" : "picture"}
      >
        <View style={styles.footer}>
          <View />
          <Pressable
            onPress={onPress}
            onLongPress={startRecording}
            style={[
              styles.recordBtn,
              { backgroundColor: isRecording ? "crimson" : "white" },
            ]}
          ></Pressable>
          <MaterialIcons
            name="flip-camera-android"
            size={30}
            color="white"
            onPress={switingCamera}
          ></MaterialIcons>
        </View>
      </CameraView>
      <MaterialIcons
        name="close"
        color="white"
        size={30}
        style={styles.closeIcon}
        onPress={router.back}
      ></MaterialIcons>
    </View>
  );
};

export default CameraScreen;

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
  camera: {
    width: "100%",
    height: "100%",
  },
  closeIcon: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  footer: {
    marginTop: "auto",
    padding: 20,
    paddingBottom: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00000099",
    justifyContent: "space-between",
  },
  recordBtn: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 30,
    borderBlockColor: "red",
    borderWidth: 10,
    borderLeftWidth: 10,
  },
});
