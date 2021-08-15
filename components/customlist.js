import React, { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { auth, db } from "../components/Firebase/firebase";

const customlist = ({ key, id, chatName, enterChat }) => {
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    const loggedUser = async () => {
      try {
        await db
          .collection("users")
          .doc(user.uid)
          .get()
          .then((curUser) => {
            if (curUser.data()) {
              setUserProfile({ ...userProfile, ...curUser.data() });
            }
          });
      } catch (e) {
        console.log(e);
      }
    };
    return loggedUser;
  }, []);
  return (
    <View key={key}>
      <ListItem onPress={() => enterChat(id, chatName)} bottomDivider>
        <Avatar
          rounded
          source={{
            uri: "https://www.thesprucepets.com/thmb/sfuyyLvyUx636_Oq3Fw5_mt-PIc=/3760x2820/smart/filters:no_upscale()/adorable-white-pomeranian-puppy-spitz-921029690-5c8be25d46e0fb000172effe.jpg",
          }}
        />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "900" }}>
            {chatName}
          </ListItem.Title>
          <ListItem.Subtitle
            numberOfLines={1}
            ellipsizeMode="tail"
          ></ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

export default customlist;

const styles = StyleSheet.create({});
