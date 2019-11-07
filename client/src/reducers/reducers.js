import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES } from '../actions/actions';

function visibilityFilter(state = '', action) {    //reducer
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}



function movies(state = [], action) {           //reducer
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
        default:
            return state;
    }
}

const moviesApp = combineReducers({    //combined reducer
    visibilityFilter,
    movies
});


export default moviesApp;