import React, {useRef, useState} from "react";
import {
    Button,
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
import PhotoPicker from "../components/PhotoPicker";

const CreateScreen = ({navigation}) => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const imgRef = useRef()

    const lastId = useSelector(state => state.post.allPosts.sort((a, b) => a.id < b.id)[0].id)

    const saveHandler = () => {
        const post = {
            id: String(+lastId + 1) || String(0),
            date: new Date().toJSON(),
            text,
            img: imgRef.current,
            booked: false
        }
        dispatch(addPost(post))
        setText('')
        navigation.navigate('Main')
    }

    const photoPickHandler = (uri) => {
        imgRef.current = uri
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
                    <PhotoPicker onPick={photoPickHandler}/>
                    <Button
                        title="Create post"
                        disabled={!text}
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