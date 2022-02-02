import forums from '../apis/forums';
import history from '../history';

export const fetchAccount = (_id, pw) => async (dispatch) => {
    let _data = {
        username: _id,
        password: pw,
    };

    // history.push('/info');

    const res = await forums.post(`/members/login`, JSON.stringify(_data));

    console.log(res);

    dispatch({
        type: 'FETCH_ACCOUNT',
        payload: res,
    });
};

export const logoutAccount = () => async (dispatch) => {
    dispatch({
        type: 'LOGOUT',
        payload: null,
    });

    // history.push('/');
};
