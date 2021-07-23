import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthUserContext } from "../navigation/AuthUserProvider";
import { Ionicons } from "@expo/vector-icons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import ProfileCard from "../components/ProfileCard";
import styles, { WHITE } from "../assets/styles";
import { db, logout } from "../components/Firebase/firebase";
import Spinner from "../components/Spinner";

const MyProfileScreen = ({ navigation }) => {
  const { user } = useContext(AuthUserContext);
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        await db
          .collection("users")
          .doc(user.uid)
          .get()
          .then((curUser) => {
            if (curUser.data()) {
              setUserProfile({ ...userProfile, ...curUser.data() });
              if (isLoading) {
                setIsLoading(false);
              }
            }
          });
      } catch (e) {
        console.log(e);
      }
    };
    getUserProfile();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView>
      <ImageBackground
        source={{
          uri:
            userProfile.photoURL ||
            "https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg?size=626&ext=jpg",
        }}
        style={styles.photo}
      >
        <View style={styles.top}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Ionicons
              name="chevron-back"
              size={20}
              color={WHITE}
              style={styles.topIconLeft}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Menu>
              <MenuTrigger>
                <Ionicons
                  name="ellipsis-vertical"
                  size={20}
                  color={WHITE}
                  style={styles.topIconRight}
                />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption
                  onSelect={() =>
                    navigation.push("EditProfile", { userProfile })
                  }
                  text="Edit Profile"
                />
                <MenuOption onSelect={() => handleSignOut()}>
                  <Text style={{ color: "red" }}>Sign out</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <ProfileCard
        age={`${userProfile.dogAge} Yrs`}
        breedGender={`a ${userProfile.dogGender} ${userProfile.dogBreed}`}
        about={userProfile.dogAbout}
        likes={userProfile.dogLikes}
        dislikes={userProfile.dogDislikes}
        location={userProfile.yourCity}
        name={userProfile.dogName}
      />
    </ScrollView>
  );
};

export default MyProfileScreen;
