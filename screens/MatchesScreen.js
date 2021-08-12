import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { AuthUserContext } from "../navigation/AuthUserProvider";
import CardStack, { Card } from "react-native-card-stack-swiper";

//import useStatusBar from "../hooks/useStatusBar";
import { db } from "../components/Firebase/firebase";

export default function HomeScreen() {
  const { user } = useContext(AuthUserContext);
  const [userList, setUserList] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let list = [];
        db.collection("users")
        .where("uid","in",[...userProfile.matches])
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
   loggedUser();
   fetchUsers();
  }, []);

  return(
  <View style={styles.container}>
        <Text style={{fontWeight: 'bold', fontSize: 24, color: '#F63A6E', textAlign: 'center', marginBottom: 10}}>
          Matches
        </Text>
        <ScrollView>
        <View style={styles.users}>
          {userList.map(userL => (
            <View style={styles.user} key={userL.uid}>
              <Card style={styles.card}>
              <Image source={{uri: userL.photoURL}} style={styles.image} />
              <Text style={styles.label}>{JSON.stringify(userL.dogName)}</Text>
            </Card>
            </View>
          ))}
        </View>
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  users: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  user: {
    width: 175,
    height: 350,
    margin: 7,
    padding: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  card: {
    width: 175,
    height: 300,
    borderRadius: 5,
    borderColor: '#F63A6E',
  },
  label: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "System",
    color: "#F63A6E",
  },
});
