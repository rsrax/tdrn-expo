import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ChatsScreen from "../screens/ChatsScreen";
import Chatting from "../screens/Chatting";

const Stack = createStackNavigator();

export default function ChatStack() {
  return (
    <Stack.Navigator initialRouteName="Chats">
      <Stack.Screen name="Chats" component={ChatsScreen} />
      <Stack.Screen name="Chat" component={Chatting} />
    </Stack.Navigator>
  );
}
