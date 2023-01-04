import { combineReducers } from 'redux';

import userReducer from './UserReducer';
import postReducer from './PostReducer';
import relaReducer from './RelationReducer';
import chatReducer from './ChatReducer';

const mainReducer = combineReducers({
    user: userReducer,
    post: postReducer,
    relation: relaReducer,
    chat: chatReducer,
});

export default mainReducer;
