import axios from 'axios';
import { setAlert } from './alert'
import { GET_PROFILE, PROFILE_ERROR } from './types'

//get current profile
export const getCurrentProfile = () => async dispatch => {
        try {
            const res = await axios.get("/api/profile/me")
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response)
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.data.mgs, status: err.response.status }
            })

        }
    }
    //create profile
export const createProfile = (FormData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }
        const res = await axios.post('/api/profile', FormData, config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit ? "Profile Updated" : "Profile created", "success"))
        if (!edit) {
            history.push('/dashboard')
        }
    } catch (err) {
        const errors = err.response
        console.log(errors)
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.mgs, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR
        })
    }
}