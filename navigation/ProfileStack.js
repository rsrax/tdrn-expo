import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MyProfileScreen from "../screens/MyProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="Welcome" headerMode="none">
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}
