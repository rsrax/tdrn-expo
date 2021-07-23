import React, { useState, useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthUserContext } from "./AuthUserProvider";
import HomeScreen from "../screens/HomeScreen";
import { db } from "../components/Firebase/firebase";
import CompleteProfileScreen from "../screens/CompleteProfileScreen";
import Spinner from "../components/Spinner";

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
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Stack.Navigator>
      {!profileComplete ? (
        <Stack.Screen
          name="CompleteProfile"
          component={CompleteProfileScreen}
        />
      ) : null}
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
