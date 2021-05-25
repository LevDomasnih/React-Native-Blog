import React, {useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {Alert, Button, Image, StyleSheet, View} from "react-native";

const askForPermissions = async () => {
    const {status} = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.MEDIA_LIBRARY
    )
    if (status !== "granted") {
        Alert.alert("Warning", "No access to make photo")
        return false
    }
    return true
}

const PhotoPicker = ({onPick}) => {
    const [image, setImage] = useState(null)
    const takePhoto = async () => {
        const hasPermissions = await askForPermissions()

        if(!hasPermissions) {
            return
        }

        const img = await ImagePicker.launchCameraAsync({
            quality: 0.7,
            allowsEditing: false, // true
            aspect: [16, 9]
        })

        setImage(img.uri)
        onPick(img.uri)
    }
    return (
        <View style={styles.wrapper}>
            <Button title="Make photo" onPress={takePhoto} />
            {image && <Image style={styles.image} source={{uri: image}} />}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10
    },
    image: {
        width: "100%",
        height: 200,
        marginTop: 10
    }
})

export default PhotoPicker

