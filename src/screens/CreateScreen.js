import React, {useState} from "react";
import {
    Button,
    Image,
    Keyboard,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {addPost} from "../store/reducers/postReducer";

const CreateScreen = ({navigation}) => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const lastId = useSelector(state => state.post.allPosts.sort((a, b) => a.id < b.id)[0].id)
    const img = 'https://static.coindesk.com/wp-content/uploads/2019/01/shutterstock_1012724596-860x430.jpg'

    const saveHandler = () => {
        const post = {
            id: String(+lastId + 1) || String(0),
            date: new Date().toJSON(),
            text,
            img,
            booked: false
        }
        dispatch(addPost(post))
        setText('')
        navigation.navigate('Main')
    }


    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>
                        Create new post
                    </Text>
                    <TextInput
                        style={styles.textarea}
                        placeholder="Enter post's text"
                        value={text}
                        onChangeText={setText}
                        multiline
                    />
                    <Image
                        style={{width: "100%", height: 200, marginBottom: 10}}
                        source={{uri: img}}
                    />
                    <Button
                        title="Create post"
                        disabled={text.length === 0}
                        onPress={saveHandler}
                    />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: "OpenSans-Regular",
        marginVertical: 10
    },
    textarea: {
        padding: 10,
        marginBottom: 10
    }
})

export default CreateScreen