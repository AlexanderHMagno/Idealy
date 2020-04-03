import {SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM,SET_SCREAM, POST_COMMENT} from '../types';

const initialState = {
    loading : false,
    screams : [],
    scream: {screamInfo:{}, comments:[]}
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
        case SET_SCREAM:
            return {
                ...state,
                loading:false,
                scream: action.payload
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
        case POST_SCREAM: 
            return {
                ...state,
                screams : [action.payload,...state.screams]
            }
        case POST_COMMENT: 
            let settingScream ={}
            let screamId = action.payload.newComment.screamId;
            settingScream.screamInfo= action.payload.screamInfo;
            settingScream.screamInfo.screamId = screamId;
            let commentCount = settingScream.screamInfo.commentCount+1;
            settingScream.screamInfo.commentCount = commentCount;
            settingScream.comments = [action.payload.newComment,...state.scream.comments]
            let indexScream = state.screams.findIndex(scream => scream.screamId === screamId)
            state.screams[indexScream] = settingScream.screamInfo;
            return {
                ...state,
                scream : {...settingScream}
            }
        default:
            return state;
    }
}