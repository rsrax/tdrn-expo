import React, { useContext } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { AuthUserContext } from "../navigation/AuthUserProvider";

import useStatusBar from "../hooks/useStatusBar";
import { logout } from "../components/Firebase/firebase";

export default function HomeScreen() {
  const { user } = useContext(AuthUserContext);
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
      <Text>Hello {JSON.stringify(user, null, 2)}</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
