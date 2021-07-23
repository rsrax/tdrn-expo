import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ScrollView,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import DropDownPicker from "react-native-dropdown-picker";
// import ImagePicker from "react-native-image-crop-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";

import { db, storage } from "../components/Firebase/firebase";
import FormField from "../components/Forms/FormField";
import Styles from "../assets/styles";
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

const EditProfileScreen = ({ navigation, route }) => {
  const userProfile = route.params.userProfile;
  const [image, setImage] = useState(userProfile.photoURL);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const { camStatus } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const updateProfile = async (values) => {
    let photoURL = await uploadImageAsync(image);
    if (photoURL === null && userProfile.photoURL !== null) {
      photoURL = userProfile.photoURL;
    }
    await db
      .collection("users")
      .doc(userProfile.uid)
      .set({ ...values, photoURL }, { merge: true });
    navigation.pop();
  };

  let bs = React.createRef();
  let fall = new Animated.Value(1);

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}
      >
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}
      >
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const takePhotoFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const choosePhotoFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const ref = storage.ref().child(`photos/${uuid.v4()}`);
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }

  return (
    <Formik
      initialValues={{
        dogName: userProfile.dogName,
        dogBreed: userProfile.dogBreed,
        dogGender: userProfile.dogGender,
        dogAge: userProfile.dogAge,
        dogAbout: userProfile.dogAbout,
        dogLikes: userProfile.dogLikes,
        dogDislikes: userProfile.dogDislikes,
        yourCity: userProfile.yourCity,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => updateProfile(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
        <ScrollView>
          <BottomSheet
            ref={bs}
            snapPoints={[550, 0]}
            renderContent={renderInner}
            renderHeader={renderHeader}
            initialSnap={1}
            callbackNode={fall}
            enabledGestureInteraction={true}
          />
          <Animated.View
            style={{
              margin: 20,
              opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
            }}
          >
            <View
              style={{
                ...Styles.containerCardItem,
                backgroundColor: Colors.secondary,
                padding: 10,
              }}
            >
              <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                <View
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ImageBackground
                    source={{
                      uri: image,
                    }}
                    style={{ height: 100, width: 100 }}
                    imageStyle={{ borderRadius: 15 }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="camera"
                        size={35}
                        color="#fff"
                        style={{
                          opacity: 0.7,
                          alignItems: "center",
                          justifyContent: "center",
                          borderWidth: 1,
                          borderColor: "#fff",
                          borderRadius: 10,
                        }}
                      />
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
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
          </Animated.View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});
