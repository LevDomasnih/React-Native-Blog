import DB from "../../db";
import * as FileSystem from 'expo-file-system';

const LOAD_POSTS = "LOAD_POSTS"
const TOGGLE_BOOKED = "TOGGLE_BOOKED"
const REMOVE_POST = "REMOVE_POST"
const ADD_POST = "ADD_POST"

const initialState = {
    allPosts: [],
    bookedPosts: [],
    loading: true
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_POSTS:
            return {
                ...state,
                allPosts: action.payload,
                bookedPosts: action.payload.filter(post => post.booked),
                loading: false
            }
        case TOGGLE_BOOKED:
            return {
                ...state,
                bookedPosts: state.allPosts.map(post => {
                    if (post.id !== action.payload) return post
                    post.booked = !post.booked
                    return post
                }).filter(post => post.booked)
            }
        case REMOVE_POST:
            return {
                ...state,
                allPosts: state.allPosts.filter(post => post.id !== action.payload),
                bookedPosts: state.bookedPosts.filter(post => post.id !== action.payload)
            }
        case ADD_POST:
            return {
                ...state,
                allPosts: [...state.allPosts, action.payload]
            }
        default:
            return state
    }
}

export default postReducer

export const loadPosts = () => async (dispatch) => {
    const posts = await DB.getPosts()

    dispatch({type: LOAD_POSTS, payload: posts})
}
export const toggleBooked = (id) => async (dispatch, getState) => {
    const post = await getState().post.allPosts.find(post => post.id === id)
    await DB.updatePost(post)

    dispatch({type: TOGGLE_BOOKED, payload: id})
}
export const removePost = (id) => async (dispatch) => {
    await DB.removePost(id)
    dispatch({type: REMOVE_POST, payload: id})
}
export const addPost = (post) => async (dispatch) => {
    const fileName = post.img.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileName

    try {
        await FileSystem.moveAsync({
            to: newPath,
            from: post.img
        })
    } catch (e) {
        console.log("Error: ", e)
    }

    const payload = {...post, img: newPath}

    payload.id = await DB.createPost(payload)

    dispatch({type: ADD_POST, payload})
}