import React from "react";
import { View, StyleSheet, Button, Text } from "react-native";

import useStatusBar from "../hooks/useStatusBar";
import { auth, logout } from "../components/Firebase/firebase";

export default function HomeScreen() {
  useStatusBar("dark-content");
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Hello {auth.currentUser.displayName}</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
