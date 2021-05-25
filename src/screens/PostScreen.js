import React, {useEffect} from "react";
import {Alert, Button, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import THEME from "../theme";
import {useDispatch, useSelector} from "react-redux";
import {removePost} from "../store/reducers/postReducer";

const PostScreen = ({route, navigation }) => {
    const {postId} = route.params

    const dispatch = useDispatch()

    const {allPosts} = useSelector(({post}) => post)
    const booked = useSelector(({post}) => post.bookedPosts.some(post => post.id === postId))

    const post = allPosts.find(p => p.id === postId)

    useEffect(() => {
        if (post) {
            navigation.setParams({booked})
        }
    }, [booked])

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
                    onPress: () => {
                        navigation.goBack()
                        dispatch(removePost(postId))
                    }
                }
            ],
            {cancelable: false}
        );
    }

    if (!post) return null

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