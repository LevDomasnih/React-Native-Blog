import React from "react";
import {StyleSheet, Text, View} from "react-native";

const AboutScreen = ({}) => {
    return (
        <View style={styles.center}>
            <Text>
                ABOUT SCREEN TITLE
            </Text>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio impedit libero pariatur provident quam quis repellat reprehenderit. Aliquid animi aspernatur atque delectus ea exercitationem laboriosam quod repellendus vero voluptates! Dolores.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        padding: 20,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default AboutScreen