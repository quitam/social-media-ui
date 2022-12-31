import { combineReducers } from 'redux';

import userReducer from './UserReducer';
import postReducer from './PostReducer';
import relaReducer from './RelationReducer';

const mainReducer = combineReducers({
    user: userReducer,
    post: postReducer,
    relation: relaReducer,
});

export default mainReducer;
