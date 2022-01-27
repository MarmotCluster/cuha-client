import forums from '../apis/forums';

const INITIAL_STATE = {
    isSignedIn: null,
    userAccessToken: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_ACCOUNT':
            console.log(action.payload.headers.authorization.replace('Bearer ', ''));

            if (action.payload.data.code !== 401) {
                console.log('체크체크');
                forums.defaults.headers.common['Authorization'] = action.payload.headers.authorization;
            }

            return {
                ...state,
                isSignedIn: true,
                userAccessToken: action.payload.headers.authorization,
            };

        default:
            return state;
    }
};
