import {SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM,POST_SCREAM, SET_SCREAM, LOADING_UI, CLEAR_ERRORS } from '../types';
import axios from 'axios';


//get all screams
export const getScreams = () => async (dispatch) => {
    try {
        dispatch({type:LOADING_DATA});
        const data = await axios.get('/screams');
        dispatch({
            type:SET_SCREAMS,
            payload: data.data
        })

    } catch (err) {console.log(err)
        dispatch({
            type:SET_SCREAMS,
            payload:[]
        })
    }
}

export const getScream = (screamId) => async (dispatch) => {
    try {
        dispatch({type:LOADING_UI});
        const data = await axios.get(`/screams/${screamId}`);
        dispatch({
            type:SET_SCREAM,
            payload : data.data
        })
        dispatch({type:CLEAR_ERRORS})
    } catch (error) {
        console.log(error)
    }
}

export const LikeScream = (screamId) => async (dispatch) => {
    try {
       const data = await axios.get(`/screams/${screamId}/like`);
       dispatch({
           type: LIKE_SCREAM,
           payload: data.data
        })
    } catch (error) {
        console.log(error)
    }
}
 

export const UnLikeScream = (screamId) =>async (dispatch) => {
    try {
        const data = await axios.get(`/screams/${screamId}/unlike`);
        dispatch({
            type: UNLIKE_SCREAM,
            payload: data.data
         })
     } catch (error) {
         console.log(error)
     }
}


export const DeleteScream = (screamId) => async (dispatch) => {
    try {
        await axios.delete(`/screams/${screamId}`);
        dispatch({
            type: DELETE_SCREAM,
            payload: screamId
        })
        return {resolved:true};
    } catch (err) {
        console.log(err)
        return {resolved:false}
    }
}

export const postScream = (body) => async (dispatch) => {
    try {
        const data = await axios.post('/screams',{body});
        console.log(data);
        dispatch({
            type: POST_SCREAM,
            payload: data.data.screamInfo
        })
    } catch (err) {
        console.log(err)
    }
}

