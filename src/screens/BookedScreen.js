import React from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {DATA} from "../data";
import Post from "../components/Post";

const BookedScreen = (props) => {
    const openPostHandler = (post) => {
        props.navigation.navigate("bookedPost", {postId: post.id, date: post.date, booked: post.booked})
    }

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={DATA.filter(e => e.booked)}
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