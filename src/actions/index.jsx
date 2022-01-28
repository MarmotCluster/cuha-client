import forums from '../apis/forums';
// import history from '../history';

export const fetchAccount = (_id, pw) => async (dispatch) => {
    let _data = {
        username: _id,
        password: pw,
    };

    // history.push('/');

    // const res = await forums.post(`/login`, JSON.stringify(_data));

    // console.log(res);

    // dispatch({
    //     type: 'FETCH_ACCOUNT',
    //     payload: res,
    // });
};
