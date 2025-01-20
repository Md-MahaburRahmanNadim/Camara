import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
const CameraScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camara screen</Text>
      <Link href="/">Home</Link>
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
});
