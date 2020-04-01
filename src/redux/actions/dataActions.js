import {SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM} from '../types';
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