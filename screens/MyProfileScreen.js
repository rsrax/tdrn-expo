import React, { useContext } from "react";
import {
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthUserContext } from "../navigation/AuthUserProvider";
import { Ionicons } from "@expo/vector-icons";

import ProfileCard from "../components/ProfileCard";
import styles, { WHITE } from "../assets/styles";

const MyProfileScreen = () => {
  const { user } = useContext(AuthUserContext);
  return (
    <ScrollView>
      <Text>My Profile</Text>

      <Text>Hello {JSON.stringify(user, null, 2)}</Text>
      <ImageBackground
        source={{
          uri:
            user.photoURL ||
            "https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg?size=626&ext=jpg",
        }}
        style={styles.photo}
      >
        <View style={styles.top}>
          <TouchableOpacity>
            <Ionicons
              name="chevron-back"
              size={20}
              color={WHITE}
              style={styles.topIconLeft}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons
              name="ellipsis-vertical"
              size={20}
              color={WHITE}
              style={styles.topIconRight}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <ProfileCard
        age="24"
        info1="Hello"
        info2="Hello"
        info3="Hello"
        info4="Hello"
        location="Ahmedabad"
        name={user.displayName}
      />
    </ScrollView>
  );
};

export default MyProfileScreen;
