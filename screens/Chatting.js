import React, { useLayoutEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { db, auth } from "../components/Firebase/firebase";
import * as firebase from "firebase";
import { useRef } from "react";
import colors from "../utils/colors";
const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerStyle: {
        backgroundColor: "#ff96ca"
      },
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Avatar
            rounded
            source={{
              uri: "https://www.thesprucepets.com/thmb/sfuyyLvyUx636_Oq3Fw5_mt-PIc=/3760x2820/smart/filters:no_upscale()/adorable-white-pomeranian-puppy-spitz-921029690-5c8be25d46e0fb000172effe.jpg"
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontSize: 19, fontWeight: "800" }}>{route.params.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20
          }}
        >
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )
    });
  }, [navigation]);

  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email
    });
    setInput("");
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot(snapshot =>
        setMessages(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }))
        )
      );

    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        //  behavior={Platform.OS ==="android"?"padding":"height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <>
          <ScrollView ref={scrollViewRef} onContentSizeChange={(contentWidth, contentHeight) => scrollViewRef.current.scrollToEnd({ animated: true })}>
            {messages.map(({ id, data }) =>
              data.email === auth.currentUser.email ? (
                <View key={id} style={styles.reciever}>
                  <Text style={styles.recieverText}>{data.message}</Text>
                </View>
              ) : (
                <View style={styles.sender}>
                  <Text style={styles.senderText}>{data.message}</Text>
                </View>
              )
            )}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput value={input} placeholder="Type a message" style={styles.TextInput} onChangeText={text => setInput(text)} onSubmitEditing={sendMessage} />
            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
              <Ionicons name="send" size={24} color="#2B68E6" />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15
  },
  TextInput: {
    bottom: 1,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    // borderWidth:1,
    padding: 10,
    color: "grey",
    borderRadius: 30
  },
  recieverText: {},
  reciever: {
    padding: 15,
    backgroundColor: colors.secondary,
    alignSelf: "flex-end",
    borderRadius: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 5,
    maxWidth: "80%",
    position: "relative"
  },
  sender: {
    padding: 15,
    backgroundColor: colors.primary,
    alignSelf: "flex-start",
    borderRadius: 10,
    margin: 15,
    maxWidth: "80%",
    position: "relative"
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white"
  }
});
