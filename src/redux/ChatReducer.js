const initialState = {
    currentRoom: {},
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_CURRENTROOM':
            return {
                ...state,
                currentRoom: action.currentRoom,
            };
        default:
            return state;
    }
};

export default chatReducer;
