import forums from '../apis/forums';

const INITIAL_STATE = {
    isSignedIn: null,
    userAccessToken: null,
    isAdmin: null,
    profileImageUrl: null,
    isShown180daysPasswordLimitation: false,
};

export const dispatchDismissPw180 = (payload) => ({ type: 'DISMISS_PW180' });

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN':
            if (action.payload.data.code === 200) {
                forums.defaults.headers.common['Authorization'] = action.payload.data.token.accessToken;
            }

            return {
                ...state,
                isSignedIn: true,
                userAccessToken: action.payload.data.token.accessToken,
            };

        case 'LOGOUT':
            forums.defaults.headers.common['Authorization'] = '';

            return {
                ...state,
                isSignedIn: false,
                userAccessToken: null,
            };

        case 'DISMISS_PW180':
            return {
                ...state,
                isShown180daysPasswordLimitation: true,
            };

        default:
            return state;
    }
};
