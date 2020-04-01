import {SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_SCREAM, UNLIKE_SCREAM} from '../types';


//this is the userReducer that will be hold the information in the store for the user
const initialState = {
    authenticated:false,
    loading: false,
    credentials: {},
    likes : [],
    notifications: []
};

export default function (state = initialState,action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated:true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated:true,
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            };
        case LIKE_SCREAM:
            let like = action.payload.screamInfo;
            return {
                ...state,
                likes : [
                    ...state.likes,
                    {
                        userHandle: like.userHandle,
                        createdAt: like.createdAt,
                        screamId: like.screamId
                    }
                ]
            };
        case UNLIKE_SCREAM:
            let remove = action.payload.screamInfo;
            let newLike = state.likes.filter(element=> element.screamId !== remove.screamId);
            return {
                ...state,
                likes :newLike
            }

        default:
            return state;
    }
}