const initialState = {
    user: JSON.parse(localStorage.getItem('user')),
    token: localStorage.getItem('token'),
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                user: action.user,
                token: action.token,
            };
        case 'UPDATE_USER':
            return {
                ...state,
                user: action.user,
            };

        case 'LOGOUT_USER':
            return {
                ...state,
                user: null,
                token: null,
            };
        default:
            return state;
    }
};

export default userReducer;
