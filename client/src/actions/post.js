import axios from 'axios'
import { GET_POSTS, POST_ERROR, ADD_POST } from './types'
import { setAlert } from './alert'

//get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get("/api/posts")
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.data.mgs, status: err.response.status }
        })
    }
}

//addd new post
export const addPost = post => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        console.log(post)
        const res = await axios.post('/api/posts', post, config)
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(setAlert("Post Added", "success"))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.data.mgs, status: err.response.status }
        })
    }


}