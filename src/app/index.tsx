import { StyleSheet, Text, View } from "react-native";
import React from "react";

const index = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assalamolikum</Text>
    </View>
  );
};

export default index;

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
