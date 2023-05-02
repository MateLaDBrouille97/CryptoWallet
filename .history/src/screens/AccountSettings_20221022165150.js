import { View, Text, TextInput, StyleSheet, Button, Alert, Pressable, ScrollView } from "react-native";
// import Geocoder from "react-native-geocoding";
import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth, DataStore } from "aws-amplify";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../contexts/AuthContext";
import { User } from "../../models";
// import {
//   GooglePlacesAutocomplete, geocodeByAddress,
//   getLatLng
// } from 'react-native-google-places-autocomplete';

// Geocoder.init("AIzaSyD-q1d3su7d-T8an2pAR3izuB6_y-TbLZA");



const AccountSettings = () => {

  const { dbUser } = useAuthContext();
  const [name, setName] = useState(dbUser?.name || "");
  // const [address, setAddress] = useState(dbUser?.address || "");
  const [coordinates, setCoordinates] = useState(null);
  // const [lat, setLat] = useState(dbUser?.lat  || "0");
  // const [lng, setLng] = useState(dbUser?.lng  || "0");

  const { sub, setDbUser } = useAuthContext();
  // useAuthContext permet d'aller chercher des informations concernant l'utilisateur que l'on va pouvoir utiliser dans d'autres appli sans utiliser de code extra 
  // useAuthContext custom hook qui permet l'export du provider 
  const navigation = useNavigation();
  const ref = useRef();


  useEffect(() => {
    if (dbUser) {
      setName(dbUser.name);
      setAddress(dbUser.address)
      setCoordinates({ lat: dbUser.lat, lng: dbUser.lng });
    }
  }, [dbUser]);

  const onSave = async () => {
    if (dbUser) {
      await updateUser();
    } else {
      await createUser();
    }
    navigation.goBack();
  };

  const updateUser = async () => {
    try {
      const user = await DataStore.save(
        User.copyOf(dbUser, updated => {
          updated.name = name;
          updated.address = address;
          updated.lat = coordinates.lat;
          updated.lng = coordinates.lng;
          updated.sub=dbUser?.sub;
        })

      );

      setDbUser(user);
    }
    catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  const createUser = async () => {
    try {
      const user = await DataStore.save(
        new User({
          name,
          address,
          // lat: parseFloat(lat),
          // lng: parseFloat(lng),
          sub,
        })
      );
      setDbUser(user);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  useEffect(() => {
    ref.current?.setAddressText(address);
  }, []);

  // const onPress = (data, details) => {
  //   let addressloc = details.formatted_address.split(', ');
  //   this.props.handler({
  //     adresse: addressloc[0],
  //     ville: addressloc[1],
  //     postal: addressloc[2].replace('QC ', '')
  //   });

  // };

  // const getAddressLatLng = async (address) => {
  //   setAddress(address);
  //   const geocodedByAddress = await geocodeByAddress(address.label);
  //   const latLng = await getLatLng(geocodedByAddress[0]);
  //   setCoordinates(latLng);
  // };

  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />

      {/* <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
        style={styles.input}
      /> */}

      <ScrollView keyboardShouldPersistTaps="handled">
        <View keyboardShouldPersistTaps="handled" style={styles.input}>
          {/* <GooglePlacesAutocomplete
            ref={ref}
            placeholder='Address'
            minLength={3} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
            listViewDisplayed='true'    // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            components='country:ca'
            // onPress={async (data, details = null) => {   // 1-
              
            //   Geocoder.from(data.description)
            //     .then((json) => {
            //       let location = json.results[0].geometry.location;
            //     })
            //     .catch((error) => console.warn(error));
            //   console.log(data);
            //   setAddress(`${data.terms[0].value} ${data.terms[1].value} ${data.terms[2].value} ${data.terms[3].value} ${data.terms[4].value}`);

            //   const geocodedByAddress = await geocodeByAddress(`${data.terms[0].value} ${data.terms[1].value} ${data.terms[2].value} ${data.terms[3].value} ${data.terms[4].value}`);
            //   const latLng = await getLatLng(geocodedByAddress[0]);
            //   setCoordinates(latLng);
            // }}
            selectProps={{
              value: address,
              onChange: getAddressLatLng,
            }}
            getDefaultValue={() => ''}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyD-q1d3su7d-T8an2pAR3izuB6_y-TbLZA',
              language: 'fr', // language of the results
              types: 'address', // default: 'geocode'
              components: 'country:ca' // added  manually
            }}
            styles={{
              textInputContainer: {
                width: '100%'
              },
              description: {
                fontWeight: 'bold'
              },
              predefinedPlacesDescription: {
                color: '#1faadb'
              }

            }}
            GooglePlacesDetailsQuery={{ fields: 'formatted_address' }}
            debounce={300} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            textInputProps={{
              onChangeText: setAddress
            }}
          /> */}


        </View>
        {/* <View style={ Layouts.Visite.form }>

      // stuff
      
      </View> */}

      </ScrollView>


      <Pressable onPress={onSave} style={styles.button}>
        <Text style={styles.buttonText}>
          Save
        </Text>
      </Pressable>

      {/* {!dbUser &&(<Pressable style={[styles.button, { backgroundColor: "#63b854", padding: 10, margin: 10 }]}
        onPress={onGoHome}>
        <Text style={styles.buttonText}>
          Continue without saving
        </Text>
      </Pressable>)} */}


      {/* <Pressable style={[styles.button, { backgroundColor: "#e07081", padding: 10, margin: 10 }]}
        onPress={() => Auth.signOut()}>
        <Text style={styles.buttonText}>
          Sign out
        </Text>
      </Pressable> */}
      {dbUser && (<Ionicons
        onPress={() => navigation.goBack()}
        name="arrow-back-circle"
        size={45}
        color="white"
        style={styles.iconContainer}
      />)}

    </SafeAreaView>
  )
}

export default AccountSettings;

const styles = StyleSheet.create({
  page: {
    margin: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    margin: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#3777f0",
    marginHorizontal: 10,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#3ec282",
    padding: 10,
    margin: 10
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  iconContainer: {
    position: "absolute",
    top: 45,
    left: 15,
  },
})


/** 1-
 *  Necessite d'utiliser geocoder pour transormer les donnees json pour les stocker dans une variable set 
 */