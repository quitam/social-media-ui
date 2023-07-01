const storedTheme = localStorage.getItem('darkTheme');
const defaultTheme = storedTheme ? storedTheme === 'true' : false;
const initialState = { isDarkModeEnabled: defaultTheme };

const storyState = { isOpen: false, indexSlide: 0 };

export const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ENABLE_DARK_MODE':
            return { ...state, isDarkModeEnabled: true };
        case 'DISABLE_DARK_MODE':
            return { ...state, isDarkModeEnabled: false };
        default:
            return state;
    }
};

export const storyReducer = (state = storyState, action) => {
    switch (action.type) {
        case 'OPEN_STORY':
            return { ...state, isOpen: true, indexSlide: action.indexSlide };
        case 'CLOSE_STORY':
            return { ...state, isOpen: false };
        default:
            return state;
    }
};
