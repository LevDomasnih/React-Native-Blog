import React from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import Post from "./Post";

const AppFlatList = ({navigation, posts, navTo}) => {

    const openPostHandler = (post) => {
        navigation.navigate(navTo, {postId: post.id, date: post.date, booked: post.booked})
    }

    if (!posts.length) {
        return (
            <View style={styles.noData}>
                <Text>No posts!</Text>
            </View>
        )
    }

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={posts}
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
    },
    noData: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    }
})

export default AppFlatList