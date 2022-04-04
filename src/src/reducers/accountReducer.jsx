import jwtDecode from 'jwt-decode';
import forums from '../apis/forums';

const INITIAL_STATE = {
    recentCallResponse: null,
    isSignedIn: null,
    userAccessToken: null,
    isAdmin: null,
    profileImageUrl: null,
    isShown180daysPasswordLimitation: false,
    fromToken: null,
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
                recentCallResponse: 'LOGIN_SUCCEED',
                isSignedIn: true,
                userAccessToken: action.payload.data.token.accessToken,
                fromToken: jwtDecode(action.payload.data.token.accessToken),
                isAdmin: jwtDecode(action.payload.data.token.accessToken).username === 'root' ? true : false,
            };

        case 'LOGOUT':
            forums.defaults.headers.common['Authorization'] = '';

            return {
                ...state,
                recentCallResponse: 'LOGOUT_SUCCEED',
                isSignedIn: false,
                userAccessToken: null,
            };

        case 'DISMISS_PW180':
            return {
                ...state,
                recentCallResponse: 'DISMISSED_INSTANT_CHANGE_PASSWORD',
                isShown180daysPasswordLimitation: true,
            };

        case 'UPDATE_ACCOUNT':
            return action.payload; //사실 별 할게 없음

        case 'FETCH_FAILED':
            return {
                ...state,
                recentCallResponse: 'FETCH_FAILED',
            };

        default:
            return state;
    }
};
