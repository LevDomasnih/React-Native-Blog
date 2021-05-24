import React from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {DATA} from "../data";
import Post from "../components/Post";

const MainScreen = (props) => {

    const openPostHandler = (post) => {
        props.navigation.navigate("Post", {postId: post.id, date: post.date, booked: post.booked})
    }

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={DATA}
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

export default MainScreen