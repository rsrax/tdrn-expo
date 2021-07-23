import React, { useState, useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthUserContext } from "./AuthUserProvider";
import { db } from "../components/Firebase/firebase";
import CompleteProfileScreen from "../screens/CompleteProfileScreen";
import Spinner from "../components/Spinner";
import AppTabs from "./AppTabs";
import colors from "../utils/colors";

const Stack = createStackNavigator();

export default function AppStack() {
  const { user } = useContext(AuthUserContext);
  const [profileComplete, setProfileComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkProfileComplete = async () => {
      try {
        await db
          .collection("users")
          .doc(user.uid)
          .get()
          .then((curUser) => {
            if (curUser.data().isProfileComplete) {
              setProfileComplete(true);
              if (isLoading) {
                setIsLoading(false);
              }
            }
          });
      } catch (e) {
        console.log(e);
      }
    };
    checkProfileComplete();
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        title: "My home",
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          alignSelf: "center",
        },
      }}
    >
      {isLoading ? <Stack.Screen name="Loading" component={Spinner} /> : null}
      {!profileComplete ? (
        <Stack.Screen
          name="CompleteProfile"
          component={CompleteProfileScreen}
        />
      ) : null}
      <Stack.Screen name="Home" component={AppTabs} />
    </Stack.Navigator>
  );
}
