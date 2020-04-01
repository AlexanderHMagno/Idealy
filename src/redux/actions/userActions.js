import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER} from '../types';
import axios from 'axios';



export const userCreation = (userData, history) => async (dispatch) => {
    try {
        dispatch({type:LOADING_UI})
        const confirmation = await axios.post('/signup', userData);
        setAuthorizationToken(confirmation.data.token);
        dispatch(getUserData());
        dispatch({type:CLEAR_ERRORS})
        history.push("/");
    } catch (err) {
        dispatch({
            type:SET_ERRORS,
            payload: err.response.data
        })
    }  
}

export const loginUser = (userData,history) => async (dispatch) => {
    try {
        dispatch({type: LOADING_UI});
        const confirmation = await axios.post('/signin', userData);
        setAuthorizationToken(confirmation.data.token);
        dispatch(getUserData());
        dispatch({type:CLEAR_ERRORS})
        history.push("/");
    } catch (err) {
        dispatch({
            type:SET_ERRORS,
            payload:err.response.data
        })
    }  
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBauthToken');
    delete axios.defaults.headers.common.Authorization;
    dispatch({type:SET_UNAUTHENTICATED})
}

export const uploadImage = (formData) => async (dispatch) => {
    dispatch({type: LOADING_USER});
    console.log(formData)
    try {
        await axios.post('/user/image',formData);
        dispatch(getUserData());
    } catch (err) {
        console.log(err)
    }
    
}
export const getUserData = () => async (dispatch) => {
    try {
        dispatch({type:LOADING_USER})
        const user = await axios.get('/user');
        dispatch (
            {type: SET_USER,
            payload:user.data
        })
    } catch (err) {
        console.log(err)
    }

}


export const editUserDetails = (userDetails) => async (dispatch) => {
    dispatch({type:LOADING_USER});
    await axios.post('/user/updateInfo', userDetails);
    dispatch(getUserData());
}
const setAuthorizationToken = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBauthToken', FBIdToken)
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}



