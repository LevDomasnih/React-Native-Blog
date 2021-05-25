const LOAD_POSTS = "LOAD_POSTS"
const TOGGLE_BOOKED = "TOGGLE_BOOKED"
const REMOVE_POST = "REMOVE_POST"
const ADD_POST = "ADD_POST"

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

export const loadPosts = () => ({type: LOAD_POSTS, payload: []})
export const toggleBooked = (id) => ({type: TOGGLE_BOOKED, payload: id})
export const removePost = (id) => ({type: REMOVE_POST, payload: id})
export const addPost = (post) => ({type: ADD_POST, payload: post})