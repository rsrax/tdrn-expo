import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../utils/colors";

const TabBarIcon = ({ focused, iconName, text }) => {
  const iconFocused = focused ? Colors.primary : Colors.secondary;

  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Ionicons name={iconName} size={16} color={iconFocused} />
      <Text style={{ color: iconFocused }}>{text}</Text>
    </View>
  );
};

export default TabBarIcon;
