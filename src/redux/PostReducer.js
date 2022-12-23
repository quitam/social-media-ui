const initialState = {
    listPost: [],
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_LISTPOST':
            return {
                ...state,
                listPost: action.listPost,
            };

        default:
            return state;
    }
};

export default postReducer;
