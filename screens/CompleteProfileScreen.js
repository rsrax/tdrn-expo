import React, { useState, useContext } from "react";
import { Button, View, ScrollView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import DropDownPicker from "react-native-dropdown-picker";

import { AuthUserContext } from "../navigation/AuthUserProvider";
import { db } from "../components/Firebase/firebase";
import FormField from "../components/Forms/FormField";
import styles from "../assets/styles";
import Colors from "../utils/colors";

const validationSchema = Yup.object().shape({
  dogName: Yup.string()
    .required("Please enter your dog's name")
    .label("Your dog's name"),
  dogBreed: Yup.string()
    .required("Please enter a breed")
    .label("Your dog's breed"),
  dogGender: Yup.string()
    .required("Please select a gender")
    .label("Your dog's gender"),
  dogAge: Yup.number()
    .truncate()
    .min(0)
    .max(30)
    .required("Please enter an age")
    .label("Your dog's age"),
  dogAbout: Yup.string()
    .required("Please enter 15-150 characters")
    .min(15)
    .max(150)
    .label("Your dog's gender"),
  dogLikes: Yup.string()
    .required("Please enter few details")
    .label("Your dog's likes"),
  dogDislikes: Yup.string()
    .required("Please enter few details")
    .label("Your dog's dislikes"),
  yourCity: Yup.string()
    .required("Please enter the city you're in")
    .label("The city you're in"),
});

const CompleteProfileScreen = ({ navigation, updateComplete }) => {
  const { user } = useContext(AuthUserContext);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);

  const updateProfile = async (values) => {
    await db
      .collection("users")
      .doc(user.uid)
      .set({ ...values, isProfileComplete: true }, { merge: true });
    updateComplete(true);
  };
  return (
    <Formik
      initialValues={{
        dogName: "",
        dogBreed: "",
        dogGender: "",
        dogAge: "",
        dogAbout: "",
        dogLikes: "",
        dogDislikes: "",
        yourCity: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => updateProfile(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
        <ScrollView>
          <View
            style={{
              ...styles.containerCardItem,
              backgroundColor: Colors.secondary,
              padding: 10,
            }}
          >
            <FormField
              name="dogName"
              leftIcon="dog"
              placeholder="Enter your dog's name"
            />
            <FormField
              name="dogBreed"
              leftIcon="dog-side"
              placeholder="Enter your dog's breed"
            />
            <DropDownPicker
              name="dogGender"
              open={open}
              value={values.dogGender}
              items={items}
              setOpen={setOpen}
              setValue={(state) => {
                let newState = state;
                if (typeof state === "function") {
                  newState = state(values.dogGender);
                }
                setFieldValue("dogGender", newState);
              }}
              setItems={setItems}
              listMode="MODAL"
              placeholder="Select your dog's gender"
            />
            <FormField
              name="dogAge"
              leftIcon="paw"
              placeholder="Enter your dog's age"
              keyboardType="number-pad"
              value={(values.dogAge || "").toString()}
              onChangeText={(value) =>
                setFieldValue("dogAge", parseInt(value, 10))
              }
            />
            <FormField
              name="dogAbout"
              leftIcon="dog-side"
              placeholder="Tell us something about your doggo"
              multiline
              numberOfLines={5}
            />
            <FormField
              name="dogLikes"
              leftIcon="bone"
              placeholder="Tell us what your doggo likes"
            />
            <FormField
              name="dogDislikes"
              leftIcon="thumb-down"
              placeholder="Tell us what your doggo dislikes"
            />
            <FormField
              name="yourCity"
              leftIcon="earth"
              placeholder="Enter your city"
            />
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default CompleteProfileScreen;
