import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles, { DARK_GRAY, WHITE } from "../assets/styles";

const ProfileCard = ({ age, info1, info2, info3, info4, location, name }) => (
  <View style={styles.containerProfileItem}>
    <Text style={styles.name}>{name}</Text>

    <Text style={styles.descriptionProfileItem}>
      {age} - {location}
    </Text>

    <View style={styles.info}>
      <Text style={styles.iconProfile}>
        <Ionicons name="person" size={20} color={DARK_GRAY} />
      </Text>
      <Text style={styles.infoContent}>{info1}</Text>
    </View>

    <View style={styles.info}>
      <Text style={styles.iconProfile}>
        <Ionicons name="pizza" size={20} color={DARK_GRAY} />
      </Text>
      <Text style={styles.infoContent}>{info2}</Text>
    </View>

    <View style={styles.info}>
      <Text style={styles.iconProfile}>
        <Ionicons name="airplane" size={20} color={DARK_GRAY} />
      </Text>
      <Text style={styles.infoContent}>{info3}</Text>
    </View>

    <View style={styles.info}>
      <Text style={styles.iconProfile}>
        <Ionicons name="calendar" size={20} color={DARK_GRAY} />
      </Text>
      <Text style={styles.infoContent}>{info4}</Text>
    </View>
  </View>
);

export default ProfileCard;
