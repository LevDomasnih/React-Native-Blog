import React from "react";
import {FlatList, StyleSheet, View} from "react-native";
import Post from "../components/Post";
import {useSelector} from "react-redux";

const BookedScreen = (props) => {
    const openPostHandler = (post) => {
        props.navigation.navigate("bookedPost", {postId: post.id, date: post.date, booked: post.booked})
    }

    const {bookedPosts} = useSelector(({post}) => post)

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={bookedPosts}
                keyExtractor={post => post.id.toString()}
                renderItem={({item}) => <Post post={item} onOpen={openPostHandler}/>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "center",
    }
})

export default BookedScreen