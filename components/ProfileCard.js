import React from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles, { DARK_GRAY } from "../assets/styles";

const ProfileCard = ({
  age,
  breedGender,
  about,
  likes,
  dislikes,
  location,
  name,
}) => (
  <View style={styles.containerProfileItem}>
    <Text style={styles.name}>{name}</Text>

    <Text style={styles.descriptionProfileItem}>
      {age} - {location}
    </Text>

    <View style={styles.info}>
      <Text style={styles.iconProfile}>
        <MaterialCommunityIcons name="dog" size={20} color={DARK_GRAY} />
      </Text>
      <Text style={styles.infoContent}>{breedGender}</Text>
    </View>

    <View style={styles.info}>
      <Text style={styles.iconProfile}>
        <MaterialCommunityIcons name="book" size={20} color={DARK_GRAY} />
        <Text style={styles.infoContent}>About</Text>
      </Text>
      <Text style={styles.infoContent}>{about}</Text>
    </View>

    <View style={styles.info}>
      <Text style={styles.iconProfile}>
        <MaterialCommunityIcons name="thumb-up" size={20} color={DARK_GRAY} />
      </Text>
      <Text style={styles.infoContent}>{likes}</Text>
    </View>

    <View style={styles.info}>
      <Text style={styles.iconProfile}>
        <MaterialCommunityIcons name="thumb-down" size={20} color={DARK_GRAY} />
      </Text>
      <Text style={styles.infoContent}>{dislikes}</Text>
    </View>
  </View>
);

export default ProfileCard;
