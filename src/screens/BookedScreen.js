import React from "react";
import {StyleSheet} from "react-native";
import {useSelector} from "react-redux";
import AppFlatList from "../components/AppFlatList";

const BookedScreen = (props) => {
    const {bookedPosts} = useSelector(({post}) => post)

    return (
        <AppFlatList posts={bookedPosts} navTo="bookedPost" {...props}  />
    )
}

const styles = StyleSheet.create({})

export default BookedScreen