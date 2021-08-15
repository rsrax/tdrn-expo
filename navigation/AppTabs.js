import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import MatchesScreen from "../screens/MatchesScreen";
import ChatStack from "./ChatStack";
import ProfileStack from "./ProfileStack";
import { Colors } from "react-native/Libraries/NewAppScreen";
import TabBarIcon from "../components/TabBarIcon";

const AppTabs = createBottomTabNavigator();

const AppTabsScreen = () => {
  return (
    <AppTabs.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: Colors.primary,
        inactiveTintColor: Colors.secondary,
        labelStyle: {
          fontSize: 14,
          textTransform: "uppercase",
          paddingTop: 10
        },
        style: {
          backgroundColor: Colors.white,
          borderTopWidth: 0,
          marginBottom: 0,
          shadowOpacity: 0.05,
          shadowRadius: 10,
          shadowColor: Colors.black,
          shadowOffset: { height: 0, width: 0 }
        }
      }}
    >
      <AppTabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} iconName="search" text="Explore" />
        }}
      />
      <AppTabs.Screen
        name="Matches"
        component={MatchesScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} iconName="heart" text="Matches" />
        }}
      />
      <AppTabs.Screen
        name="Chats"
        component={ChatStack}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} iconName="chatbubble" text="Chat" />
        }}
      />
      <AppTabs.Screen
        name="My Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} iconName="person" text="Profile" />
        }}
      />
    </AppTabs.Navigator>
  );
};

export default AppTabsScreen;
