import React from "react";
import {Alert, Button, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {DATA} from "../data";
import THEME from "../theme";

const PostScreen = ({route, navigation }) => {
    const {postId} = route.params

    const post = DATA.find(p => p.id === postId)

    const removeHandler = () => {
        Alert.alert(
            "DELETE POST",
            "A your sure?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {}
                }
            ],
            {cancelable: false}
        );
    }

    return (
        <ScrollView>
            <Image source={{uri: post.img}} style={styles.image} />

            <View style={styles.textWrap}>
                <Text style={styles.title}>
                    {post.text}
                </Text>
            </View>
            <Button title="Delete" color={THEME.DANGER_COLOR} onPress={removeHandler} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    textWrap: {
        padding: 10
    },
    title: {
        fontFamily: "OpenSans-Regular"
    }
})

export default PostScreen