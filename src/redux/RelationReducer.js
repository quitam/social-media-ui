const initialState = {
    status: 'ADD FRIEND',
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_RELATION':
            return {
                status: action.status,
            };
        default:
            return state;
    }
};

export default postReducer;
