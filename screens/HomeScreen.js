import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { AuthUserContext } from "../navigation/AuthUserProvider";

import useStatusBar from "../hooks/useStatusBar";
import { db, logout } from "../components/Firebase/firebase";

export default function HomeScreen() {
  const { user } = useContext(AuthUserContext);
  const [userList, setUserList] = useState([]);
  const users = () => {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        const allUsers = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((curUser) => curUser.email !== user.email);
        // do something with documents
        console.log(allUsers);
        setUserList([...allUsers]);
      });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let list = [];
        db.collection("users")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((user) => {
              list.push(user.data());
            });
            list = list.filter((curUser) => curUser.email !== user.email);
            setUserList(list);
          });
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

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
      <Text>{JSON.stringify(userList, null, 2)}</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
