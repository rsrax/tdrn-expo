import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { AuthUserContext } from "../navigation/AuthUserProvider";
import CardStack, { Card } from "react-native-card-stack-swiper";

import useStatusBar from "../hooks/useStatusBar";
import { db } from "../components/Firebase/firebase";

export default function HomeScreen() {
  const { user } = useContext(AuthUserContext);
  const [userList, setUserList] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [swiper, setSwiper] = useState(null);

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
    const loggedUser = async () => {
      try {
        await db
          .collection("users")
          .doc(user.uid)
          .get()
          .then((curUser) => {
            if (curUser.data()) {
              setLoggedUser({ ...userProfile, ...curUser.data() });
            }
          });
      } catch (e) {
        console.log(e);
      }
    };
    fetchUsers();
  }, []);

  const RightSwiped = async (index) => {
    await db
      .collection("users")
      .doc(user.uid)
      .set({liked:[ ...userProfile.liked, loggedUser.uid ]}, { merge: true });
  };

  const LeftSwiped = async (index) => {
    await db
      .collection("users")
      .doc(user.uid)
      .set({rejected:[ ...userProfile.rejected, loggedUser.uid ]}, { merge: true });
  };

  useStatusBar("dark-content");

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <CardStack
          style={styles.content}
          renderNoMoreCards={() => (
            <Text style={{ fontWeight: "700", fontSize: 18, color: "gray" }}>
              No more cards
            </Text>
          )}
          ref={(newSwiper) => {
            setSwiper(newSwiper);
          }}
          onSwipedRight={(index) => RightSwiped(index)}
          onSwipedLeft={(index) => LeftSwiped(index)}
        >
          {userList.map((userL) => {
            return (
              <Card style={[styles.card, styles.card1]}>
                <Text style={styles.label}>
                  {JSON.stringify(userL.dogName)}
                </Text>
              </Card>
            );
          })}
        </CardStack>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 320,
    height: 470,
    backgroundColor: "#FE474C",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  card1: {
    backgroundColor: "#FE474C",
  },
  card2: {
    backgroundColor: "#FEB12C",
  },
  label: {
    lineHeight: 400,
    textAlign: "center",
    fontSize: 55,
    fontFamily: "System",
    color: "#ffffff",
    backgroundColor: "transparent",
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: 220,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  },
  orange: {
    width: 55,
    height: 55,
    borderWidth: 6,
    borderColor: "rgb(246,190,66)",
    borderRadius: 55,
    marginTop: -15,
  },
  green: {
    width: 75,
    height: 75,
    backgroundColor: "#fff",
    borderRadius: 75,
    borderWidth: 6,
    borderColor: "#01df8a",
  },
  red: {
    width: 75,
    height: 75,
    backgroundColor: "#fff",
    borderRadius: 75,
    borderWidth: 6,
    borderColor: "#fd267d",
  },
});
