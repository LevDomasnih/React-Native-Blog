import React from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {DATA} from "../data";
import Post from "../components/Post";

const MainScreen = (props) => {

    const goToPost = () => {
        console.log(props)
        props.navigation.navigate("About")
    }
    return (
        <View style={styles.wrapper}>
            <FlatList
                data={DATA}
                keyExtractor={post => post.id.toString()}
                renderItem={({item}) => <Post post={item}/>}
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