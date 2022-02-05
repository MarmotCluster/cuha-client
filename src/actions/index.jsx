import axios from 'axios';
import forums from '../apis/forums';
import history from '../history';

export const testAxios = () => async (dispatch) => {
    const res = await axios.get('http://localhost:3001/accounts');

    console.log(res);
    dispatch({ type: 'NULL', payload: res });
};

export const fetchAccount = (_id, pw) => async (dispatch) => {
    let _data = {
        username: _id,
        password: pw,
    };

    // history.push('/info');

    const res = await forums.post(`/members/login`, JSON.stringify(_data));

    console.log(res);

    dispatch({
        type: 'LOGIN',
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

export const lookupUser = (username) => async (dispatch) => {
    let _data = {
        username,
    };

    const res = await forums.post(`/유저조회`, JSON.stringify(_data));

    dispatch({ type: 'FETCH_USER', payload: res });
};

export const createAccount = (id, username, email, password) => async (dispatch) => {
    let _data = {
        id,
        username,
        email,
        password,
    };

    const res = await forums.post(`/유저추가`, JSON.stringify(_data));
    dispatch({ type: 'CREATE_ACCOUNT', payload: res });
};
