import React, {useEffect} from "react";
import {StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {loadPosts} from "../store/reducers/postReducer";
import AppFlatList from "../components/AppFlatList";

const MainScreen = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadPosts())
    }, [dispatch])

    const {allPosts} = useSelector(({post}) => post)

    return (
        <AppFlatList posts={allPosts} navTo="Post" {...props} />
    )
}

const styles = StyleSheet.create({

})

export default MainScreen