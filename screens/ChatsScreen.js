import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollViewBase, Touchable, TouchableOpacity } from "react-native";
import { SafeAreaView, ScrollView } from "react-native";
import { StyleSheet, Text, View, Button } from "react-native";
import CustomList from "../components/customlist";
//import { auth, db } from "../components/Firebase/firebase_chat";
import { auth, db } from "../components/Firebase/firebase";

const ChatsScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [dogName, setDogName] = useState([]);
  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot(snapshot =>
      setChats(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      )
    );
    const subscribe = db
      .collection("users")
      .where("email", "==", auth.currentUser.email)
      .onSnapshot(snapshot =>
        setUsers(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }))
        )
      );
    {
      users.map(({ id, data: { dogName } }) => setDogName(dogName));
    }
    return unsubscribe, subscribe;
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerRight: () => {}
    });
  }, []);

  const enterChat = (id, chatName) => {
    navigation.push("Chat", {
      id,
      chatName
    });
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>{chats.map(({ id, data: { User1, User2 } }) => (dogName == User1 || dogName == User2 ? dogName == User1 ? <CustomList key={id} id={id} chatName={User2} enterChat={enterChat} /> : <CustomList key={id} id={id} chatName={User1} enterChat={enterChat} /> : <View></View>))}</ScrollView>
    </SafeAreaView>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
