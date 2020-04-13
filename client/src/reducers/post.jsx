import { GET_POSTS, POST_ERROR,ADD_POST } from '../actions/types'
const initialState = {
    posts: [],
    post: null,
    loading: true,
    errors: []
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false

            }
        case POST_ERROR:
            return {
                ...state,
                errors: payload
            }
        case ADD_POST:
            return{
                ...state,
                posts:[payload,...state.posts],
                loading:false
            }
        default:
            return state
    }
}