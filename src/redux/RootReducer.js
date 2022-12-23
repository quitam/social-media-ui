import { combineReducers } from 'redux';

import userReducer from './UserReducer';
import postReducer from './PostReducer';

const mainReducer = combineReducers({
    user: userReducer,
    post: postReducer,
});

export default mainReducer;
