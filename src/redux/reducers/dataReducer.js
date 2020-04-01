import {SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM} from '../types';

const initialState = {
    loading : false,
    screams : [],
    scream: {}
}


export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading:true
            };
        case SET_SCREAMS:
            return {
                ...state,
                loading:false,
                screams: action.payload
            } ;
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            //search the scream and update the index
            let index = state.screams.findIndex(scream => action.payload.screamInfo.screamId === scream.screamId);
            state.screams[index] = action.payload.screamInfo;
            return {...state} ;
        case DELETE_SCREAM:
            let newScreams = state.screams.filter(scream => scream.screamId !== action.payload);
            return {
                ...state,
                screams : newScreams
            }
        default:
            return state;
    }
}