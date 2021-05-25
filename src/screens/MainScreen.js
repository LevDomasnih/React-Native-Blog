import React, {useEffect} from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {loadPosts} from "../store/reducers/postReducer";
import AppFlatList from "../components/AppFlatList";
import THEME from "../theme";

const MainScreen = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => dispatch(loadPosts()), 5000) // test on loading

    }, [dispatch])

    const {allPosts} = useSelector(({post}) => post)
    const {loading} = useSelector(({post}) => post)


    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator color={THEME.MAIN_COLOR} />
            </View>
        )
    }

    return (
        <AppFlatList posts={allPosts} navTo="Post" {...props} />
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default MainScreen