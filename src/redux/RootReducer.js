import { combineReducers } from 'redux';

import userReducer from './UserReducer';
import postReducer from './PostReducer';
import relaReducer from './RelationReducer';
import chatReducer from './ChatReducer';
import themeReducer from './ThemeReducer';

const mainReducer = combineReducers({
    theme: themeReducer,
    user: userReducer,
    post: postReducer,
    relation: relaReducer,
    chat: chatReducer,
});

export default mainReducer;
