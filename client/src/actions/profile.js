import axios from 'axios';
import { setAlert } from './alert'
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, GET_PROFILES } from './types'


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



//get all profiles
export const getAllProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE })
    try {
        const res = await axios.get("/api/profile")
        dispatch({
            type: GET_PROFILES,
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

//get profile by id
export const getProfileById = (userId) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`)
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

//add experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }
        const res = await axios.put('/api/profile/experience', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert("Experience is Added", "success"))
        history.push("dashboard")
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

//add education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }
        const res = await axios.put('/api/profile/education', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert("Education is Added", "success"))
        history.push("/dashboard")
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

//delete experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert("Experience is Deleted", "danger"))
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

//delete education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert("Education is Deleted", "danger"))
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