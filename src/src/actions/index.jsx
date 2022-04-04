import axios from 'axios';
import forums from '../apis/forums';
import history from '../history';

export const fetchAccount = (_id, pw) => async (dispatch) => {
    let _data = {
        username: _id,
        password: pw,
    };

    try {
        const res = await forums.post(`/members/login`, JSON.stringify(_data));
        console.log(res);

        dispatch({
            type: 'LOGIN',
            payload: res,
        });
    } catch (err) {
        dispatch({
            type: 'FETCH_FAILED',
        });
    }
};

// export const fetchAccount = (_id, pw) => (dispatch) => {
//     let _data = {
//         username: _id,
//         password: pw,
//     };

//     try {
//         const res = forums
//             .post(`/members/login`, JSON.stringify(_data))
//             .then((res) => res)
//             .catch((err) => {
//                 console.log('err', err);
//                 return err;
//             });
//         // console.log(res);

//         dispatch({
//             type: 'LOGIN',
//             payload: res,
//         });
//     } catch (err) {
//         dispatch({
//             type: 'FETCH_FAILED',
//         });
//     }
// };

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

export const updateAccountWithoutPassword =
    (username, name, department, studentNumber, gender, email, profileImage) => async (dispatch) => {
        let _data = {
            name,
            department,
            studentNumber,
            male: gender === 'male' ? true : false,
            phoneNumber: '010-0000-0000',
            email,
        };
        console.log('리덕스에서 받은 데이터', _data);

        // profileImage === null ? null : (_data.profileImage = profileImage);

        const res = await forums.patch('/members', JSON.stringify(_data));
        dispatch({ type: 'UPDATE_ACCOUNT', payload: res });
    };

export const createAccount = (id, username, department, studentId, email, password) => async (dispatch) => {
    let _data = {
        id,
        username,
        email,
        password,
    };

    const res = await forums.post(`/유저추가`, JSON.stringify(_data));
    dispatch({ type: 'CREATE_ACCOUNT', payload: res });
};
