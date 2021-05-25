import {DATA} from "../../data";

const LOAD_POSTS = "LOAD_POSTS"
const TOGGLE_BOOKED = "TOGGLE_BOOKED"

const initialState = {
    allPosts: [],
    bookedPosts: []
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_POSTS:
            return {
                ...state,
                allPosts: action.payload,
                bookedPosts: action.payload.filter(post => post.booked)
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
        default:
            return state
    }
}

export default postReducer

export const loadPosts = () => ({type: LOAD_POSTS, payload: DATA})
export const toggleBooked = (id) => ({type: TOGGLE_BOOKED, payload: id})