import React, {useEffect} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import Post from "../components/Post";
import {useDispatch, useSelector} from "react-redux";
import {loadPosts} from "../store/reducers/postReducer";

const MainScreen = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadPosts())
    }, [dispatch])

    const {allPosts} = useSelector(({post}) => post)

    const openPostHandler = (post) => {
        props.navigation.navigate("Post", {postId: post.id, date: post.date, booked: post.booked})
    }

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={allPosts}
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