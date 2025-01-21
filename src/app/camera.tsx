import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import { Link, router } from "expo-router";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
const CameraScreen = () => {
  const [facing, setfacing] = useState<CameraType>("back");
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
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.footer}>
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
    top: 10,
    left: 10,
  },
  footer: {
    marginTop: "auto",
    padding: 20,
    paddingBottom: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
});
