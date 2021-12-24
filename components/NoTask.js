import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";

export default function NoTask({ title }) {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/blankLogo.png")} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#8D8D8D",
  },
});
