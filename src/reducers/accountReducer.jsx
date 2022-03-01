import forums from '../apis/forums';

const INITIAL_STATE = {
    isSignedIn: null,
    userAccessToken: null,
    isAdmin: null,
    profileImageUrl: null,
    isShown180daysPasswordLimitation: false,
    loginData: null,
};

export const dispatchDismissPw180 = (payload) => ({ type: 'DISMISS_PW180' });

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN':
            // console.log(`로그인이 잘 되면 리덕스에서 콘솔 : ${action.payload}`);

            if (action.payload.data.code === 200) {
                forums.defaults.headers.common['Authorization'] = action.payload.data.token.accessToken;
            }

            return {
                ...state,
                isSignedIn: true,
                userAccessToken: action.payload.data.token.accessToken,
                loginData: action.payload.data,
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

        case 'UPDATE_ACCOUNT':
            return action.payload;

        default:
            return state;
    }
};
