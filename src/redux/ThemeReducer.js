const initialState = { isDarkModeEnabled: false };

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ENABLE_DARK_MODE':
            return { ...state, isDarkModeEnabled: true };
        case 'DISABLE_DARK_MODE':
            return { ...state, isDarkModeEnabled: false };
        default:
            return state;
    }
};
export default themeReducer;
