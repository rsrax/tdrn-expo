import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { AuthUserContext } from "../navigation/AuthUserProvider";
import CardStack, { Card } from "react-native-card-stack-swiper";

import useStatusBar from "../hooks/useStatusBar";
import { db } from "../components/Firebase/firebase";

export default function HomeScreen() {
  const { user } = useContext(AuthUserContext);
  const [userList, setUserList] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [swiper, setSwiper] = useState(null);
  const [match,setMatch] = useState(true);
  const userLiked = [];
  const userRejected = [];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let list = [];
        console.log(userProfile);
        db.collection("users")
        .where("uid","not-in",[...userProfile.liked])
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((user) => {
              list.push(user.data());
              console.log(user.data());
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

  const fun = async (index) => {
    await db.collection("users")
        .doc(user.uid)
        .set({matches:[ ...userProfile.matches, userList[index].uid ]}, { merge: true });

        // console.log(userList[index].uid);
        // await db.collection("users")
        // .doc(userList[index].uid)
        // .set({matches:[...userList[index].matches,userProfile.uid]}, { merge: true });    
  }

  const fun1 = async (index) => {
        await db.collection("users")
        .doc(userList[index].uid)
        .set({matches:[...userList[index].matches,userProfile.uid]}, { merge: true });    
  }

  const matfun = async(index) => {
    console.log(userList[index].uid);
    await db
      .collection("users")
      .doc(userList[index].uid)
      .get()
      .then((curUser)=>{
        if(curUser.liked.indexOf(userProfile.uid)>=0)
        {
          
    console.log(curUser.data());
          fun1(index);
          fun(index);
        }
      });
  }

  const RightSwiped = async (index) => {
    userLiked.push(userList[index].uid);
    await db
      .collection("users")
      .doc(user.uid)
      .set({liked:[ ...userProfile.liked, ...userLiked ]}, { merge: true });

    matfun(index);

      /*await db.collection("users")
        .doc(user.uid)
        .set({matches:[ ...userProfile.matches, userList[index].uid ]}, { merge: true });
      //fun(index);
      await db
      .collection("users")
      .doc(user.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((user) => {
          if(user.liked.indexOf(userProfile.uid)>=0)
            {
              fun(index);
              fun1(index);
            }
        })
      })*/
  };

  const LeftSwiped = async (index) => {
    userRejected.push(userList[index].uid);
    await db
      .collection("users")
      .doc(user.uid)
      .set({rejected:[ ...userProfile.rejected, ...userRejected ]}, { merge: true });
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
              
              <View style={styles.user} key={userL.uid}>
                <Card style={[styles.card, styles.card1]}>
                  <Image source={{uri: userL.photoURL}} style={styles.image} />
                  <Text style={styles.label}>{JSON.stringify(userL.dogName)}</Text>
                </Card>
              </View>
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
    textAlign: "center",
    fontSize: 30,
    fontFamily: "System",
    color: "#F63A6E",
    backgroundColor: "#ffffff",
  },
  
  image: {
    width: '100%',
    height: '100%',
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
